<?php require $rootPath . '/templates/partials/header.php'; ?>
// Index view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 m-0">Category Management</h1>
        <a class="btn btn-primary" href="create.php">Create Category</a>
    </div>
    <div class="table-responsive">
        <table class="table table-striped align-middle">
            <thead><tr><th>ID</th><th>Name</th><th>Slug</th><th></th></tr></thead>
            <tbody>
            <?php foreach ($categories as $category): ?>
                <tr>
                    <td><?= (int) $category['category_id']; ?></td>
                    <td><?= e($category['category_name']); ?></td>
                    <td><?= e($category['slug']); ?></td>
                    <td class="text-end">
                        <a class="btn btn-sm btn-outline-primary" href="edit.php?id=<?= (int) $category['category_id']; ?>">Edit</a>
                        <form class="d-inline" method="POST" action="delete.php">
                            <?= csrf_field(); ?>
                            <input type="hidden" name="category_id" value="<?= (int) $category['category_id']; ?>">
                            <button class="btn btn-sm btn-outline-danger" type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
