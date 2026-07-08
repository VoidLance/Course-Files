<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles ders  > index - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3">Order History</h1>
    <?php if ($orders === []): ?>
        <p class="mb-0">No orders yet.</p>
    <?php else: ?>
        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead><tr><th>Order</th><th>Date</th><th>Status</th><th>Total</th><th></th></tr></thead>
                <tbody>
                <?php foreach ($orders as $order): ?>
                    <tr>
                        <td><?= e($order['order_number']); ?></td>
                        <td><?= e($order['created_at']); ?></td>
                        <td><?= e($order['status']); ?></td>
                        <td><?= e(money((float) $order['total_amount'])); ?></td>
                        <td><a class="btn btn-sm btn-outline-primary" href="<?= e(base_url('orders/show.php?id=' . (int) $order['order_id'])); ?>">View</a></td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endif; ?>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
