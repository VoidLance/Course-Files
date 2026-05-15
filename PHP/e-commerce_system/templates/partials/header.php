<?php $cartSummary = $cartSummary ?? ['item_count' => 0, 'subtotal' => 0.0]; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle ?? app_config('app_name', 'E-Commerce System')); ?></title>
    <link rel="stylesheet" href="<?= e(asset_url('css/store.css')); ?>">
</head>
<body>
<header class="site-header">
    <div class="container header-bar">
        <a class="brand" href="<?= e(base_url('products/catalog.php')); ?>">E-Commerce System</a>
        <nav class="header-nav">
            <a href="<?= e(base_url('products/catalog.php')); ?>">Catalog</a>
            <a href="<?= e(base_url('cart/index.php')); ?>">Cart</a>
        </nav>
        <?php require __DIR__ . '/mini-cart.php'; ?>
    </div>
</header>
<main class="container page-shell">
    <?php require __DIR__ . '/flash-messages.php'; ?>
