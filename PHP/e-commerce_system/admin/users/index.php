<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$pageTitle = 'Manage Users';
require $rootPath . '/templates/admin/users/index.php';
