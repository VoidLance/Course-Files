# E-Commerce System

This project is a specification-aligned e-commerce website for a small business.

## Implemented Features

- Product catalog with pagination, category filtering, price filtering, sorting, featured products, product details, stock status, and related products.
- Shopping cart with add/remove/update, session persistence, mini-cart, and totals (subtotal, discount, tax, shipping, grand total).
- User management with register, email verification, login/logout, forgot/reset password, profile editing, addresses, and saved payment method metadata.
- Multi-step checkout (shipping, payment, review, confirmation) with guest checkout support.
- PayPal sandbox create/capture integration.
- Order management with history, status timeline, and PDF invoice downloads.
- Admin panel with login, dashboard, product/category CRUD, order management, user management, and basic reports.
- Search and filtering by name/description/SKU, category, price range, sort options, and AJAX updates.
- Wishlist, product reviews/ratings, coupon support, newsletter subscription, and inventory movement tracking.

## Technical Notes

- MySQL schema includes entities, relationships, and indexes required for catalog, users, orders, and supporting features.
- Application structure follows OOP + MVC with controllers, services, models, templates, and shared includes.
- Prepared statements are used for database queries.
- CSRF protection is used for state-changing forms.
- Bootstrap is used for responsive UI.

## Setup

1. Create a MySQL database named `ecommerce`.
2. Run `sql/schema.sql`.
3. Optionally run `sql/seed.sql`.
4. Adjust `config/database.php`, `config/mail.php`, and `config/paypal.php` for your environment.
5. Serve the `public/` directory through PHP.
