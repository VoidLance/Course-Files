<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ecommerce";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Pagination variables
$items_per_page = 12;
$current_page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$offset = ($current_page - 1) * $items_per_page;

// Category and subcategory filtering
$category = isset($_GET['category']) ? $conn->real_escape_string($_GET['category']) : '';
$subcategory = isset($_GET['subcategory']) ? $conn->real_escape_string($_GET['subcategory']) : '';
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';

// Build query for product listing
$where_clause = "WHERE 1=1";
if (!empty($category)) {
    $where_clause .= " AND c.category_name = '$category'";
}
if (!empty($subcategory)) {
    $where_clause .= " AND sc.subcategory_name = '$subcategory'";
}
if (!empty($search)) {
    $where_clause .= " AND (p.product_name LIKE '%$search%' OR p.description LIKE '%$search%')";
}

// Get total products count
$count_query = "SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.category_id = c.category_id LEFT JOIN subcategories sc ON p.subcategory_id = sc.subcategory_id $where_clause";
$count_result = $conn->query($count_query);
$total_products = $count_result->fetch_assoc()['total'];
$total_pages = ceil($total_products / $items_per_page);

// Get featured products
$featured_query = "SELECT p.*, c.category_name FROM products p JOIN categories c ON p.category_id = c.category_id WHERE p.featured = 1 LIMIT 5";
$featured_result = $conn->query($featured_query);

// Get categories
$categories_query = "SELECT DISTINCT c.category_id, c.category_name FROM categories c JOIN products p ON c.category_id = p.category_id ORDER BY c.category_name";
$categories_result = $conn->query($categories_query);

// Get products for current page
$products_query = "SELECT p.*, c.category_name, sc.subcategory_name FROM products p LEFT JOIN categories c ON p.category_id = c.category_id LEFT JOIN subcategories sc ON p.subcategory_id = sc.subcategory_id $where_clause ORDER BY p.product_id DESC LIMIT $items_per_page OFFSET $offset";
$products_result = $conn->query($products_query);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Catalog - E-Commerce</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            background-color: #2c3e50;
            color: white;
            padding: 20px 0;
            margin-bottom: 30px;
        }
        header h1 {
            text-align: center;
        }
        .catalog-wrapper {
            display: flex;
            gap: 20px;
        }
        .sidebar {
            width: 250px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            height: fit-content;
        }
        .sidebar-section {
            margin-bottom: 25px;
        }
        .sidebar-section h3 {
            font-size: 16px;
            margin-bottom: 12px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 8px;
        }
        .category-item {
            padding: 8px 0;
            cursor: pointer;
            transition: color 0.3s;
        }
        .category-item:hover {
            color: #3498db;
        }
        .category-item a {
            text-decoration: none;
            color: inherit;
        }
        .main-content {
            flex: 1;
        }
        .search-bar {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .search-bar form {
            display: flex;
            gap: 10px;
        }
        .search-bar input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .search-bar button {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .featured-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .featured-section h2 {
            margin-bottom: 15px;
            font-size: 20px;
        }
        .featured-products {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .featured-card {
            text-align: center;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 10px;
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
        }
        .featured-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .featured-card img {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 8px;
        }
        .featured-card h4 {
            font-size: 14px;
            margin-bottom: 5px;
        }
        .featured-card .price {
            color: #27ae60;
            font-weight: bold;
        }
        .featured-card .badge {
            display: inline-block;
            background: #f39c12;
            color: white;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 12px;
            margin-top: 5px;
        }
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .product-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background-color: #f0f0f0;
        }
        .product-info {
            padding: 15px;
        }
        .product-info h3 {
            font-size: 16px;
            margin-bottom: 8px;
            min-height: 40px;
        }
        .product-category {
            font-size: 12px;
            color: #7f8c8d;
            margin-bottom: 8px;
        }
        .product-price {
            font-size: 18px;
            color: #27ae60;
            font-weight: bold;
            margin: 8px 0;
        }
        .product-stock {
            font-size: 12px;
            margin-bottom: 10px;
        }
        .stock-in {
            color: #27ae60;
        }
        .stock-out {
            color: #e74c3c;
        }
        .product-actions {
            display: flex;
            gap: 8px;
        }
        .btn {
            flex: 1;
            padding: 8px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
        }
        .btn-view {
            background-color: #3498db;
            color: white;
        }
        .btn-view:hover {
            background-color: #2980b9;
        }
        .btn-cart {
            background-color: #27ae60;
            color: white;
        }
        .btn-cart:hover {
            background-color: #229954;
        }
        .btn:disabled {
            background-color: #bdc3c7;
            cursor: not-allowed;
        }
        .pagination {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-top: 30px;
            flex-wrap: wrap;
        }
        .pagination a, .pagination span {
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-decoration: none;
            color: #3498db;
            transition: background-color 0.3s;
        }
        .pagination a:hover {
            background-color: #3498db;
            color: white;
        }
        .pagination .current {
            background-color: #3498db;
            color: white;
            border-color: #3498db;
        }
        .pagination .disabled {
            color: #bdc3c7;
            cursor: not-allowed;
        }
        .no-products {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>Product Catalog</h1>
        </div>
    </header>
    <div class="container">
        <div class="search-bar">
            <form method="GET">
                <input type="text" name="search" placeholder="Search products..." value="<?php echo htmlspecialchars($search); ?>">
                <button type="submit">Search</button>
            </form>
        </div>
        <div class="catalog-wrapper">
            <aside class="sidebar">
                <div class="sidebar-section">
                    <h3>Categories</h3>
                    <div class="category-item">
                        <a href="product-catalog.php">All Categories</a>
                    </div>
                    <?php while ($cat = $categories_result->fetch_assoc()): ?>
                        <div class="category-item">
                            <a href="product-catalog.php?category=<?php echo urlencode($cat['category_name']); ?>">
                                <?php echo htmlspecialchars($cat['category_name']); ?>
                            </a>
                        </div>
                    <?php endwhile; ?>
                </div>
            </aside>
            <main class="main-content">
                <?php if ($featured_result && $featured_result->num_rows > 0): ?>
                    <section class="featured-section">
                        <h2>⭐ Featured Products</h2>
                        <div class="featured-products">
                            <?php while ($featured = $featured_result->fetch_assoc()): ?>
                                <a href="product-details.php?id=<?php echo $featured['product_id']; ?>" style="text-decoration: none;">
                                    <div class="featured-card">
                                        <img src="<?php echo htmlspecialchars($featured['image_url'] ?? 'placeholder.jpg'); ?>" alt="<?php echo htmlspecialchars($featured['product_name']); ?>">
                                        <h4><?php echo htmlspecialchars(substr($featured['product_name'], 0, 25)); ?></h4>
                                        <p class="price">$<?php echo number_format($featured['price'], 2); ?></p>
                                        <span class="badge">Featured</span>
                                    </div>
                                </a>
                            <?php endwhile; ?>
                        </div>
                    </section>
                <?php endif; ?>
                <?php if ($products_result && $products_result->num_rows > 0): ?>
                    <div class="products-grid">
                        <?php while ($product = $products_result->fetch_assoc()): ?>
                            <div class="product-card">
                                <img src="<?php echo htmlspecialchars($product['image_url'] ?? 'placeholder.jpg'); ?>" alt="<?php echo htmlspecialchars($product['product_name']); ?>" class="product-image">
                                <div class="product-info">
                                    <p class="product-category"><?php echo htmlspecialchars($product['category_name'] ?? 'Uncategorized'); ?></p>
                                    <h3><?php echo htmlspecialchars($product['product_name']); ?></h3>
                                    <p class="product-price">$<?php echo number_format($product['price'], 2); ?></p>
                                    <p class="product-stock">
                                        <?php if ($product['stock_quantity'] > 0): ?>
                                            <span class="stock-in">✓ In Stock (<?php echo $product['stock_quantity']; ?>)</span>
                                        <?php else: ?>
                                            <span class="stock-out">✗ Out of Stock</span>
                                        <?php endif; ?>
                                    </p>
                                    <div class="product-actions">
                                        <a href="product-details.php?id=<?php echo $product['product_id']; ?>" class="btn btn-view">View Details</a>
                                        <button class="btn btn-cart" <?php echo $product['stock_quantity'] > 0 ? '' : 'disabled'; ?>>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    </div>
                    <?php if ($total_pages > 1): ?>
                        <div class="pagination">
                            <?php if ($current_page > 1): ?>
                                <a href="product-catalog.php?page=1&category=<?php echo urlencode($category); ?>&search=<?php echo urlencode($search); ?>">First</a>
                                <a href="product-catalog.php?page=<?php echo $current_page - 1; ?>&category=<?php echo urlencode($category); ?>&search=<?php echo urlencode($search); ?>">Previous</a>
                            <?php else: ?>
                                <span class="disabled">First</span>
                                <span class="disabled">Previous</span>
                            <?php endif; ?>
                            <?php 
                            $start_page = max(1, $current_page - 2);
                            $end_page = min($total_pages, $current_page + 2);
                            for ($i = $start_page; $i <= $end_page; $i++): 
                            ?>
                                <?php if ($i == $current_page): ?>
                                    <span class="current"><?php echo $i; ?></span>
                                <?php else: ?>
                                    <a href="product-catalog.php?page=<?php echo $i; ?>&category=<?php echo urlencode($category); ?>&search=<?php echo urlencode($search); ?>"><?php echo $i; ?></a>
                                <?php endif; ?>
                            <?php endfor; ?>
                            <?php if ($current_page < $total_pages): ?>
                                <a href="product-catalog.php?page=<?php echo $current_page + 1; ?>&category=<?php echo urlencode($category); ?>&search=<?php echo urlencode($search); ?>">Next</a>
                                <a href="product-catalog.php?page=<?php echo $total_pages; ?>&category=<?php echo urlencode($category); ?>&search=<?php echo urlencode($search); ?>">Last</a>
                            <?php else: ?>
                                <span class="disabled">Next</span>
                                <span class="disabled">Last</span>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                <?php else: ?>
                    <div class="no-products">
                        <p>No products found. Try adjusting your search or filters.</p>
                    </div>
                <?php endif; ?>
            </main>
        </div>
    </div>
</body>
</html>
<?php $conn->close(); ?>