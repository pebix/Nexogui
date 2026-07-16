<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simulamos los hilos de conversación creados por los vecinos en la maqueta
$discusiones = [
    [
        "id" => 1,
        "autor" => "María Espinoza",
        "iniciales" => "ME",
        "fecha" => "Hace 2 horas",
        "categoria" => "propuesta",
        "titulo" => "Proyecto para mejorar la iluminación de la Plaza Gabriel Terra",
        "contenido" => "Hola vecinos, creo que sería genial organizarnos para presentar un proyecto al municipio y colocar más luminarias LED en los sectores oscuros de la plaza de Guichón, ¿qué opinan?",
        "likes" => 24,
        "comentarios" => 11
    ],
    [
        "id" => 2,
        "autor" => "Carlos G.",
        "iniciales" => "CG",
        "fecha" => "Ayer",
        "categoria" => "aviso",
        "titulo" => "Corte de agua programado para el cuadrante norte",
        "contenido" => "Aviso urgente: me informaron en las oficinas locales que mañana por la mañana habrá tareas de mantenimiento en la red de distribución. Tomen sus precauciones y junten agua.",
        "likes" => 15,
        "comentarios" => 3
    ],
    [
        "id" => 3,
        "autor" => "Luis Martínez",
        "iniciales" => "LM",
        "fecha" => "Hace 3 días",
        "categoria" => "debate",
        "titulo" => "Estado de las calles secundarias luego de las lluvias",
        "contenido" => "Es preocupante cómo quedaron los caminos de balasto en la salida hacia la ruta. Los vehículos chicos rompen todo el tren delantero. ¿Saben si las cuadrillas tienen planeado pasar esta semana?",
        "likes" => 42,
        "comentarios" => 28
    ]
];

echo json_encode($discusiones);
exit;