<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos']);
    exit;
}

// Configuración del email
$to = "inrapartes@gmail.com";
$cc = "comercial@inrapartes.com,ventas@inrapartes.com";

// Determinar el tipo de solicitud
$isQuote = isset($data['products']) && is_array($data['products']);

if ($isQuote) {
    // Solicitud de cotización del catálogo
    $subject = "🛒 Nueva Solicitud de Cotización - Catálogo Web";
    
    $productsHtml = "";
    $productsText = "";
    $totalProducts = 0;
    
    foreach ($data['products'] as $index => $product) {
        $num = $index + 1;
        $totalProducts += $product['quantity'];
        
        $productsHtml .= "
        <tr style='border-bottom: 1px solid #eee;'>
            <td style='padding: 12px; font-weight: 600;'>{$num}</td>
            <td style='padding: 12px;'>" . htmlspecialchars($product['productName']) . "</td>
            <td style='padding: 12px; color: #007bff;'>" . htmlspecialchars($product['category']) . "</td>
            <td style='padding: 12px; color: #28a745;'>" . htmlspecialchars($product['measure']) . "</td>
            <td style='padding: 12px; text-align: center; font-weight: 600;'>{$product['quantity']}</td>
        </tr>";
        
        $productsText .= "{$num}. " . $product['productName'] . "\n";
        $productsText .= "   - Categoría: " . $product['category'] . "\n";
        $productsText .= "   - Medida: " . $product['measure'] . "\n";
        $productsText .= "   - Cantidad: " . $product['quantity'] . "\n\n";
    }
    
    $contactInfo = isset($data['customerInfo']) ? $data['customerInfo'] : null;
    $customerHtml = "";
    $customerText = "";
    
    if ($contactInfo) {
        $customerHtml = "
        <div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;'>
            <h3 style='color: #495057; margin-bottom: 15px;'>📋 Información del Cliente</h3>
            <p><strong>Nombre:</strong> " . htmlspecialchars($contactInfo['name'] ?? 'No proporcionado') . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($contactInfo['email'] ?? 'No proporcionado') . "</p>
            <p><strong>Teléfono:</strong> " . htmlspecialchars($contactInfo['phone'] ?? 'No proporcionado') . "</p>
            <p><strong>Empresa:</strong> " . htmlspecialchars($contactInfo['company'] ?? 'No proporcionado') . "</p>
        </div>";
        
        $customerText = "INFORMACIÓN DEL CLIENTE:\n";
        $customerText .= "Nombre: " . ($contactInfo['name'] ?? 'No proporcionado') . "\n";
        $customerText .= "Email: " . ($contactInfo['email'] ?? 'No proporcionado') . "\n";
        $customerText .= "Teléfono: " . ($contactInfo['phone'] ?? 'No proporcionado') . "\n";
        $customerText .= "Empresa: " . ($contactInfo['company'] ?? 'No proporcionado') . "\n\n";
    }
    
    // Email HTML
    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: 'Century Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #dee2e6; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; }
            .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .table th { background: #f8f9fa; padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #dee2e6; }
            .table td { padding: 12px; border-bottom: 1px solid #eee; }
            .summary { background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .badge { background: #28a745; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🛒 Nueva Solicitud de Cotización</h1>
                <p style='margin: 0; opacity: 0.9;'>Catálogo Web - INRAPARTES</p>
            </div>
            
            <div class='content'>
                {$customerHtml}
                
                <h3 style='color: #495057; margin-bottom: 20px;'>📦 Productos Solicitados</h3>
                
                <table class='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Medida</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {$productsHtml}
                    </tbody>
                </table>
                
                <div class='summary'>
                    <h3 style='margin: 0; color: #007bff;'>Resumen de la Cotización</h3>
                    <p style='margin: 10px 0 0 0;'>
                        <span class='badge'>{$totalProducts} productos solicitados</span>
                    </p>
                </div>
                
                <div style='background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;'>
                    <h4 style='margin: 0 0 10px 0; color: #856404;'>⚡ Acción Requerida</h4>
                    <p style='margin: 0; color: #856404;'>
                        Por favor, prepare la cotización con precios y disponibilidad para enviar al cliente.
                    </p>
                </div>
            </div>
            
            <div class='footer'>
                <p style='margin: 0;'>
                    Generado automáticamente desde <strong>www.inrapartes.com</strong><br>
                    " . date('d/m/Y H:i:s') . " - Sistema de Cotizaciones Online
                </p>
            </div>
        </div>
    </body>
    </html>";
    
    // Email de texto plano
    $textBody = "NUEVA SOLICITUD DE COTIZACIÓN - INRAPARTES\n";
    $textBody .= "=" . str_repeat("=", 50) . "\n\n";
    $textBody .= $customerText;
    $textBody .= "PRODUCTOS SOLICITADOS:\n";
    $textBody .= str_repeat("-", 30) . "\n";
    $textBody .= $productsText;
    $textBody .= "RESUMEN:\n";
    $textBody .= "Total de productos: {$totalProducts}\n\n";
    $textBody .= "Generado desde: www.inrapartes.com\n";
    $textBody .= "Fecha: " . date('d/m/Y H:i:s') . "\n";
    
} else {
    // Contacto general o consulta de pieza a medida
    $subject = "📞 Nueva Consulta Web - INRAPARTES";
    
    $name = htmlspecialchars($data['name'] ?? 'No proporcionado');
    $email = htmlspecialchars($data['email'] ?? 'No proporcionado');
    $phone = htmlspecialchars($data['phone'] ?? 'No proporcionado');
    $message = htmlspecialchars($data['message'] ?? 'No proporcionado');
    $type = htmlspecialchars($data['type'] ?? 'consulta general');
    
    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: 'Century Gothic', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #155724 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #dee2e6; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; }
            .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
            .field label { font-weight: 600; color: #495057; display: block; margin-bottom: 5px; }
            .field .value { color: #212529; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>📞 Nueva Consulta Web</h1>
                <p style='margin: 0; opacity: 0.9;'>INRAPARTES</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <label>Tipo de consulta:</label>
                    <div class='value'>{$type}</div>
                </div>
                
                <div class='field'>
                    <label>Nombre:</label>
                    <div class='value'>{$name}</div>
                </div>
                
                <div class='field'>
                    <label>Email:</label>
                    <div class='value'>{$email}</div>
                </div>
                
                <div class='field'>
                    <label>Teléfono:</label>
                    <div class='value'>{$phone}</div>
                </div>
                
                <div class='field'>
                    <label>Mensaje:</label>
                    <div class='value'>" . nl2br($message) . "</div>
                </div>
            </div>
            
            <div class='footer'>
                <p style='margin: 0;'>
                    Enviado desde <strong>www.inrapartes.com</strong><br>
                    " . date('d/m/Y H:i:s') . "
                </p>
            </div>
        </div>
    </body>
    </html>";
    
    $textBody = "NUEVA CONSULTA WEB - INRAPARTES\n";
    $textBody .= "=" . str_repeat("=", 40) . "\n\n";
    $textBody .= "Tipo: {$type}\n";
    $textBody .= "Nombre: {$name}\n";
    $textBody .= "Email: {$email}\n";
    $textBody .= "Teléfono: {$phone}\n\n";
    $textBody .= "Mensaje:\n";
    $textBody .= str_repeat("-", 20) . "\n";
    $textBody .= $message . "\n\n";
    $textBody .= "Enviado desde: www.inrapartes.com\n";
    $textBody .= "Fecha: " . date('d/m/Y H:i:s') . "\n";
}

// Headers del email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@inrapartes.com\r\n";
$headers .= "Reply-To: inrapartes@gmail.com\r\n";
$headers .= "Cc: {$cc}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Enviar email
$success = mail($to, $subject, $htmlBody, $headers);

if ($success) {
    echo json_encode([
        'success' => true,
        'message' => $isQuote ? 'Cotización enviada correctamente' : 'Mensaje enviado correctamente'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar el email',
        'debug' => error_get_last()
    ]);
}
?> 