# E-Commerce System

This project is being refactored from a single catalog page into a structured PHP storefront.

## Current milestone

- Shared config and bootstrap are in place.
- Catalog and cart starter flow are available under `public/`.
- Remaining routes, services, models, and templates have been scaffolded for future implementation.

## Setup

1. Create a MySQL database named `ecommerce`.
2. Run `sql/schema.sql`.
3. Optionally run `sql/seed.sql`.
4. Adjust `config/database.php`, `config/mail.php`, and `config/paypal.php` for your environment.
5. Serve the `public/` directory through PHP.
