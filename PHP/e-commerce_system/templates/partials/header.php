<?php $cartSummary = $cartSummary ?? ['item_count' => 0, 'subtotal' => 0.0]; ?>
// Starter note: This file handles rtials  > header - straightforward on purpose.
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle ?? app_config('app_name', 'E-Commerce System')); ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?= e(asset_url('css/store.css')); ?>">
</head>
<body>
<header class="site-header py-2 mb-4">
    <div class="container d-flex flex-wrap align-items-center justify-content-between gap-3">
        <a class="brand fw-bold fs-5" href="<?= e(base_url('products/catalog.php')); ?>">E-Commerce System</a>
        <nav class="header-nav d-flex flex-wrap gap-3 align-items-center">
            <a href="<?= e(base_url('products/catalog.php')); ?>">Catalog</a>
            <a href="<?= e(base_url('cart/index.php')); ?>">Cart</a>
            <a href="<?= e(base_url('checkout/shipping.php')); ?>">Checkout</a>
            <a href="<?= e(base_url('newsletter/subscribe.php')); ?>">Newsletter</a>
            <?php if (is_logged_in()): ?>
                <a href="<?= e(base_url('account/profile.php')); ?>">My Account</a>
                <a href="<?= e(base_url('orders/index.php')); ?>">Orders</a>
                <?php if (($_SESSION['role'] ?? '') === 'admin'): ?>
                    <a href="<?= e(base_url('../admin/dashboard.php')); ?>">Admin</a>
                <?php endif; ?>
                <a href="<?= e(base_url('auth/logout.php')); ?>">Logout</a>
            <?php else: ?>
                <a href="<?= e(base_url('auth/login.php')); ?>">Login</a>
                <a href="<?= e(base_url('auth/register.php')); ?>">Register</a>
            <?php endif; ?>
        </nav>
        <?php require __DIR__ . '/mini-cart.php'; ?>
    </div>
</header>
<main class="container page-shell pb-5">
    <?php require __DIR__ . '/flash-messages.php'; ?>
