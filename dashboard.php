<?php
// Indicamos al navegador que este archivo devuelve un objeto JSON y no texto/html
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite consultas de origen local

// Simulamos los datos que idealmente vendrían de una consulta SQL (SELECT...)
$datosDashboard = [
    "usuario" => [
        "nombre" => "Juan Pérez",
        "rol" => "Vecino Activo"
    ],
    "estadisticas" => [
        "total_reportes" => "1,247",
        "resueltos" => "892",
        "tiempo_promedio" => "3.2"
    ]
];

// Transformamos el arreglo de PHP en formato JSON y lo imprimimos
echo json_encode($datosDashboard);
exit;