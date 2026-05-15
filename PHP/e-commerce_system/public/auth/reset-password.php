<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$pageTitle = 'Reset Password';
require $rootPath . '/templates/auth/reset-password.php';
