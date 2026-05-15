<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$pageTitle = 'Wishlist';
require $rootPath . '/templates/account/wishlist.php';
