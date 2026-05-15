<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

extract($productController->catalog(), EXTR_SKIP);
require $rootPath . '/templates/products/catalog.php';
