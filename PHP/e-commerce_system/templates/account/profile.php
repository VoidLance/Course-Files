<?php require $rootPath . '/templates/partials/header.php'; ?>
// Profile view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <h1 class="h3 mb-3">Profile</h1>
    <form method="POST" class="row g-3" novalidate>
        <?= csrf_field(); ?>
        <div class="col-md-6">
            <label class="form-label" for="first_name">First name</label>
            <input class="form-control" id="first_name" name="first_name" required value="<?= e($user['first_name'] ?? ''); ?>">
        </div>
        <div class="col-md-6">
            <label class="form-label" for="last_name">Last name</label>
            <input class="form-control" id="last_name" name="last_name" required value="<?= e($user['last_name'] ?? ''); ?>">
        </div>
        <div class="col-12">
            <label class="form-label">Email</label>
            <input class="form-control" value="<?= e($user['email'] ?? ''); ?>" disabled>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Save Profile</button>
        </div>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
