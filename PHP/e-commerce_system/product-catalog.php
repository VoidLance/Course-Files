<?php

declare(strict_types=1);
// Product catalog file. Straightforward on purpose, because beginner code should be readable.

$queryString = $_SERVER['QUERY_STRING'] ?? '';
$target = 'public/products/catalog.php';

if ($queryString !== '') {
    $target .= '?' . $queryString;
}

header('Location: ' . $target);
exit;