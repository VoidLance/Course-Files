<?php
$pageTitle = 'Product Catalog';
require $rootPath . '/templates/partials/header.php';
?>
<section class="search-bar">
    <form method="GET" action="<?= e(base_url('products/catalog.php')); ?>">
        <input type="text" name="search" placeholder="Search products..." value="<?= e($filters['search']); ?>">
        <button type="submit">Search</button>
    </form>
</section>
<div class="catalog-wrapper">
    <aside class="sidebar">
        <div class="sidebar-section">
            <h3>Categories</h3>
            <div class="category-item"><a href="<?= e(base_url('products/catalog.php')); ?>">All Categories</a></div>
            <?php foreach ($categories as $categoryItem): ?>
                <div class="category-item">
                    <a href="<?= e(base_url('products/catalog.php') . '?' . http_build_query(['category' => $categoryItem['category_name']])); ?>">
                        <?= e($categoryItem['category_name']); ?>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </aside>
    <section class="main-content">
        <?php if ($featuredProducts !== []): ?>
            <section class="featured-section">
                <h2>Featured Products</h2>
                <div class="featured-products">
                    <?php foreach ($featuredProducts as $featuredProduct): ?>
                        <a class="featured-link" href="<?= e(base_url('products/show.php?id=' . (int) $featuredProduct['product_id'])); ?>">
                            <article class="featured-card">
                                <img src="<?= e($featuredProduct['image_url'] ?? 'https://via.placeholder.com/240x180?text=Product'); ?>" alt="<?= e($featuredProduct['product_name']); ?>">
                                <h4><?= e(mb_strimwidth((string) $featuredProduct['product_name'], 0, 25, '...')); ?></h4>
                                <p class="price"><?= e(money((float) $featuredProduct['price'])); ?></p>
                                <span class="badge">Featured</span>
                            </article>
                        </a>
                    <?php endforeach; ?>
                </div>
            </section>
        <?php endif; ?>

        <?php if ($products !== []): ?>
            <div class="products-grid">
                <?php foreach ($products as $product): ?>
                    <article class="product-card">
                        <img src="<?= e($product['image_url'] ?? 'https://via.placeholder.com/320x220?text=Product'); ?>" alt="<?= e($product['product_name']); ?>" class="product-image">
                        <div class="product-info">
                            <p class="product-category"><?= e($product['category_name'] ?? 'Uncategorized'); ?></p>
                            <h3><?= e($product['product_name']); ?></h3>
                            <p class="product-price"><?= e(money((float) $product['price'])); ?></p>
                            <p class="product-stock">
                                <?php if ((int) $product['stock_quantity'] > 0): ?>
                                    <span class="stock-in">In Stock (<?= (int) $product['stock_quantity']; ?>)</span>
                                <?php else: ?>
                                    <span class="stock-out">Out of Stock</span>
                                <?php endif; ?>
                            </p>
                            <div class="product-actions">
                                <a href="<?= e(base_url('products/show.php?id=' . (int) $product['product_id'])); ?>" class="btn btn-view">View Details</a>
                                <form method="POST" action="<?= e(base_url('cart/add.php')); ?>">
                                    <?= csrf_field(); ?>
                                    <input type="hidden" name="product_id" value="<?= (int) $product['product_id']; ?>">
                                    <input type="hidden" name="quantity" value="1">
                                    <input type="hidden" name="return_to" value="<?= e(base_url('products/catalog.php') . ($qs = query_string() ? '?' . query_string() : '')); ?>">
                                    <button class="btn btn-cart" type="submit" <?= (int) $product['stock_quantity'] > 0 ? '' : 'disabled'; ?>>Add to Cart</button>
                                </form>
                            </div>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>

            <?php if ($totalPages > 1): ?>
                <nav class="pagination" aria-label="Catalog pagination">
                    <?php if ($currentPage > 1): ?>
                        <a href="<?= e(base_url('products/catalog.php') . '?' . query_string(['page' => 1])); ?>">First</a>
                        <a href="<?= e(base_url('products/catalog.php') . '?' . query_string(['page' => $currentPage - 1])); ?>">Previous</a>
                    <?php else: ?>
                        <span class="disabled">First</span>
                        <span class="disabled">Previous</span>
                    <?php endif; ?>
                    <?php for ($page = max(1, $currentPage - 2); $page <= min($totalPages, $currentPage + 2); $page++): ?>
                        <?php if ($page === $currentPage): ?>
                            <span class="current"><?= $page; ?></span>
                        <?php else: ?>
                            <a href="<?= e(base_url('products/catalog.php') . '?' . query_string(['page' => $page])); ?>"><?= $page; ?></a>
                        <?php endif; ?>
                    <?php endfor; ?>
                    <?php if ($currentPage < $totalPages): ?>
                        <a href="<?= e(base_url('products/catalog.php') . '?' . query_string(['page' => $currentPage + 1])); ?>">Next</a>
                        <a href="<?= e(base_url('products/catalog.php') . '?' . query_string(['page' => $totalPages])); ?>">Last</a>
                    <?php else: ?>
                        <span class="disabled">Next</span>
                        <span class="disabled">Last</span>
                    <?php endif; ?>
                </nav>
            <?php endif; ?>
        <?php else: ?>
            <section class="no-products">
                <p>No products found. Try adjusting your search or filters.</p>
            </section>
        <?php endif; ?>
    </section>
</div>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
