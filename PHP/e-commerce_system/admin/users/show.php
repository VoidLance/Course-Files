<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$pageTitle = 'User Details';
require $rootPath . '/templates/admin/users/show.php';
