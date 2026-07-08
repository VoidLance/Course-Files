<?php
// Starter note: This file handles oducts  > show - straightforward on purpose.
$pageTitle = $product['product_name'];
require $rootPath . '/templates/partials/header.php';
?>
<article class="product-detail">
    <img src="<?= e($product['image_url'] ?? 'https://via.placeholder.com/480x360?text=Product'); ?>" alt="<?= e($product['product_name']); ?>" class="product-detail-image">
    <div>
        <p class="product-category"><?= e($product['category_name'] ?? 'Uncategorized'); ?></p>
        <h1><?= e($product['product_name']); ?></h1>
        <p class="product-price"><?= e(money((float) $product['price'])); ?></p>
        <p><?= e($product['description'] ?? 'No description available.'); ?></p>
        <form method="POST" action="<?= e(base_url('cart/add.php')); ?>" class="product-detail-form">
            <?= csrf_field(); ?>
            <input type="hidden" name="product_id" value="<?= (int) $product['product_id']; ?>">
            <input type="hidden" name="return_to" value="<?= e(base_url('products/show.php?id=' . (int) $product['product_id'])); ?>">
            <label>
                Quantity
                <input type="number" name="quantity" min="1" max="<?= max(1, (int) $product['stock_quantity']); ?>" value="1">
            </label>
            <button class="btn btn-cart" type="submit" <?= (int) $product['stock_quantity'] > 0 ? '' : 'disabled'; ?>>Add to Cart</button>
        </form>
        <?php if (is_logged_in()): ?>
            <form method="POST" action="<?= e(base_url('account/wishlist-add.php')); ?>" class="mt-2">
                <?= csrf_field(); ?>
                <input type="hidden" name="product_id" value="<?= (int) $product['product_id']; ?>">
                <button class="btn btn-view" type="submit">Add to Wishlist</button>
            </form>
        <?php endif; ?>
    </div>
</article>

<section class="card p-4 mt-4">
    <h2 class="h4 mb-3">Related Products</h2>
    <div class="row g-3">
        <?php foreach ($relatedProducts as $related): ?>
            <div class="col-md-3">
                <article class="border rounded p-3 h-100">
                    <h3 class="h6"><?= e($related['product_name']); ?></h3>
                    <p><?= e(money((float) $related['price'])); ?></p>
                    <a class="btn btn-sm btn-outline-primary" href="<?= e(base_url('products/show.php?id=' . (int) $related['product_id'])); ?>">View</a>
                </article>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<section class="card p-4 mt-4">
    <h2 class="h4 mb-3">Reviews & Ratings</h2>
    <?php if (is_logged_in()): ?>
        <form class="row g-2 mb-3" method="POST" action="<?= e(base_url('products/review-create.php')); ?>">
            <?= csrf_field(); ?>
            <input type="hidden" name="product_id" value="<?= (int) $product['product_id']; ?>">
            <div class="col-md-2"><select class="form-select" name="rating"><?php for ($i = 5; $i >= 1; $i--): ?><option value="<?= $i; ?>"><?= $i; ?> stars</option><?php endfor; ?></select></div>
            <div class="col-md-3"><input class="form-control" name="title" placeholder="Review title"></div>
            <div class="col-md-5"><input class="form-control" name="body" placeholder="Write your review"></div>
            <div class="col-md-2"><button class="btn btn-primary w-100" type="submit">Submit</button></div>
        </form>
    <?php endif; ?>

    <ul class="list-group">
        <?php foreach ($reviews as $review): ?>
            <li class="list-group-item">
                <strong><?= e((string) $review['rating']); ?>/5</strong> - <?= e($review['title'] ?? 'Review'); ?>
                <div><?= e($review['body'] ?? ''); ?></div>
            </li>
        <?php endforeach; ?>
    </ul>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
