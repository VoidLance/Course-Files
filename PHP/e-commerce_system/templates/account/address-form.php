<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles count  > address form - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3"><?= e($pageTitle ?? 'Address Form'); ?></h1>
    <form method="POST" class="row g-3" novalidate>
        <?= csrf_field(); ?>
        <div class="col-md-4"><label class="form-label">Label</label><input class="form-control" name="label" required value="<?= e($address['label'] ?? 'Home'); ?>"></div>
        <div class="col-md-8"><label class="form-label">Recipient</label><input class="form-control" name="recipient_name" required value="<?= e($address['recipient_name'] ?? ''); ?>"></div>
        <div class="col-12"><label class="form-label">Address line 1</label><input class="form-control" name="line_one" required value="<?= e($address['line_one'] ?? ''); ?>"></div>
        <div class="col-12"><label class="form-label">Address line 2</label><input class="form-control" name="line_two" value="<?= e($address['line_two'] ?? ''); ?>"></div>
        <div class="col-md-4"><label class="form-label">City</label><input class="form-control" name="city" required value="<?= e($address['city'] ?? ''); ?>"></div>
        <div class="col-md-4"><label class="form-label">State/Region</label><input class="form-control" name="state_region" required value="<?= e($address['state_region'] ?? ''); ?>"></div>
        <div class="col-md-4"><label class="form-label">Postal code</label><input class="form-control" name="postal_code" required value="<?= e($address['postal_code'] ?? ''); ?>"></div>
        <div class="col-md-3"><label class="form-label">Country code</label><input class="form-control" name="country_code" required maxlength="2" value="<?= e($address['country_code'] ?? 'US'); ?>"></div>
        <div class="col-md-3"><label class="form-label">Phone</label><input class="form-control" name="phone" value="<?= e($address['phone'] ?? ''); ?>"></div>
        <div class="col-md-3">
            <label class="form-label">Type</label>
            <select class="form-select" name="address_type">
                <option value="shipping" <?= (($address['address_type'] ?? 'shipping') === 'shipping') ? 'selected' : ''; ?>>Shipping</option>
                <option value="billing" <?= (($address['address_type'] ?? '') === 'billing') ? 'selected' : ''; ?>>Billing</option>
            </select>
        </div>
        <div class="col-md-3 d-flex align-items-end">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="is_default" id="is_default" value="1" <?= !empty($address['is_default']) ? 'checked' : ''; ?>>
                <label class="form-check-label" for="is_default">Default address</label>
            </div>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Save Address</button>
        </div>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
