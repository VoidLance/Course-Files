<?php require $rootPath . '/templates/partials/header.php'; ?>
// Show view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 m-0">Order <?= e($order['order_number']); ?></h1>
        <a class="btn btn-outline-primary" href="<?= e(base_url('orders/invoice.php?id=' . (int) $order['order_id'])); ?>">Download Invoice (PDF)</a>
    </div>
    <p class="mb-1">Status: <strong><?= e($order['status']); ?></strong></p>
    <p class="mb-1">Payment: <strong><?= e($order['payment_status']); ?></strong></p>
    <p class="mb-3">Total: <strong><?= e(money((float) $order['total_amount'])); ?></strong></p>

    <div class="table-responsive mb-3">
        <table class="table table-striped align-middle">
            <thead><tr><th>Product</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead>
            <tbody>
            <?php foreach ($items as $item): ?>
                <tr>
                    <td><?= e($item['product_name']); ?></td>
                    <td><?= (int) $item['quantity']; ?></td>
                    <td><?= e(money((float) $item['unit_price'])); ?></td>
                    <td><?= e(money((float) $item['line_total'])); ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <h2 class="h5">Status Timeline</h2>
    <ul class="list-group">
        <?php foreach ($history as $event): ?>
            <li class="list-group-item d-flex justify-content-between">
                <span><strong><?= e($event['status']); ?></strong> - <?= e($event['comment'] ?? ''); ?></span>
                <span><?= e($event['created_at']); ?></span>
            </li>
        <?php endforeach; ?>
    </ul>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
