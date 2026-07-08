<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles min  > dashboard - straightforward on purpose.
<section class="row g-3 mb-3">
    <div class="col-md-4"><div class="card p-3"><h2 class="h6">Total Orders</h2><p class="display-6 mb-0"><?= (int) ($dashboard['sales']['total_orders'] ?? 0); ?></p></div></div>
    <div class="col-md-4"><div class="card p-3"><h2 class="h6">Total Sales</h2><p class="display-6 mb-0"><?= e(money((float) ($dashboard['sales']['total_sales'] ?? 0))); ?></p></div></div>
    <div class="col-md-4"><div class="card p-3"><h2 class="h6">Average Order</h2><p class="display-6 mb-0"><?= e(money((float) ($dashboard['sales']['average_order_value'] ?? 0))); ?></p></div></div>
</section>

<section class="card p-4 mb-3">
    <h2 class="h5">Recent Orders</h2>
    <ul class="list-group list-group-flush">
        <?php foreach ($dashboard['recentOrders'] as $order): ?>
            <li class="list-group-item d-flex justify-content-between"><span><?= e($order['order_number']); ?> - <?= e($order['status']); ?></span><span><?= e(money((float) $order['total_amount'])); ?></span></li>
        <?php endforeach; ?>
    </ul>
</section>

<section class="card p-4">
    <h2 class="h5">Low Stock</h2>
    <ul class="list-group list-group-flush">
        <?php foreach ($dashboard['lowStock'] as $product): ?>
            <li class="list-group-item d-flex justify-content-between"><span><?= e($product['product_name']); ?></span><span><?= (int) $product['stock_quantity']; ?></span></li>
        <?php endforeach; ?>
    </ul>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
