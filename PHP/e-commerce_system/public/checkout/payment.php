<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$pageTitle = 'Checkout: Payment';
require $rootPath . '/templates/checkout/payment.php';
