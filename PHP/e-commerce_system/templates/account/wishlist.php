<?php
// Starter note: This file handles count  > wishlist - straightforward on purpose.
$pageTitle = 'Wishlist';
require $rootPath . '/templates/partials/header.php';
?>
<section class="card p-4">
    <h1 class="h3 mb-3">Wishlist</h1>
    <?php if ($wishlistItems === []): ?>
        <p class="mb-0">No wishlist items yet.</p>
    <?php else: ?>
        <div class="row g-3">
            <?php foreach ($wishlistItems as $item): ?>
                <div class="col-md-4">
                    <article class="border rounded p-3 h-100">
                        <h2 class="h6"><?= e($item['product_name']); ?></h2>
                        <p class="mb-2"><?= e(money((float) $item['price'])); ?></p>
                        <a class="btn btn-sm btn-outline-primary" href="<?= e(base_url('products/show.php?id=' . (int) $item['product_id'])); ?>">View</a>
                        <form class="d-inline" method="POST" action="<?= e(base_url('account/wishlist-remove.php')); ?>">
                            <?= csrf_field(); ?>
                            <input type="hidden" name="product_id" value="<?= (int) $item['product_id']; ?>">
                            <button class="btn btn-sm btn-outline-danger" type="submit">Remove</button>
                        </form>
                    </article>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
