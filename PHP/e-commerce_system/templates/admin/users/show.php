<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles min  > users  > show - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3"><?= e($pageTitle ?? 'User Details'); ?></h1>
    <p><strong>Name:</strong> <?= e(($user['first_name'] ?? '') . ' ' . ($user['last_name'] ?? '')); ?></p>
    <p><strong>Email:</strong> <?= e($user['email'] ?? ''); ?></p>
    <p><strong>Verified:</strong> <?= !empty($user['is_verified']) ? 'Yes' : 'No'; ?></p>

    <form method="POST" class="row g-3" action="edit.php?id=<?= (int) ($user['user_id'] ?? 0); ?>">
        <?= csrf_field(); ?>
        <div class="col-md-6">
            <label class="form-label">Role</label>
            <select class="form-select" name="role">
                <option value="customer" <?= (($user['role'] ?? 'customer') === 'customer') ? 'selected' : ''; ?>>Customer</option>
                <option value="admin" <?= (($user['role'] ?? '') === 'admin') ? 'selected' : ''; ?>>Admin</option>
            </select>
        </div>
        <div class="col-md-6">
            <label class="form-label">Status</label>
            <select class="form-select" name="status">
                <option value="active" <?= (($user['status'] ?? 'active') === 'active') ? 'selected' : ''; ?>>Active</option>
                <option value="disabled" <?= (($user['status'] ?? '') === 'disabled') ? 'selected' : ''; ?>>Disabled</option>
            </select>
        </div>
        <div class="col-12"><button class="btn btn-primary" type="submit">Save User</button></div>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
