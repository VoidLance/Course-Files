INSERT INTO categories (category_name, slug)
VALUES
    ('Electronics', 'electronics'),
    ('Home', 'home'),
    ('Fitness', 'fitness');

INSERT INTO subcategories (category_id, subcategory_name, slug)
VALUES
    (1, 'Audio', 'audio'),
    (1, 'Computers', 'computers'),
    (2, 'Kitchen', 'kitchen');

INSERT INTO products (category_id, subcategory_id, sku, product_name, slug, description, price, stock_quantity, image_url, featured)
VALUES
    (1, 1, 'SKU-HEADPHONES-001', 'Studio Headphones', 'studio-headphones', 'Closed-back studio headphones for everyday listening.', 149.99, 12, 'https://via.placeholder.com/320x220?text=Headphones', 1),
    (1, 2, 'SKU-LAPTOP-STAND-001', 'Aluminum Laptop Stand', 'aluminum-laptop-stand', 'Adjustable stand for ergonomic laptop setups.', 59.00, 20, 'https://via.placeholder.com/320x220?text=Laptop+Stand', 1),
    (2, 3, 'SKU-KETTLE-001', 'Electric Kettle', 'electric-kettle', 'Fast-boil kettle with temperature presets.', 79.50, 8, 'https://via.placeholder.com/320x220?text=Kettle', 0),
    (3, NULL, 'SKU-YOGA-MAT-001', 'Performance Yoga Mat', 'performance-yoga-mat', 'High-grip mat with extra cushioning.', 45.00, 30, 'https://via.placeholder.com/320x220?text=Yoga+Mat', 0);

INSERT INTO users (first_name, last_name, email, password_hash, role, is_verified)
VALUES
    ('Admin', 'User', 'admin@example.com', '$2y$10$w7mPRh79dC0d1fJ6Bf2lfu1SOHfQkS6f0pA9sh4X1Q1E5I4M3N1gK', 'admin', 1);
