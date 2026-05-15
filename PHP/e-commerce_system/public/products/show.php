<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$productId = max(1, (int) ($_GET['id'] ?? 0));
$viewData = $productController->show($productId);

if ($viewData === null) {
    http_response_code(404);
    exit('Product not found.');
}

extract($viewData, EXTR_SKIP);
require $rootPath . '/templates/products/show.php';
