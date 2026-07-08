<?php require $rootPath . '/templates/partials/header.php'; ?>
// Payment methods view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4 mb-4">
    <h1 class="h3 mb-3">Saved Payment Methods</h1>
    <form method="POST" class="row g-3 mb-4" novalidate>
        <?= csrf_field(); ?>
        <input type="hidden" name="action" value="add">
        <div class="col-md-3"><label class="form-label">Provider</label><input class="form-control" name="provider" value="paypal" required></div>
        <div class="col-md-3"><label class="form-label">Reference token</label><input class="form-control" name="provider_reference" required></div>
        <div class="col-md-2"><label class="form-label">Brand</label><input class="form-control" name="brand"></div>
        <div class="col-md-2"><label class="form-label">Last 4</label><input class="form-control" name="last_four" maxlength="4"></div>
        <div class="col-md-1"><label class="form-label">MM</label><input class="form-control" name="expires_month" type="number" min="1" max="12"></div>
        <div class="col-md-1"><label class="form-label">YYYY</label><input class="form-control" name="expires_year" type="number" min="2020" max="2100"></div>
        <div class="col-12"><button class="btn btn-primary" type="submit">Add Method</button></div>
    </form>

    <div class="table-responsive">
        <table class="table table-striped align-middle">
            <thead><tr><th>Provider</th><th>Reference</th><th>Brand</th><th>Last 4</th><th></th></tr></thead>
            <tbody>
            <?php foreach ($paymentMethods as $method): ?>
                <tr>
                    <td><?= e($method['provider']); ?></td>
                    <td><?= e($method['provider_reference']); ?></td>
                    <td><?= e($method['brand'] ?? ''); ?></td>
                    <td><?= e($method['last_four'] ?? ''); ?></td>
                    <td class="text-end">
                        <form method="POST" class="d-inline">
                            <?= csrf_field(); ?>
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="payment_method_id" value="<?= (int) $method['payment_method_id']; ?>">
                            <button class="btn btn-sm btn-outline-danger" type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
