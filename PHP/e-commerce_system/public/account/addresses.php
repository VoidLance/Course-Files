<?php

declare(strict_types=1);
// Starter note: This file handles nt  > addresses - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$addresses = $accountController->addresses((int) $_SESSION['user_id']);

$pageTitle = 'Addresses';
require $rootPath . '/templates/account/addresses.php';
