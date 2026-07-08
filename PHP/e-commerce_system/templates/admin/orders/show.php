<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles min  > orders  > show - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3">Order <?= e($order['order_number']); ?></h1>
    <p>Email: <?= e($order['customer_email']); ?></p>
    <p>Total: <?= e(money((float) $order['total_amount'])); ?></p>

    <form method="POST" action="update-status.php" class="row g-2 align-items-end mb-3">
        <?= csrf_field(); ?>
        <input type="hidden" name="order_id" value="<?= (int) $order['order_id']; ?>">
        <div class="col-md-4">
            <label class="form-label">Status</label>
            <select class="form-select" name="status">
                <?php foreach (['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'] as $status): ?>
                    <option value="<?= e($status); ?>" <?= $order['status'] === $status ? 'selected' : ''; ?>><?= e(ucfirst($status)); ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col-md-6"><label class="form-label">Comment</label><input class="form-control" name="comment"></div>
        <div class="col-md-2"><button class="btn btn-primary w-100" type="submit">Update</button></div>
    </form>

    <h2 class="h5">Items</h2>
    <ul class="list-group mb-3">
        <?php foreach ($items as $item): ?>
            <li class="list-group-item d-flex justify-content-between"><span><?= e($item['product_name']); ?> x<?= (int) $item['quantity']; ?></span><span><?= e(money((float) $item['line_total'])); ?></span></li>
        <?php endforeach; ?>
    </ul>

    <h2 class="h5">History</h2>
    <ul class="list-group">
        <?php foreach ($history as $event): ?>
            <li class="list-group-item d-flex justify-content-between"><span><?= e($event['status']); ?> - <?= e($event['comment'] ?? ''); ?></span><span><?= e($event['created_at']); ?></span></li>
        <?php endforeach; ?>
    </ul>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
