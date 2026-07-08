<?php require $rootPath . '/templates/partials/header.php'; ?>
// Forgot password view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4 mx-auto" style="max-width: 520px;">
    <h1 class="h3 mb-3">Forgot Password</h1>
    <form method="POST" novalidate>
        <?= csrf_field(); ?>
        <div class="mb-3">
            <label class="form-label" for="email">Email</label>
            <input class="form-control" id="email" name="email" type="email" required value="<?= e($old['email'] ?? ''); ?>">
        </div>
        <button class="btn btn-primary" type="submit">Send Reset Link</button>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
