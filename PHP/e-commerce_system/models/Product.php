<?php

declare(strict_types=1);

final class Product
{
    public function __construct(private mysqli $connection)
    {
    }

    public function getCatalogData(array $filters, int $page, int $itemsPerPage): array
    {
        $page = max(1, $page);
        $offset = ($page - 1) * $itemsPerPage;
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
            $conditions[] = '(p.product_name LIKE ? OR p.description LIKE ? OR p.sku LIKE ?)';
            $types .= 'sss';
            $searchTerm = '%' . $filters['search'] . '%';
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }

        $whereClause = $conditions === [] ? '' : ' WHERE ' . implode(' AND ', $conditions);
        $joins = ' FROM products p LEFT JOIN categories c ON p.category_id = c.category_id LEFT JOIN subcategories sc ON p.subcategory_id = sc.subcategory_id';

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

        $featuredStatement = $this->connection->prepare('SELECT p.*, c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id WHERE p.featured = 1 ORDER BY p.product_id DESC LIMIT 5');
        if ($featuredStatement === false) {
            throw new RuntimeException('Failed to prepare featured products query.');
        }

        $featuredStatement->execute();
        $featuredProducts = $featuredStatement->get_result()->fetch_all(MYSQLI_ASSOC);
        $featuredStatement->close();

        $categoriesStatement = $this->connection->prepare('SELECT DISTINCT c.category_id, c.category_name FROM categories c JOIN products p ON c.category_id = p.category_id ORDER BY c.category_name');
        if ($categoriesStatement === false) {
            throw new RuntimeException('Failed to prepare categories query.');
        }

        $categoriesStatement->execute();
        $categories = $categoriesStatement->get_result()->fetch_all(MYSQLI_ASSOC);
        $categoriesStatement->close();

        $productQuery = 'SELECT p.*, c.category_name, sc.subcategory_name' . $joins . $whereClause . ' ORDER BY p.product_id DESC LIMIT ? OFFSET ?';
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

        return [
            'filters' => $filters,
            'products' => $products,
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'currentPage' => $page,
            'itemsPerPage' => $itemsPerPage,
            'totalProducts' => $totalProducts,
            'totalPages' => (int) ceil($totalProducts / $itemsPerPage),
        ];
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
}
