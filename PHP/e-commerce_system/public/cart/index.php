<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

extract($cartController->index(), EXTR_SKIP);
$cartSummary = ['item_count' => $item_count, 'subtotal' => $subtotal];
require $rootPath . '/templates/cart/index.php';
