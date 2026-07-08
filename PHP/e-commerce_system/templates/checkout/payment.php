<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles eckout  > payment - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3">Checkout: Payment</h1>
    <form method="POST" novalidate>
        <?= csrf_field(); ?>
        <div class="mb-3">
            <label class="form-label">Payment Method</label>
            <select class="form-select" name="payment_method" required>
                <option value="paypal" selected>PayPal (Sandbox)</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label" for="coupon_code">Coupon Code</label>
            <input class="form-control" id="coupon_code" name="coupon_code" value="<?= e($paymentState['coupon_code'] ?? ''); ?>">
        </div>
        <button class="btn btn-primary" type="submit">Continue to Review</button>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
