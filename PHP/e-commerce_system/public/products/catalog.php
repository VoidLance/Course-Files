<?php

declare(strict_types=1);
// Catalog page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

extract($productController->catalog(), EXTR_SKIP);

if (($_GET['ajax'] ?? '') === '1') {
	ob_start();
	if ($products !== []):
		?>
		<div class="products-grid">
			<?php foreach ($products as $product): ?>
				<article class="product-card">
					<img src="<?= e($product['image_url'] ?? 'https://via.placeholder.com/320x220?text=Product'); ?>" alt="<?= e($product['product_name']); ?>" class="product-image">
					<div class="product-info">
						<p class="product-category"><?= e($product['category_name'] ?? 'Uncategorized'); ?></p>
						<h3><?= e($product['product_name']); ?></h3>
						<p class="product-price"><?= e(money((float) $product['price'])); ?></p>
						<a href="<?= e(base_url('products/show.php?id=' . (int) $product['product_id'])); ?>" class="btn btn-view">View Details</a>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
		<?php
	else:
		?>
		<section class="no-products"><p>No products found.</p></section>
		<?php
	endif;

	header('Content-Type: application/json');
	echo json_encode(['html' => ob_get_clean()], JSON_THROW_ON_ERROR);
	exit;
}

require $rootPath . '/templates/products/catalog.php';
