<?php require $rootPath . '/templates/partials/header.php'; ?>
// Login view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4 mx-auto" style="max-width: 520px;">
    <h1 class="h3 mb-3">Login</h1>
    <form method="POST" novalidate>
        <?= csrf_field(); ?>
        <div class="mb-3">
            <label class="form-label" for="email">Email</label>
            <input class="form-control" id="email" name="email" type="email" required value="<?= e($old['email'] ?? ''); ?>">
        </div>
        <div class="mb-3">
            <label class="form-label" for="password">Password</label>
            <input class="form-control" id="password" name="password" type="password" required minlength="8">
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
        <a class="btn btn-link" href="<?= e(base_url('auth/forgot-password.php')); ?>">Forgot password?</a>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
