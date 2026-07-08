<?php require $rootPath . '/templates/partials/header.php'; ?>
// Shipping view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <h1 class="h3 mb-3">Checkout: Shipping</h1>
    <form method="POST" class="row g-3" novalidate>
        <?= csrf_field(); ?>
        <div class="col-md-6"><label class="form-label">Email</label><input class="form-control" type="email" name="customer_email" required value="<?= e($shippingState['customer_email'] ?? ($_SESSION['user_email'] ?? '')); ?>"></div>
        <div class="col-md-6"><label class="form-label">Recipient name</label><input class="form-control" name="recipient_name" required value="<?= e($shippingState['recipient_name'] ?? ''); ?>"></div>
        <div class="col-12"><label class="form-label">Address line 1</label><input class="form-control" name="line_one" required value="<?= e($shippingState['line_one'] ?? ''); ?>"></div>
        <div class="col-12"><label class="form-label">Address line 2</label><input class="form-control" name="line_two" value="<?= e($shippingState['line_two'] ?? ''); ?>"></div>
        <div class="col-md-4"><label class="form-label">City</label><input class="form-control" name="city" required value="<?= e($shippingState['city'] ?? ''); ?>"></div>
        <div class="col-md-4"><label class="form-label">State/Region</label><input class="form-control" name="state_region" required value="<?= e($shippingState['state_region'] ?? ''); ?>"></div>
        <div class="col-md-4"><label class="form-label">Postal code</label><input class="form-control" name="postal_code" required value="<?= e($shippingState['postal_code'] ?? ''); ?>"></div>
        <div class="col-md-3"><label class="form-label">Country code</label><input class="form-control" name="country_code" maxlength="2" required value="<?= e($shippingState['country_code'] ?? 'US'); ?>"></div>
        <div class="col-md-3"><label class="form-label">Phone</label><input class="form-control" name="phone" value="<?= e($shippingState['phone'] ?? ''); ?>"></div>
        <div class="col-md-6">
            <label class="form-label">Shipping method</label>
            <select class="form-select" name="shipping_method" required>
                <?php foreach ($shippingMethods as $method): ?>
                    <option value="<?= e($method['code']); ?>" <?= (($shippingState['shipping_method']['code'] ?? '') === $method['code']) ? 'selected' : ''; ?>>
                        <?= e($method['name']); ?> (<?= e(money((float) $method['amount'])); ?>)
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col-12"><button class="btn btn-primary" type="submit">Continue to Payment</button></div>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
