<?php
header('Content-Type: application/json');

// Capturamos el flujo de datos crudo enviado por JS (JSON)
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true); // Lo convertimos en arreglo asociativo

if (isset($input['categoria'], $input['ubicacion'], $input['descripcion'])) {
    
    // Aquí iría tu sentencia SQL en el futuro (INSERT INTO reportes...)
    // Ejemplo: $db->query("INSERT INTO...");

    echo json_encode([
        "status" => "success",
        "message" => "¡Reporte enviado con éxito! ID de radicado simulado: #RPT-" . rand(10000, 99999)
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Faltan datos requeridos en el servidor."
    ]);
}
exit;