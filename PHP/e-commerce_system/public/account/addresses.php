<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$pageTitle = 'Addresses';
require $rootPath . '/templates/account/addresses.php';
