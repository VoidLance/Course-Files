<?php

declare(strict_types=1);
// Starter note: This file handles log - straightforward on purpose.

$queryString = $_SERVER['QUERY_STRING'] ?? '';
$target = 'public/products/catalog.php';

if ($queryString !== '') {
    $target .= '?' . $queryString;
}

header('Location: ' . $target);
exit;