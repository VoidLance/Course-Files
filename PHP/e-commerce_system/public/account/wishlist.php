<?php

declare(strict_types=1);
// Starter note: This file handles nt  > wishlist - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$wishlistItems = $wishlistController->index((int) $_SESSION['user_id']);

$pageTitle = 'Wishlist';
require $rootPath . '/templates/account/wishlist.php';
