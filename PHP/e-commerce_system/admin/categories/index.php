<?php

declare(strict_types=1);
// Starter note: This file handles ries  > index - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_admin();

$categories = $categoryModel->all();

$pageTitle = 'Manage Categories';
require $rootPath . '/templates/admin/categories/index.php';
