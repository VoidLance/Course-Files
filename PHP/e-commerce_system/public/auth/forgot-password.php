<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$pageTitle = 'Forgot Password';
require $rootPath . '/templates/auth/forgot-password.php';
