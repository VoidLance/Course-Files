<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$pageTitle = 'Login';
require $rootPath . '/templates/auth/login.php';
