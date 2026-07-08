<?php require $rootPath . '/templates/partials/header.php'; ?>
// Confirmation view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4 text-center">
    <h1 class="h3 mb-3">Order Confirmation</h1>
    <?php if ($order !== null): ?>
        <p class="lead">Thank you for your order.</p>
        <p>Order Number: <strong><?= e($order['order_number']); ?></strong></p>
        <p>Status: <strong><?= e($order['status']); ?></strong></p>
        <a class="btn btn-primary" href="<?= e(base_url('orders/show.php?id=' . (int) $order['order_id'])); ?>">View Order</a>
    <?php else: ?>
        <p>No recent order was found.</p>
    <?php endif; ?>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
