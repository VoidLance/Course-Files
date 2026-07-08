<?php

declare(strict_types=1);
// Starter note: This file handles s  > index - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$orders = $orderController->userOrders();

$pageTitle = 'Order History';
require $rootPath . '/templates/orders/index.php';
