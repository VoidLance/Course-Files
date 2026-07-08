<?php

declare(strict_types=1);
// Starter note: This file handles ts  > edit - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$productId = (int) ($_GET['id'] ?? 0);
$product = $productModel->findById($productId);
if ($product === null) {
	flash('error', 'Product not found.');
	redirect('index.php');
}

$categories = $categoryModel->all();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$data = [
		'category_id' => trim((string) ($_POST['category_id'] ?? '')),
		'subcategory_id' => '',
		'sku' => trim((string) ($_POST['sku'] ?? '')),
		'product_name' => trim((string) ($_POST['product_name'] ?? '')),
		'slug' => trim((string) ($_POST['slug'] ?? strtolower(preg_replace('/[^a-z0-9]+/i', '-', (string) ($_POST['product_name'] ?? 'product'))))),
		'description' => trim((string) ($_POST['description'] ?? '')),
		'price' => (float) ($_POST['price'] ?? 0),
		'stock_quantity' => (int) ($_POST['stock_quantity'] ?? 0),
		'image_url' => trim((string) ($_POST['image_url'] ?? '')),
		'featured' => (int) ($_POST['featured'] ?? 0),
		'is_active' => (int) ($_POST['is_active'] ?? 0),
	];

	if ($productModel->update($productId, $data)) {
		flash('success', 'Product updated.');
		redirect('index.php');
	}

	flash('error', 'Unable to update product.');
	$product = array_merge($product, $data);
}

$pageTitle = 'Edit Product';
require $rootPath . '/templates/admin/products/form.php';
