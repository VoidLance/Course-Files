<?php

declare(strict_types=1);
// Starter note: This file handles ries  > create - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$category = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
		http_response_code(422);
		exit('Invalid request.');
	}

	$name = trim((string) ($_POST['category_name'] ?? ''));
	$slug = trim((string) ($_POST['slug'] ?? strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name))));
	if ($categoryModel->create($name, $slug)) {
		flash('success', 'Category created.');
		redirect('index.php');
	}

	flash('error', 'Unable to create category.');
	$category = ['category_name' => $name, 'slug' => $slug];
}

$pageTitle = 'Create Category';
require $rootPath . '/templates/admin/categories/form.php';
