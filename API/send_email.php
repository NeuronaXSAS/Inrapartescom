<?php
header('Content-Type: application/json');
// Debug mode (only if explicitly requested): /API/send_email.php?debug=1
$__DEBUG = isset($_GET['debug']) || (isset($_GET['DEBUG']) && $_GET['DEBUG']);
if ($__DEBUG) {
  ini_set('display_errors', '1');
  ini_set('log_errors', '1');
  error_reporting(E_ALL);
  register_shutdown_function(function(){
    $e = error_get_last();
    if ($e && in_array($e['type'], [E_ERROR,E_PARSE,E_CORE_ERROR,E_COMPILE_ERROR])) {
      http_response_code(500);
      echo json_encode(['error'=>'fatal','file'=>basename($e['file']??''),'line'=>$e['line']??0,'message'=>$e['message']??'']);
    }
  });
}
function __dbg($m){
  // Write minimal debug info if debug mode is on
  if (!isset($GLOBALS['__DEBUG']) || !$GLOBALS['__DEBUG']) return;
  @file_put_contents(__DIR__.'/debug_mail.log', date('c')." ".(is_string($m)?$m:json_encode($m))."\n", FILE_APPEND);
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Método no permitido']); exit; }

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
__dbg(['phase'=>'input','raw'=>strlen((string)$rawInput).' bytes','json_ok'=>is_array($input)]);
if (!$input) { http_response_code(400); echo json_encode(['error'=>'JSON inválido']); exit; }

// API key de Resend desde entorno o archivo local API/.resend.key
$resendApiKey = getenv('RESEND_API_KEY');
if (!$resendApiKey) {
  $candidates = [__DIR__.'/.resend.key', dirname(__DIR__).'/.resend.key'];
  foreach ($candidates as $p) { if (is_file($p)) { $resendApiKey = trim(file_get_contents($p)); break; } }
}
if (!$resendApiKey) { http_response_code(500); echo json_encode(['error'=>'Falta RESEND_API_KEY (entorno o API/.resend.key)']); exit; }
__dbg(['phase'=>'key','hasKey'=> (bool)$resendApiKey]);

// Configuración: sin CC; un solo destinatario
$toRecipients = ['inrapartes@gmail.com'];
$fromAddress  = 'INRAPARTES <no-reply@updates.inrapartes.com>';

function e($s){ return htmlspecialchars((string)$s ?? '', ENT_QUOTES, 'UTF-8'); }
function sanitizeEmail($email){
  $email = trim((string)$email);
  return filter_var($email, FILTER_VALIDATE_EMAIL) ?: '';
}
function loadOverrideString(array $files){
  foreach ($files as $p) {
    if (is_file($p)) {
      $value = trim(file_get_contents($p));
      if ($value !== '') return $value;
    }
  }
  return null;
}
function normalizeFromAddress($value){
  $value = trim((string)$value);
  if ($value === '') return '';
  if (filter_var($value, FILTER_VALIDATE_EMAIL)) return $value;
  if (preg_match('/^(.+?)<([^<>]+)>$/', $value, $m)) {
    $email = sanitizeEmail($m[2]);
    if ($email) {
      $name = trim($m[1]);
      $name = preg_replace('/(^"|"$)/', '', $name);
      return ($name !== '' ? $name.' ' : '') . "<$email>";
    }
  }
  return '';
}
function loadOverrideRecipients(){
  $sources = [];
  $env = getenv('RESEND_TO_EMAILS');
  if ($env) { $sources[] = $env; }
  $file = loadOverrideString([__DIR__.'/.resend.to', dirname(__DIR__).'/.resend.to']);
  if ($file) { $sources[] = $file; }
  $emails = [];
  foreach ($sources as $chunk) {
    foreach (preg_split('/[,\s]+/', $chunk) as $candidate) {
      $email = sanitizeEmail($candidate);
      if ($email && !in_array($email, $emails, true)) {
        $emails[] = $email;
      }
    }
  }
  return $emails;
}

$overrideRecipients = loadOverrideRecipients();
if (!empty($overrideRecipients)) {
  $toRecipients = $overrideRecipients;
}

$fromOverride = getenv('RESEND_FROM_EMAIL') ?: loadOverrideString([__DIR__.'/.resend.from', dirname(__DIR__).'/.resend.from']);
if ($fromOverride) {
  $normalizedFrom = normalizeFromAddress($fromOverride);
  if ($normalizedFrom !== '') {
    $fromAddress = $normalizedFrom;
  }
}
__dbg(['phase'=>'from_to','from'=>$fromAddress,'to'=>$toRecipients]);

$type    = $input['type'] ?? '';
$now     = date('d/m/Y H:i:s');
$replyTo = null; $subject=''; $html=''; $text='';

// Base de plantillas
$templateDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'plantillas_emails' . DIRECTORY_SEPARATOR;

function render_email_template($templatePath, array $data, array $rawKeys = []){
  $tpl = @file_get_contents($templatePath);
  if ($tpl === false || $tpl === '') return null;
  // Reemplazo de triple llaves sin escape primero {{{key}}}
  $tpl = preg_replace_callback('/\{\{\{\s*([A-Za-z0-9_]+)\s*\}\}\}/', function($m) use ($data, $rawKeys){
    $k = $m[1];
    $val = $data[$k] ?? '';
    return (string)$val;
  }, $tpl);
  // Reemplazo de doble llaves con escape {{key}}
  $tpl = preg_replace_callback('/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/', function($m) use ($data){
    $k = $m[1];
    $val = $data[$k] ?? '';
    return e($val);
  }, $tpl);
  return $tpl;
}

if ($type === 'quote') {
  $c = $input['customerInfo'] ?? [];
  $name = $c['name'] ?? ($input['name'] ?? 'No proporcionado');
  $rawEmail = $c['email']?? ($input['email']?? '');
  $email = sanitizeEmail($rawEmail);
  $phone= $c['phone']?? ($input['phone']?? 'No proporcionado');
  $company = $c['company'] ?? ($input['company'] ?? 'No proporcionado');
  $replyTo = $email ?: null;
  $emailDisplay = $email ?: 'No proporcionado';
  $emailCell = $email ? "<a href='mailto:".e($email)."'>".e($email)."</a>" : e($emailDisplay);

  $products = is_array($input['products'] ?? null) ? $input['products'] : [];
  $rows=''; $mobileList=''; $totalUnits=0;
  foreach ($products as $i=>$p){
    $qty = intval($p['quantity'] ?? $p['cantidad'] ?? 0);
    $totalUnits += $qty;
    $code = $p['code']??$p['codigo']??'';
    $pname = $p['productName']??$p['nombre']??'';
    $cat = $p['category']??$p['categoria']??'';
    $measure = $p['measure']??$p['medida']??'';
    $material = $p['material']??'N/A';
    $rows .= "
      <tr>
        <td style='padding:10px;text-align:center;'>".($i+1)."</td>
        <td style='padding:10px;border-left:1px solid #e9ecef;'>".e($code)."</td>
        <td style='padding:10px;border-left:1px solid #e9ecef;'><strong>".e($pname)."</strong></td>
        <td style='padding:10px;border-left:1px solid #e9ecef;'>".e($cat)."</td>
        <td style='padding:10px;border-left:1px solid #e9ecef;'>".e($measure)."</td>
        <td style='padding:10px;border-left:1px solid #e9ecef;text-align:center;'>".e($material)."</td>
        <td style='padding:10px;text-align:center;'><strong>".e($qty)."</strong></td>
      </tr>";

    // Mobile card-like item (stacked)
    $mobileList .= "
      <div style=\"border:1px solid #e9ecef;border-radius:10px;padding:12px;margin:8px 0;background:#ffffff;\">
        <div style=\"font-weight:700;color:#303030;margin-bottom:6px;\">".e($pname)."</div>
        <div style=\"font-size:12px;color:#6c757d;\"><strong>Código:</strong> ".e($code)."</div>
        <div style=\"font-size:12px;color:#6c757d;\"><strong>Categoría:</strong> ".e($cat)."</div>
        <div style=\"font-size:12px;color:#6c757d;\"><strong>Medida:</strong> ".e($measure)."</div>
        <div style=\"font-size:12px;color:#6c757d;\"><strong>Material:</strong> ".e($material)."</div>
        <div style=\"font-size:12px;color:#303030;margin-top:6px;\"><strong>Cantidad:</strong> ".e($qty)."</div>
      </div>";
  }
  $subject = "[INRAPARTES] Cotización - ".e($name)." (".count($products)." ítems)";
  $dateStr = date('d/m/Y');
  $timeStr = date('H:i');
  $renderData = [
    'from_name' => $name,
    'from_email' => $email ?: ($rawEmail ?: ''),
    'phone' => $phone,
    'company' => $company,
    'date' => $dateStr,
    'time' => $timeStr,
    'products_table' => $rows,
    'products_list_mobile' => $mobileList,
    'total_items' => count($products),
    'total_quantity' => intval($totalUnits)
  ];
  $rendered = render_email_template($templateDir.'EMAIL_TEMPLATE_COTIZACIÓN.html', $renderData, ['products_table']);
  if ($rendered) { $html = $rendered; }
  else {
    // Fallback a texto simple en caso de ausencia de plantilla
    $html = '<html><body><p>Solicitud de cotización (sin plantilla disponible)</p></body></html>';
  }
  $text = "NUEVA COTIZACIÓN\nNombre: $name\nEmail: ".($email ?: $rawEmail ?: 'No proporcionado')."\nTeléfono: $phone\nEmpresa: $company\nÍtems: ".count($products)."\nTotal unidades: ".$totalUnits."\n";
}
elseif ($type === 'contact') {
  $name=$input['name']??''; $rawEmail=$input['email']??''; $email=sanitizeEmail($rawEmail); $phone=$input['phone']??'No proporcionado';
  $company=$input['company']??'No proporcionado'; $subjectIn=$input['subject']??'Contacto general'; $message=$input['message']??'';
  $replyTo = $email ?: null;
  $emailCell = $email ? "<a href='mailto:".e($email)."'>".e($email)."</a>" : e($email ?: 'No proporcionado');
  $subject = "[INRAPARTES] Contacto - ".e($subjectIn)." - ".e($name);
  $dateStr = date('d/m/Y');
  $timeStr = date('H:i');
  $renderData = [
    'from_name' => $name,
    'company' => $company,
    'from_email' => ($email ?: $rawEmail ?: ''),
    'phone' => $phone,
    'subject' => $subjectIn,
    'message' => $message,
    'date' => $dateStr,
    'time' => $timeStr
  ];
  $rendered = render_email_template($templateDir.'EMAIL_TEMPLATE_CONTACTANOS.html', $renderData);
  if ($rendered) { $html = $rendered; }
  else {
    $html = '<html><body><p>Mensaje de contacto (sin plantilla disponible)</p></body></html>';
  }
  $text = "CONTACTO WEB\nAsunto: $subjectIn\nNombre: $name\nEmail: ".($email ?: $rawEmail ?: 'No proporcionado')."\nTeléfono: $phone\nEmpresa: $company\n\nMensaje:\n".$message."\n";
}
elseif ($type === 'custom_project') {
  $name=$input['customer_name']??($input['name']??''); $rawEmail=$input['customer_email']??($input['email']??''); $email=sanitizeEmail($rawEmail);
  $phone=$input['customer_phone']??($input['phone']??'No proporcionado'); $company=$input['customer_company']??($input['company']??'No proporcionado');
  $replyTo = $email ?: null;
  $emailCell = $email ? "<a href='mailto:".e($email)."'>".e($email)."</a>" : e($email ?: 'No proporcionado');
  $subject = "[INRAPARTES] Proyecto a Medida - ".e($name);
  $projectType = $input['project_type']??$input['projectType']??'No especificado';
  $quantity = $input['quantity']??'No especificado';
  $material = $input['material']??'No especificado';
  $deadline = $input['deadline']??'No especificada';
  $description = $input['project_description']??$input['description']??'No especificada';
  $specs = $input['technical_specs']??$input['specifications']??'No especificadas';
  $hasDrawings = $input['has_drawings']??'No especificado';
  $additional = $input['additional_info']??'No especificada';
  $submittedDate = date('d/m/Y');
  $submittedTime = date('H:i');
  $summaryBlock = "Tipo de Proyecto: $projectType\nCantidad Requerida: $quantity\nMaterial: $material\nFecha Entrega: $deadline\n\nDescripción:\n$description\n\nEspecificaciones Técnicas:\n$specs\n\nPlanos/CAD: $hasDrawings\nInformación Adicional: $additional";
  $renderData = [
    'customer_name' => $name,
    'customer_company' => $company,
    'customer_email' => ($email ?: $rawEmail ?: ''),
    'customer_phone' => $phone,
    'project_type' => $projectType,
    'quantity' => $quantity,
    'material' => $material,
    'deadline' => $deadline,
    'project_description' => $description,
    'technical_specs' => $specs,
    'has_drawings' => $hasDrawings,
    'additional_info' => $additional,
    'submitted_date' => $submittedDate,
    'submitted_time' => $submittedTime,
    'summary_block' => $summaryBlock
  ];
  $rendered = render_email_template($templateDir.'EMAIL_TEMPLATE_PIEZAS_MEDIDA.html', $renderData);
  if ($rendered) { $html = $rendered; }
  else { $html = '<html><body><p>Proyecto a medida (sin plantilla disponible)</p></body></html>'; }
  $text = "PROYECTO A MEDIDA\nNombre: $name\nEmail: ".($email ?: $rawEmail ?: 'No proporcionado')."\nTeléfono: $phone\nEmpresa: $company\nTipo: $projectType\nCantidad: $quantity\nMaterial: $material\n";
}
else { http_response_code(400); echo json_encode(['error'=>'type inválido']); exit; }

// Llamada a Resend
$payload = ['from'=>$fromAddress,'to'=>$toRecipients,'subject'=>$subject,'html'=>$html,'text'=>$text];
if ($replyTo) { $payload['reply_to'] = $replyTo; }

if (!function_exists('curl_init')) {
  http_response_code(500);
  echo json_encode(['error'=>'PHP cURL extension no disponible']);
  exit;
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $resendApiKey, 'Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_TIMEOUT, 25);
$response = curl_exec($ch);
$curlErrno = curl_errno($ch);
$curlError = $curlErrno ? curl_error($ch) : null;
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
__dbg(['phase'=>'resend_call','httpCode'=>$code,'curlErrno'=>$curlErrno,'curlError'=>$curlError,'resp_len'=>strlen((string)$response)]);

if ($code === 200 || $code === 201) echo json_encode(['success'=>true,'result'=>json_decode($response,true)]);
else {
  http_response_code(500);
  $details = json_decode($response, true);
  if (!$details) { $details = $response; }
  $errorPayload = ['error'=>'Error enviando email','httpCode'=>$code,'details'=>$details];
  if ($curlErrno) {
    $errorPayload['curlErrno'] = $curlErrno;
    $errorPayload['curlError'] = $curlError;
  }
  if ($__DEBUG) { $errorPayload['payload_overview'] = ['from'=>$fromAddress,'to'=>$toRecipients,'subject'=>$subject,'has_html'=>strlen((string)$html)>0]; }
  echo json_encode($errorPayload);
}
