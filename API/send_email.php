<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Método no permitido']); exit; }

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { http_response_code(400); echo json_encode(['error'=>'JSON inválido']); exit; }

// API key de Resend desde entorno o archivo local API/.resend.key
$resendApiKey = getenv('RESEND_API_KEY');
if (!$resendApiKey) {
  $candidates = [__DIR__.'/.resend.key', dirname(__DIR__).'/.resend.key'];
  foreach ($candidates as $p) { if (is_file($p)) { $resendApiKey = trim(file_get_contents($p)); break; } }
}
if (!$resendApiKey) { http_response_code(500); echo json_encode(['error'=>'Falta RESEND_API_KEY (entorno o API/.resend.key)']); exit; }

// Configuración: sin CC; un solo destinatario
$toRecipients = ['nathaly.neuronax@gmail.com'];
$fromAddress  = 'INRAPARTES <onboarding@resend.dev>';

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

$type    = $input['type'] ?? '';
$now     = date('d/m/Y H:i:s');
$replyTo = null; $subject=''; $html=''; $text='';

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
  $rows=''; $totalUnits=0;
  foreach ($products as $i=>$p){
    $qty = intval($p['quantity'] ?? $p['cantidad'] ?? 0);
    $totalUnits += $qty;
    $rows .= "
      <tr style='border-bottom:1px solid #eee;'>
        <td style='padding:10px;text-align:center;'>".($i+1)."</td>
        <td style='padding:10px;border-left:1px solid #eee;'>".e($p['code']??$p['codigo']??'')."</td>
        <td style='padding:10px;border-left:1px solid #eee;'><strong>".e($p['productName']??$p['nombre']??'')."</strong></td>
        <td style='padding:10px;border-left:1px solid #eee;'>".e($p['category']??$p['categoria']??'')."</td>
        <td style='padding:10px;border-left:1px solid #eee;'>".e($p['measure']??$p['medida']??'')."</td>
        <td style='padding:10px;text-align:center;border-left:1px solid #eee;'><strong>".e($qty)."</strong></td>
      </tr>";
  }
  $subject = "[INRAPARTES] Cotización - ".e($name)." (".count($products)." ítems)";
  $html = "<!DOCTYPE html><html><head><meta charset='utf-8'>
    <style>body{font-family:'Century Gothic',Arial,sans-serif;color:#333;line-height:1.6}
    .header{background:linear-gradient(135deg,#007bff 0%,#0056b3 100%);color:#fff;padding:24px;text-align:center;border-radius:8px 8px 0 0}
    .content{background:#fff;padding:24px;border:1px solid #dee2e6}
    .footer{background:#f8f9fa;padding:16px;text-align:center;border-radius:0 0 8px 8px;color:#6c757d;font-size:12px}
    .table{width:100%;border-collapse:collapse;margin-top:16px}
    .table th{background:#f8f9fa;padding:10px;text-align:left;border-bottom:2px solid #dee2e6}
    .table td{padding:10px;border-bottom:1px solid #eee}</style></head><body>
    <div class='header'><h1>🛒 Nueva Solicitud de Cotización</h1><p style='margin:0;opacity:.9'>INRAPARTES</p></div>
    <div class='content'>
      <h3 style='margin:0 0 12px;color:#495057'>📋 Información del Cliente</h3>
      <table style='width:100%;border-collapse:collapse'>
        <tr><td style='padding:6px 0;font-weight:bold;width:120px'>Nombre:</td><td>".e($name)."</td></tr>
        <tr><td style='padding:6px 0;font-weight:bold'>Email:</td><td>$emailCell</td></tr>
        <tr><td style='padding:6px 0;font-weight:bold'>Teléfono:</td><td>".e($phone)."</td></tr>
        <tr><td style='padding:6px 0;font-weight:bold'>Empresa:</td><td>".e($company)."</td></tr>
      </table>
      <h3 style='margin:24px 0 12px;color:#495057'>🛒 Productos Solicitados</h3>
      <table class='table'><thead><tr><th>#</th><th>Código</th><th>Producto</th><th>Categoría</th><th>Medida</th><th>Cantidad</th></tr></thead><tbody>$rows</tbody></table>
      <div style='background:#e7f3ff;padding:12px;border-radius:8px;margin-top:16px;text-align:center'><strong>📦 Total: ".intval($totalUnits)." unidades</strong></div>
    </div>
    <div class='footer'>Generado automáticamente - $now</div></body></html>";
  $text = "NUEVA COTIZACIÓN\nNombre: $name\nEmail: ".($email ?: $rawEmail ?: 'No proporcionado')."\nTeléfono: $phone\nEmpresa: $company\nÍtems: ".count($products)."\n";
}
elseif ($type === 'contact') {
  $name=$input['name']??''; $rawEmail=$input['email']??''; $email=sanitizeEmail($rawEmail); $phone=$input['phone']??'No proporcionado';
  $company=$input['company']??'No proporcionado'; $subjectIn=$input['subject']??'Contacto general'; $message=$input['message']??'';
  $replyTo = $email ?: null;
  $emailCell = $email ? "<a href='mailto:".e($email)."'>".e($email)."</a>" : e($email ?: 'No proporcionado');
  $subject = "[INRAPARTES] Contacto - ".e($subjectIn)." - ".e($name);
  $html = "<!DOCTYPE html><html><head><meta charset='utf-8'><style>body{font-family:'Century Gothic',Arial,sans-serif;color:#333;line-height:1.6}</style></head><body>
    <h2 style='margin:0 0 10px'>📞 Nuevo Mensaje de Contacto</h2>
    <div style='background:#f8f9fa;padding:12px;border-radius:8px;border-left:4px solid #28a745'>
      <p><strong>Nombre:</strong> ".e($name)."</p>
      <p><strong>Email:</strong> $emailCell</p>
      <p><strong>Teléfono:</strong> ".e($phone)."</p>
      <p><strong>Empresa:</strong> ".e($company)."</p>
    </div>
    <h3 style='margin:16px 0 8px'>Mensaje</h3>
    <div style='white-space:pre-wrap;border:1px solid #eee;border-radius:8px;padding:12px'>".nl2br(e($message))."</div>
    <p style='color:#6c757d;font-size:12px'>Enviado: $now</p></body></html>";
  $text = "CONTACTO WEB\nAsunto: $subjectIn\nNombre: $name\nEmail: ".($email ?: $rawEmail ?: 'No proporcionado')."\nTeléfono: $phone\nEmpresa: $company\n\nMensaje:\n$message\n";
}
elseif ($type === 'custom_project') {
  $name=$input['customer_name']??($input['name']??''); $rawEmail=$input['customer_email']??($input['email']??''); $email=sanitizeEmail($rawEmail);
  $phone=$input['customer_phone']??($input['phone']??'No proporcionado'); $company=$input['customer_company']??($input['company']??'No proporcionado');
  $replyTo = $email ?: null;
  $emailCell = $email ? "<a href='mailto:".e($email)."'>".e($email)."</a>" : e($email ?: 'No proporcionado');
  $subject = "[INRAPARTES] Proyecto a Medida - ".e($name);
  $fields = [
    'Tipo de proyecto'=>$input['project_type']??$input['projectType']??'No especificado',
    'Cantidad'=>$input['quantity']??'No especificado',
    'Material'=>$input['material']??'No especificado',
    'Fecha de entrega'=>$input['deadline']??'No especificada',
    'Descripción'=>$input['project_description']??$input['description']??'No especificada',
    'Especificaciones técnicas'=>$input['technical_specs']??$input['specifications']??'No especificadas',
    'Planos/CAD'=>$input['has_drawings']??'No especificado',
    'Información adicional'=>$input['additional_info']??'No especificada',
  ];
  $rows=''; foreach($fields as $k=>$v){ $rows.="<tr><td style='padding:8px;font-weight:bold;width:180px;border-bottom:1px solid #eee'>".e($k)."</td><td style='padding:8px;border-bottom:1px solid #eee'>".nl2br(e($v))."</td></tr>"; }
  $html="<!DOCTYPE html><html><head><meta charset='utf-8'></head><body style=\"font-family:'Century Gothic',Arial,sans-serif\">
    <h2 style='margin:0 0 10px'>🧩 Solicitud de Proyecto a Medida</h2>
    <div style='background:#f8f9fa;padding:12px;border-radius:8px;border-left:4px solid #303030'>
      <p><strong>Nombre:</strong> ".e($name)."</p>
      <p><strong>Email:</strong> $emailCell</p>
      <p><strong>Teléfono:</strong> ".e($phone)."</p>
      <p><strong>Empresa:</strong> ".e($company)."</p>
    </div>
    <table style='width:100%;border-collapse:collapse;margin-top:12px'>$rows</table>
    <p style='color:#6c757d;font-size:12px'>Enviado: $now</p></body></html>";
  $text = "PROYECTO A MEDIDA\nNombre: $name\nEmail: ".($email ?: $rawEmail ?: 'No proporcionado')."\nTeléfono: $phone\nEmpresa: $company\n";
}
else { http_response_code(400); echo json_encode(['error'=>'type inválido']); exit; }

// Llamada a Resend
$payload = ['from'=>$fromAddress,'to'=>$toRecipients,'subject'=>$subject,'html'=>$html,'text'=>$text];
if ($replyTo) { $payload['reply_to'] = $replyTo; }

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $resendApiKey, 'Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
$response = curl_exec($ch);
$curlErrno = curl_errno($ch);
$curlError = $curlErrno ? curl_error($ch) : null;
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

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
  echo json_encode($errorPayload);
}
