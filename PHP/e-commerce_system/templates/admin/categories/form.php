<?php require $rootPath . '/templates/partials/header.php'; ?>
// Form view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <h1 class="h3 mb-3"><?= e($pageTitle ?? 'Category Form'); ?></h1>
    <form method="POST" class="row g-3" novalidate>
        <?= csrf_field(); ?>
        <div class="col-md-6"><label class="form-label">Name</label><input class="form-control" name="category_name" required value="<?= e($category['category_name'] ?? ''); ?>"></div>
        <div class="col-md-6"><label class="form-label">Slug</label><input class="form-control" name="slug" required value="<?= e($category['slug'] ?? ''); ?>"></div>
        <div class="col-12"><button class="btn btn-primary" type="submit">Save Category</button></div>
    </form>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
