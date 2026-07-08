<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles th  > reset password - straightforward on purpose.
<section class="card p-4 mx-auto" style="max-width: 520px;">
    <h1 class="h3 mb-3">Reset Password</h1>
    <form method="POST" novalidate>
        <?= csrf_field(); ?>
        <input type="hidden" name="token" value="<?= e($token ?? ''); ?>">
        <div class="mb-3">
            <label class="form-label" for="password">New password</label>
            <input class="form-control" id="password" name="password" type="password" required minlength="8">
        </div>
        <button class="btn btn-primary" type="submit">Reset Password</button>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
