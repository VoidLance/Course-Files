<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles th  > register - straightforward on purpose.
<section class="card p-4 mx-auto" style="max-width: 640px;">
    <h1 class="h3 mb-3">Create Account</h1>
    <form method="POST" novalidate>
        <?= csrf_field(); ?>
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label" for="first_name">First name</label>
                <input class="form-control" id="first_name" name="first_name" required value="<?= e($old['first_name'] ?? ''); ?>">
            </div>
            <div class="col-md-6">
                <label class="form-label" for="last_name">Last name</label>
                <input class="form-control" id="last_name" name="last_name" required value="<?= e($old['last_name'] ?? ''); ?>">
            </div>
            <div class="col-12">
                <label class="form-label" for="email">Email</label>
                <input class="form-control" id="email" name="email" type="email" required value="<?= e($old['email'] ?? ''); ?>">
            </div>
            <div class="col-12">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" id="password" name="password" type="password" required minlength="8">
            </div>
        </div>
        <button class="btn btn-primary mt-3" type="submit">Register</button>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
