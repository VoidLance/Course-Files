<?php

declare(strict_types=1);
// Starter note: This file handles ct - straightforward on purpose.

final class Product
{
    public function __construct(private mysqli $connection)
    {
    }

    public function getCatalogData(array $filters, int $page, int $itemsPerPage): array
    {
        $page = max(1, $page);
        $offset = ($page - 1) * $itemsPerPage;
        $filters = array_merge([
            'category' => '',
            'subcategory' => '',
            'search' => '',
            'min_price' => '',
            'max_price' => '',
            'sort' => 'newest',
        ], $filters);

        $cacheKey = 'catalog_' . md5(json_encode([$filters, $page, $itemsPerPage]));
        $cached = $_SESSION['catalog_cache'][$cacheKey] ?? null;
        if (is_array($cached) && isset($cached['expires_at']) && (int) $cached['expires_at'] > time()) {
            return $cached['payload'];
        }

        $conditions = [];
        $types = '';
        $params = [];

        if ($filters['category'] !== '') {
            $conditions[] = 'c.category_name = ?';
            $types .= 's';
            $params[] = $filters['category'];
        }

        if ($filters['subcategory'] !== '') {
            $conditions[] = 'sc.subcategory_name = ?';
            $types .= 's';
            $params[] = $filters['subcategory'];
        }

        if ($filters['search'] !== '') {
            $conditions[] = '((MATCH(p.product_name, p.description, p.sku) AGAINST (? IN NATURAL LANGUAGE MODE)) OR p.product_name LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)';
            $types .= 'ssss';
            $params[] = $filters['search'];
            $searchTerm = '%' . $filters['search'] . '%';
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        if ($filters['min_price'] !== '' && is_numeric((string) $filters['min_price'])) {
            $conditions[] = 'p.price >= ?';
            $types .= 'd';
            $params[] = (float) $filters['min_price'];
        }

        if ($filters['max_price'] !== '' && is_numeric((string) $filters['max_price'])) {
            $conditions[] = 'p.price <= ?';
            $types .= 'd';
            $params[] = (float) $filters['max_price'];
        }

        $conditions[] = 'p.is_active = 1';
        $whereClause = ' WHERE ' . implode(' AND ', $conditions);
        $joins = ' FROM products p LEFT JOIN categories c ON p.category_id = c.category_id LEFT JOIN subcategories sc ON p.subcategory_id = sc.subcategory_id';

        $sortSql = match ((string) $filters['sort']) {
            'price_asc' => 'p.price ASC',
            'price_desc' => 'p.price DESC',
            'popularity' => 'popularity_score DESC, p.product_id DESC',
            default => 'p.product_id DESC',
        };

        $countStatement = $this->connection->prepare('SELECT COUNT(*) AS total' . $joins . $whereClause);
        if ($countStatement === false) {
            throw new RuntimeException('Failed to prepare product count query.');
        }

        if ($types !== '') {
            $countStatement->bind_param($types, ...$params);
        }

        $countStatement->execute();
        $countResult = $countStatement->get_result();
        $totalProducts = (int) ($countResult->fetch_assoc()['total'] ?? 0);
        $countStatement->close();

        $featuredStatement = $this->connection->prepare('SELECT p.*, c.category_name FROM products p LEFT JOIN categories c ON p.category_id = c.category_id WHERE p.featured = 1 AND p.is_active = 1 ORDER BY p.product_id DESC LIMIT 5');
        if ($featuredStatement === false) {
            throw new RuntimeException('Failed to prepare featured products query.');
        }

        $featuredStatement->execute();
        $featuredProducts = $featuredStatement->get_result()->fetch_all(MYSQLI_ASSOC);
        $featuredStatement->close();

        $categoriesStatement = $this->connection->prepare('SELECT DISTINCT c.category_id, c.category_name FROM categories c JOIN products p ON c.category_id = p.category_id WHERE p.is_active = 1 ORDER BY c.category_name');
        if ($categoriesStatement === false) {
            throw new RuntimeException('Failed to prepare categories query.');
        }

        $categoriesStatement->execute();
        $categories = $categoriesStatement->get_result()->fetch_all(MYSQLI_ASSOC);
        $categoriesStatement->close();

        $productQuery = 'SELECT p.*, c.category_name, sc.subcategory_name, COALESCE((SELECT SUM(oi.quantity) FROM order_items oi WHERE oi.product_id = p.product_id), 0) AS popularity_score' . $joins . $whereClause . ' ORDER BY ' . $sortSql . ' LIMIT ? OFFSET ?';
        $productStatement = $this->connection->prepare($productQuery);
        if ($productStatement === false) {
            throw new RuntimeException('Failed to prepare product listing query.');
        }

        $productTypes = $types . 'ii';
        $productParams = [...$params, $itemsPerPage, $offset];
        $productStatement->bind_param($productTypes, ...$productParams);
        $productStatement->execute();
        $products = $productStatement->get_result()->fetch_all(MYSQLI_ASSOC);
        $productStatement->close();

        $payload = [
            'filters' => $filters,
            'products' => $products,
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'currentPage' => $page,
            'itemsPerPage' => $itemsPerPage,
            'totalProducts' => $totalProducts,
            'totalPages' => (int) ceil($totalProducts / $itemsPerPage),
        ];

        $_SESSION['catalog_cache'][$cacheKey] = [
            'expires_at' => time() + 60,
            'payload' => $payload,
        ];

        return $payload;
    }

    public function findById(int $productId): ?array
    {
        $statement = $this->connection->prepare('SELECT p.*, c.category_name, sc.subcategory_name FROM products p LEFT JOIN categories c ON p.category_id = c.category_id LEFT JOIN subcategories sc ON p.subcategory_id = sc.subcategory_id WHERE p.product_id = ? LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare product detail query.');
        }

        $statement->bind_param('i', $productId);
        $statement->execute();
        $product = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $product;
    }

    public function related(int $productId, ?int $categoryId, int $limit = 4): array
    {
        $sql = 'SELECT product_id, product_name, slug, price, image_url FROM products WHERE is_active = 1 AND product_id != ?';
        $types = 'i';
        $params = [$productId];

        if ($categoryId !== null) {
            $sql .= ' AND category_id = ?';
            $types .= 'i';
            $params[] = $categoryId;
        }

        $sql .= ' ORDER BY product_id DESC LIMIT ?';
        $types .= 'i';
        $params[] = $limit;

        $statement = $this->connection->prepare($sql);
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare related products query.');
        }

        $statement->bind_param($types, ...$params);
        $statement->execute();
        $result = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $result;
    }

    public function allForAdmin(): array
    {
        $statement = $this->connection->prepare('SELECT p.*, c.category_name, sc.subcategory_name FROM products p LEFT JOIN categories c ON p.category_id = c.category_id LEFT JOIN subcategories sc ON p.subcategory_id = sc.subcategory_id ORDER BY p.product_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare admin products query.');
        }

        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function create(array $data): bool
    {
        $statement = $this->connection->prepare('INSERT INTO products (category_id, subcategory_id, sku, product_name, slug, description, price, stock_quantity, image_url, featured, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare product create query.');
        }

        $categoryId = $data['category_id'] !== '' ? (int) $data['category_id'] : null;
        $subcategoryId = $data['subcategory_id'] !== '' ? (int) $data['subcategory_id'] : null;
        $featured = !empty($data['featured']) ? 1 : 0;
        $active = !empty($data['is_active']) ? 1 : 0;
        $statement->bind_param(
            'iissssdisii',
            $categoryId,
            $subcategoryId,
            $data['sku'],
            $data['product_name'],
            $data['slug'],
            $data['description'],
            $data['price'],
            $data['stock_quantity'],
            $data['image_url'],
            $featured,
            $active
        );
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function update(int $productId, array $data): bool
    {
        $statement = $this->connection->prepare('UPDATE products SET category_id = ?, subcategory_id = ?, sku = ?, product_name = ?, slug = ?, description = ?, price = ?, stock_quantity = ?, image_url = ?, featured = ?, is_active = ? WHERE product_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare product update query.');
        }

        $categoryId = $data['category_id'] !== '' ? (int) $data['category_id'] : null;
        $subcategoryId = $data['subcategory_id'] !== '' ? (int) $data['subcategory_id'] : null;
        $featured = !empty($data['featured']) ? 1 : 0;
        $active = !empty($data['is_active']) ? 1 : 0;
        $statement->bind_param(
            'iissssdisiii',
            $categoryId,
            $subcategoryId,
            $data['sku'],
            $data['product_name'],
            $data['slug'],
            $data['description'],
            $data['price'],
            $data['stock_quantity'],
            $data['image_url'],
            $featured,
            $active,
            $productId
        );
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function delete(int $productId): bool
    {
        $statement = $this->connection->prepare('DELETE FROM products WHERE product_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare product delete query.');
        }

        $statement->bind_param('i', $productId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }
}
