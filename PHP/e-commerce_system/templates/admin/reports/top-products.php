<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles min  > reports  > top products - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3">Top Products</h1>
    <div class="table-responsive">
        <table class="table table-striped align-middle">
            <thead><tr><th>Product</th><th>Units Sold</th><th>Revenue</th></tr></thead>
            <tbody>
            <?php foreach ($topProducts as $row): ?>
                <tr>
                    <td><?= e($row['product_name']); ?></td>
                    <td><?= (int) $row['units_sold']; ?></td>
                    <td><?= e(money((float) $row['revenue'])); ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
