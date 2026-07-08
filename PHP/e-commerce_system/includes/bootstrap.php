<?php

declare(strict_types=1);
// Starter note: This file handles tstrap - straightforward on purpose.

$rootPath = dirname(__DIR__);
$appConfig = require $rootPath . '/config/app.php';
$GLOBALS['app_config'] = $appConfig;

date_default_timezone_set((string) ($appConfig['timezone'] ?? 'UTC'));

require $rootPath . '/config/session.php';
require $rootPath . '/includes/helpers.php';
require $rootPath . '/includes/csrf.php';
require $rootPath . '/includes/auth.php';

if (!extension_loaded('mysqli')) {
    throw new RuntimeException(
        'PHP extension "mysqli" is not enabled. Enable mysqli (and usually pdo_mysql) in php.ini, then restart your local PHP server.'
    );
}

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
require_once $rootPath . '/models/User.php';
require_once $rootPath . '/models/Address.php';
require_once $rootPath . '/models/PaymentMethod.php';
require_once $rootPath . '/models/Category.php';
require_once $rootPath . '/models/Coupon.php';
require_once $rootPath . '/models/Order.php';
require_once $rootPath . '/models/Review.php';
require_once $rootPath . '/models/Wishlist.php';
require_once $rootPath . '/models/Inventory.php';
require_once $rootPath . '/models/NewsletterSubscriber.php';

require_once $rootPath . '/services/CartService.php';
require_once $rootPath . '/services/EmailService.php';
require_once $rootPath . '/services/AuthService.php';
require_once $rootPath . '/services/ShippingService.php';
require_once $rootPath . '/services/CouponService.php';
require_once $rootPath . '/services/OrderService.php';
require_once $rootPath . '/services/CheckoutService.php';
require_once $rootPath . '/services/InvoiceService.php';
require_once $rootPath . '/services/PayPalService.php';
require_once $rootPath . '/services/SearchService.php';
require_once $rootPath . '/services/WishlistService.php';
require_once $rootPath . '/services/ReviewService.php';
require_once $rootPath . '/services/NewsletterService.php';

require_once $rootPath . '/controllers/ProductController.php';
require_once $rootPath . '/controllers/CartController.php';
require_once $rootPath . '/controllers/AuthController.php';
require_once $rootPath . '/controllers/AccountController.php';
require_once $rootPath . '/controllers/CheckoutController.php';
require_once $rootPath . '/controllers/OrderController.php';
require_once $rootPath . '/controllers/AdminController.php';
require_once $rootPath . '/controllers/SearchController.php';
require_once $rootPath . '/controllers/WishlistController.php';
require_once $rootPath . '/controllers/ReviewController.php';
require_once $rootPath . '/controllers/CouponController.php';
require_once $rootPath . '/controllers/NewsletterController.php';

$productModel = new Product($connection);
$cartModel = new Cart();
$userModel = new User($connection);
$addressModel = new Address($connection);
$paymentMethodModel = new PaymentMethod($connection);
$categoryModel = new Category($connection);
$couponModel = new Coupon($connection);
$orderModel = new Order($connection);
$reviewModel = new Review($connection);
$wishlistModel = new Wishlist($connection);
$inventoryModel = new Inventory($connection);
$newsletterSubscriberModel = new NewsletterSubscriber($connection);

$mailConfig = require $rootPath . '/config/mail.php';
$paypalConfig = require $rootPath . '/config/paypal.php';

$emailService = new EmailService($mailConfig);
$cartService = new CartService($productModel, $cartModel);
$authService = new AuthService($userModel, $emailService);
$shippingService = new ShippingService();
$couponService = new CouponService($couponModel);
$orderService = new OrderService($orderModel);
$checkoutService = new CheckoutService($cartService, $shippingService, $couponService, $orderModel, $couponModel);
$invoiceService = new InvoiceService();
$paypalService = new PayPalService($paypalConfig);
$searchService = new SearchService();
$wishlistService = new WishlistService($wishlistModel);
$reviewService = new ReviewService($reviewModel);
$newsletterService = new NewsletterService($newsletterSubscriberModel);

$authController = new AuthController($authService);
$accountController = new AccountController($userModel, $addressModel, $paymentMethodModel);
$checkoutController = new CheckoutController($checkoutService, $shippingService);
$orderController = new OrderController($orderService, $invoiceService);
$adminController = new AdminController($orderService, $inventoryModel);
$searchController = new SearchController($searchService);
$wishlistController = new WishlistController($wishlistService);
$reviewController = new ReviewController($reviewService);
$couponController = new CouponController($couponService);
$newsletterController = new NewsletterController($newsletterService);
$productController = new ProductController($productModel, $cartService, $searchController, $reviewController);
$cartController = new CartController($cartService);
