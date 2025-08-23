<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer datos JSON del body
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
        exit;
    }
    
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? 'No proporcionado';
    $company = $input['company'] ?? 'No proporcionado';
    $products = $input['products'] ?? [];
    
    if (empty($name) || empty($email) || empty($products)) {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan datos requeridos']);
        exit;
    }
    
    // Tu API Key de Resend
    $resendApiKey = 're_E4TzqJ4K_DkScZVgq3EzYfJGoeRfTGmRD';
    
    // Generar lista de productos para HTML
    $productsHtml = '';
    $totalItems = 0;
    foreach ($products as $index => $product) {
        $num = $index + 1;
        $totalItems += intval($product['quantity']);
        $productsHtml .= "
        <tr style='border-bottom: 1px solid #eee;'>
            <td style='padding: 10px; border-right: 1px solid #eee;'>{$num}</td>
            <td style='padding: 10px; border-right: 1px solid #eee;'><strong>" . htmlspecialchars($product['productName']) . "</strong></td>
            <td style='padding: 10px; border-right: 1px solid #eee;'>" . htmlspecialchars($product['category']) . "</td>
            <td style='padding: 10px; border-right: 1px solid #eee;'>" . htmlspecialchars($product['measure']) . "</td>
            <td style='padding: 10px; text-align: center;'><strong>" . htmlspecialchars($product['quantity']) . "</strong></td>
        </tr>";
    }
    
    $currentDate = date('l, d \d\e F \d\e Y', time());
    $currentDateTime = date('Y-m-d H:i:s');
    
    // Datos del email
    $emailData = [
        'from' => 'INRAPARTES <onboarding@resend.dev>',
        'to' => ['inrapartes@gmail.com'],
        'cc' => ['comercial@inrapartes.com', 'ventas@inrapartes.com'],
        'subject' => "Nueva Cotización - " . $name . " (" . count($products) . " productos)",
        'html' => "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <title>Nueva Cotización - INRAPARTES</title>
        </head>
        <body style='font-family: "Century Gothic", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;'>
                <h1 style='margin: 0; font-size: 24px;'>🔧 NUEVA COTIZACIÓN</h1>
                <p style='margin: 10px 0 0 0; font-size: 16px;'>INRAPARTES - Catálogo Web</p>
            </div>
            
            <div style='background: #f8f9fa; padding: 20px; border-left: 4px solid #007bff;'>
                <h2 style='color: #2c3e50; margin-top: 0;'>📋 Información del Cliente</h2>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr><td style='padding: 8px 0; font-weight: bold; width: 100px;'>Nombre:</td><td>" . htmlspecialchars($name) . "</td></tr>
                    <tr><td style='padding: 8px 0; font-weight: bold;'>Email:</td><td><a href='mailto:" . htmlspecialchars($email) . "' style='color: #007bff;'>" . htmlspecialchars($email) . "</a></td></tr>
                    <tr><td style='padding: 8px 0; font-weight: bold;'>Teléfono:</td><td>" . htmlspecialchars($phone) . "</td></tr>
                    <tr><td style='padding: 8px 0; font-weight: bold;'>Empresa:</td><td>" . htmlspecialchars($company) . "</td></tr>
                    <tr><td style='padding: 8px 0; font-weight: bold;'>Fecha:</td><td>" . $currentDate . "</td></tr>
                </table>
            </div>

            <div style='background: white; padding: 20px;'>
                <h2 style='color: #2c3e50; border-bottom: 2px solid #007bff; padding-bottom: 10px;'>🛒 Productos Solicitados</h2>
                <table style='width: 100%; border-collapse: collapse; margin-top: 15px; border: 1px solid #ddd;'>
                    <thead>
                        <tr style='background: #007bff; color: white;'>
                            <th style='padding: 12px; text-align: left;'>#</th>
                            <th style='padding: 12px; text-align: left;'>Producto</th>
                            <th style='padding: 12px; text-align: left;'>Categoría</th>
                            <th style='padding: 12px; text-align: left;'>Medida</th>
                            <th style='padding: 12px; text-align: center;'>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {$productsHtml}
                    </tbody>
                </table>
                
                <div style='background: #e8f5e8; padding: 15px; border-radius: 5px; margin-top: 20px; text-align: center;'>
                    <strong style='font-size: 18px; color: #28a745;'>
                        📦 Total: {$totalItems} productos solicitados
                    </strong>
                </div>
            </div>

            <div style='background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;'>
                <p style='margin: 0; color: #6c757d; font-size: 14px;'>
                    💻 Cotización generada automáticamente desde <strong>www.inrapartes.com</strong><br>
                    📞 Responder a: <a href='mailto:" . htmlspecialchars($email) . "' style='color: #007bff;'>" . htmlspecialchars($email) . "</a> | 
                    ☎️ " . htmlspecialchars($phone) . "
                </p>
                <p style='margin: 10px 0 0 0; font-size: 12px; color: #adb5bd;'>
                    {$currentDateTime}
                </p>
            </div>
        </body>
        </html>"
    ];
    
    // Enviar email con cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $resendApiKey,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        echo json_encode([
            'success' => true,
            'message' => 'Email enviado exitosamente',
            'data' => json_decode($response, true)
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'error' => 'Error enviando email',
            'details' => $response,
            'httpCode' => $httpCode
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?> 