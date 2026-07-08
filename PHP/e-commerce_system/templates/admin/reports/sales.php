<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles min  > reports  > sales - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3">Sales Report</h1>
    <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between"><span>Total Orders</span><strong><?= (int) $sales['total_orders']; ?></strong></li>
        <li class="list-group-item d-flex justify-content-between"><span>Total Sales</span><strong><?= e(money((float) $sales['total_sales'])); ?></strong></li>
        <li class="list-group-item d-flex justify-content-between"><span>Average Order Value</span><strong><?= e(money((float) $sales['average_order_value'])); ?></strong></li>
    </ul>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
