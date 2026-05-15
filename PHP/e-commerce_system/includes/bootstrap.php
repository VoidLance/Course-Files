<?php

declare(strict_types=1);

$rootPath = dirname(__DIR__);
$appConfig = require $rootPath . '/config/app.php';
$GLOBALS['app_config'] = $appConfig;

date_default_timezone_set((string) ($appConfig['timezone'] ?? 'UTC'));

require $rootPath . '/config/session.php';
require $rootPath . '/includes/helpers.php';
require $rootPath . '/includes/csrf.php';
require $rootPath . '/includes/auth.php';

$databaseConfig = require $rootPath . '/config/database.php';

$connection = new mysqli(
    $databaseConfig['host'],
    $databaseConfig['username'],
    $databaseConfig['password'],
    $databaseConfig['database'],
    (int) $databaseConfig['port']
);

if ($connection->connect_error) {
    throw new RuntimeException('Database connection failed: ' . $connection->connect_error);
}

$connection->set_charset((string) $databaseConfig['charset']);

require_once $rootPath . '/models/Product.php';
require_once $rootPath . '/models/Cart.php';
require_once $rootPath . '/services/CartService.php';
require_once $rootPath . '/controllers/ProductController.php';
require_once $rootPath . '/controllers/CartController.php';

$productModel = new Product($connection);
$cartModel = new Cart();
$cartService = new CartService($productModel, $cartModel);
$productController = new ProductController($productModel, $cartService);
$cartController = new CartController($cartService);
