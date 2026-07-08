<?php require $rootPath . '/templates/partials/header.php'; ?>
// Index view. Mostly HTML, with just enough PHP to stay useful.
<section class="card p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 m-0">Product Management</h1>
        <a class="btn btn-primary" href="create.php">Create Product</a>
    </div>
    <div class="table-responsive">
        <table class="table table-striped align-middle">
            <thead><tr><th>ID</th><th>Name</th><th>SKU</th><th>Price</th><th>Stock</th><th></th></tr></thead>
            <tbody>
            <?php foreach ($products as $product): ?>
                <tr>
                    <td><?= (int) $product['product_id']; ?></td>
                    <td><?= e($product['product_name']); ?></td>
                    <td><?= e($product['sku']); ?></td>
                    <td><?= e(money((float) $product['price'])); ?></td>
                    <td><?= (int) $product['stock_quantity']; ?></td>
                    <td class="text-end">
                        <a class="btn btn-sm btn-outline-primary" href="edit.php?id=<?= (int) $product['product_id']; ?>">Edit</a>
                        <form class="d-inline" method="POST" action="delete.php">
                            <?= csrf_field(); ?>
                            <input type="hidden" name="product_id" value="<?= (int) $product['product_id']; ?>">
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
