<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$arquivo = 'acessos.txt';

// Ler o número atual de acessos
if (file_exists($arquivo)) {
    $acessos = (int)file_get_contents($arquivo);
} else {
    $acessos = 0;
}

// Incrementar o contador
$acessos++;

// Salvar o novo número
file_put_contents($arquivo, $acessos);

// Retornar o número atual de acessos
echo json_encode(['acessos' => $acessos]);
?> 