<?php
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
    </div>
</article>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
