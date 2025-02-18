<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$arquivo = 'acessos.txt';

// Verificar se o cookie de acesso já existe
if (!isset($_COOKIE['acesso_unico'])) {
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

    // Definir o cookie para expirar em 30 dias
    setcookie('acesso_unico', '1', time() + (30 * 24 * 60 * 60)); // 30 dias
}

// Ler o número atual de acessos
$acessos = (int)file_get_contents($arquivo);

// Retornar o número atual de acessos
echo json_encode(['acessos' => $acessos]);
?> 