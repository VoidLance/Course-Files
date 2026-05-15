<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$pageTitle = 'Order Confirmation';
require $rootPath . '/templates/checkout/confirmation.php';
