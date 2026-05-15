<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$pageTitle = 'Payment Methods';
require $rootPath . '/templates/account/payment-methods.php';
