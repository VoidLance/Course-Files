# E-Commerce System Implementation Roadmap

This roadmap converts the current single-page catalog app into a structured PHP storefront with cart, users, checkout, orders, admin tools, search/filtering, and supporting features.

## Current Starting Point

Existing file:
- `product-catalog.php` - current storefront catalog page with product queries, pagination, category/subcategory filtering, and basic search.

Current gap:
- No shared bootstrap/config layer
- No cart
- No user auth
- No checkout flow
- No order storage
- No admin panel
- No invoice generation or email system
- No wishlist/reviews/coupons/newsletter

## Target Folder Structure

Create this structure under `PHP/e-commerce_system/`:

```text
admin/
assets/
assets/css/
assets/js/
config/
controllers/
includes/
models/
services/
storage/
storage/invoices/
storage/logs/
templates/
templates/partials/
public/
public/account/
public/auth/
public/cart/
public/checkout/
public/orders/
public/products/
sql/
```

## Phase 0: Foundation and Refactor

Goal: stop building on top of a single file and move shared concerns into reusable files.

### Files to create

- `config/app.php`
- `config/database.php`
- `config/session.php`
- `config/paypal.php`
- `config/mail.php`
- `includes/bootstrap.php`
- `includes/helpers.php`
- `includes/auth.php`
- `includes/csrf.php`
- `includes/validation.php`
- `templates/partials/header.php`
- `templates/partials/footer.php`
- `templates/partials/flash-messages.php`
- `templates/partials/mini-cart.php`
- `assets/css/store.css`
- `assets/js/store.js`
- `sql/schema.sql`
- `sql/seed.sql`
- `README.md`

### Existing file to refactor

- `product-catalog.php` -> either keep as a temporary entry point or replace with `public/products/catalog.php`

### Step-by-step tasks

1. Create `config/database.php` with a reusable mysqli or PDO connection factory.
2. Create `config/app.php` for base URL, environment, app name, currency, and timezone.
3. Create `config/session.php` to centralize session start and secure cookie settings.
4. Create `includes/bootstrap.php` to load config, session, helpers, auth, and DB connection.
5. Create `includes/helpers.php` for redirects, flash messages, money formatting, request helpers, and pagination helpers.
6. Create `includes/csrf.php` to generate and verify CSRF tokens for all POST forms.
7. Create `includes/auth.php` for login state checks, guest checks, and admin guards.
8. Create `includes/validation.php` for shared validation functions.
9. Create shared partials in `templates/partials/` so the storefront has a global header, footer, mini-cart, and flash message system.
10. Move inline CSS and JS out of the catalog page into `assets/css/store.css` and `assets/js/store.js`.
11. Replace interpolated SQL in the catalog with prepared statements.
12. Write `sql/schema.sql` for the initial database structure.
13. Write `sql/seed.sql` for demo categories, products, and one admin account.
14. Create a project-level `README.md` with setup instructions.

## Phase 1: Core Data Schema

Goal: define the tables needed before feature work branches into multiple directions.

### Tables to add in `sql/schema.sql`

- `users`
- `email_verifications`
- `password_resets`
- `addresses`
- `payment_methods`
- `products`
- `categories`
- `subcategories`
- `cart_items`
- `wishlists`
- `orders`
- `order_items`
- `order_status_history`
- `reviews`
- `coupons`
- `coupon_usages`
- `newsletter_subscribers`
- `inventory_movements`

### Files to create

- `models/User.php`
- `models/Address.php`
- `models/PaymentMethod.php`
- `models/Product.php`
- `models/Category.php`
- `models/Cart.php`
- `models/Order.php`
- `models/Review.php`
- `models/Coupon.php`
- `models/Wishlist.php`
- `models/NewsletterSubscriber.php`
- `models/Inventory.php`

### Step-by-step tasks

1. Create model classes for each main entity listed above.
2. Keep each model focused on database reads/writes for one concern.
3. Add common methods first: `findById`, `create`, `update`, `delete`, and list/search methods where needed.
4. Add SKU support to `products` and index it for search.
5. Add status and timestamp columns to all user, order, and review flows.
6. Add stock quantity and low-stock threshold columns to `products` or a dedicated inventory table.
7. Add role and verification state to `users`.
8. Add order total snapshots so invoices do not depend on live product prices.

## Phase 2: Storefront Routing and Product Pages

Goal: make the storefront navigable with shared layout and product detail pages.

### Files to create

- `public/index.php`
- `public/products/catalog.php`
- `public/products/show.php`
- `controllers/ProductController.php`
- `templates/products/catalog.php`
- `templates/products/show.php`

### Existing file to migrate

- `product-catalog.php` content should be split between:
  - `controllers/ProductController.php`
  - `public/products/catalog.php`
  - `templates/products/catalog.php`

### Step-by-step tasks

1. Create `public/index.php` as the storefront landing page.
2. Move catalog query logic into `controllers/ProductController.php`.
3. Create `public/products/catalog.php` to call the controller and render the template.
4. Create `templates/products/catalog.php` for the catalog markup.
5. Create `public/products/show.php` for product detail pages.
6. Create `templates/products/show.php` to show description, price, image, stock, reviews, and add-to-cart action.
7. Add product slug support if URLs should be cleaner later.

## Phase 3: Shopping Cart

Goal: support add/remove/update cart behavior, sessions, and the header mini-cart.

### Files to create

- `public/cart/index.php`
- `public/cart/add.php`
- `public/cart/update.php`
- `public/cart/remove.php`
- `controllers/CartController.php`
- `services/CartService.php`
- `templates/cart/index.php`

### Files already planned to support this

- `templates/partials/mini-cart.php`
- `includes/bootstrap.php`
- `models/Cart.php`

### Step-by-step tasks

1. Create `services/CartService.php` to manage session cart operations.
2. Use `$_SESSION['cart']` for guest carts.
3. Create `public/cart/add.php` to add a product or increment quantity.
4. Create `public/cart/update.php` to change quantities safely.
5. Create `public/cart/remove.php` to delete a line item.
6. Create `public/cart/index.php` as the full cart page.
7. Create `templates/cart/index.php` to display items, totals, and actions.
8. Render `templates/partials/mini-cart.php` from the shared header.
9. Validate product existence and stock before accepting quantity changes.
10. Add cart subtotal, discount placeholder, shipping estimate placeholder, and grand total.
11. If logged in later, optionally sync session cart into `cart_items`.

## Phase 4: User Registration, Verification, Login, Logout, Reset

Goal: support account creation and account recovery.

### Files to create

- `public/auth/register.php`
- `public/auth/verify-email.php`
- `public/auth/login.php`
- `public/auth/logout.php`
- `public/auth/forgot-password.php`
- `public/auth/reset-password.php`
- `controllers/AuthController.php`
- `services/AuthService.php`
- `services/EmailService.php`
- `templates/auth/register.php`
- `templates/auth/login.php`
- `templates/auth/forgot-password.php`
- `templates/auth/reset-password.php`
- `templates/emails/verify-email.php`
- `templates/emails/order-confirmation.php`
- `templates/emails/password-reset.php`

### Step-by-step tasks

1. Create `services/AuthService.php` for registration, login, logout, verification, and reset flows.
2. Create `services/EmailService.php` to send verification, password reset, and later order emails.
3. Create `public/auth/register.php` and `templates/auth/register.php`.
4. Save users with `password_hash` and `is_verified = 0`.
5. Create verification token records in `email_verifications`.
6. Send email verification using `templates/emails/verify-email.php`.
7. Create `public/auth/verify-email.php` to validate token and mark user verified.
8. Create `public/auth/login.php` and `templates/auth/login.php`.
9. Create `public/auth/logout.php` to destroy session state safely.
10. Create `public/auth/forgot-password.php` and `public/auth/reset-password.php`.
11. Save reset tokens in `password_resets` with expiry timestamps.
12. Invalidate reset tokens after successful password change.
13. Add rate limiting later if login abuse becomes an issue.

## Phase 5: User Profile Management

Goal: let users manage profile, addresses, and saved checkout data.

### Files to create

- `public/account/profile.php`
- `public/account/addresses.php`
- `public/account/address-create.php`
- `public/account/address-edit.php`
- `public/account/address-delete.php`
- `public/account/payment-methods.php`
- `controllers/AccountController.php`
- `templates/account/profile.php`
- `templates/account/addresses.php`
- `templates/account/address-form.php`
- `templates/account/payment-methods.php`

### Step-by-step tasks

1. Create `controllers/AccountController.php`.
2. Create `public/account/profile.php` for basic user details.
3. Create address CRUD routes and templates.
4. Add default shipping and billing address flags.
5. Create payment methods page only if you use tokenized payment storage.
6. Never store raw card details in your database.
7. Protect all account routes with auth guards.

## Phase 6: Checkout Flow

Goal: build a multi-step checkout process for guest and logged-in users.

### Files to create

- `public/checkout/shipping.php`
- `public/checkout/payment.php`
- `public/checkout/review.php`
- `public/checkout/process.php`
- `public/checkout/confirmation.php`
- `controllers/CheckoutController.php`
- `services/CheckoutService.php`
- `services/ShippingService.php`
- `templates/checkout/shipping.php`
- `templates/checkout/payment.php`
- `templates/checkout/review.php`
- `templates/checkout/confirmation.php`

### Step-by-step tasks

1. Create `services/ShippingService.php` to expose shipping methods and rates.
2. Create `services/CheckoutService.php` to orchestrate totals, validation, guest/customer data, and order draft creation.
3. Create `public/checkout/shipping.php` for address and shipping method selection.
4. Create `public/checkout/payment.php` for payment method selection.
5. Create `public/checkout/review.php` to lock in order summary before payment.
6. Create `public/checkout/process.php` to create or finalize the order.
7. Create `public/checkout/confirmation.php` for the success page.
8. Support guest checkout by storing temporary customer data on the order.
9. Validate stock again immediately before payment capture.
10. Empty the session cart only after successful order confirmation.

## Phase 7: PayPal Sandbox Integration

Goal: capture payments through PayPal sandbox without blocking the rest of checkout development.

### Files to create

- `services/PayPalService.php`
- `public/checkout/paypal-create-order.php`
- `public/checkout/paypal-capture-order.php`
- `public/checkout/paypal-cancel.php`

### Files already planned to support this

- `config/paypal.php`
- `public/checkout/payment.php`
- `public/checkout/process.php`

### Step-by-step tasks

1. Add sandbox credentials in `config/paypal.php`.
2. Create `services/PayPalService.php` for API authentication, order creation, and capture.
3. Create `public/checkout/paypal-create-order.php` to create a PayPal order.
4. Create `public/checkout/paypal-capture-order.php` to capture payment and finalize the local order.
5. Create `public/checkout/paypal-cancel.php` for user cancellation handling.
6. Save PayPal transaction/order IDs to the local `orders` table.
7. Guard against duplicate captures by checking payment status before processing again.

## Phase 8: Orders, History, Status, and Invoices

Goal: let users see their orders and download invoices.

### Files to create

- `public/orders/index.php`
- `public/orders/show.php`
- `public/orders/invoice.php`
- `controllers/OrderController.php`
- `services/OrderService.php`
- `services/InvoiceService.php`
- `templates/orders/index.php`
- `templates/orders/show.php`

### Step-by-step tasks

1. Create `controllers/OrderController.php` and `services/OrderService.php`.
2. Create `public/orders/index.php` for account order history.
3. Create `public/orders/show.php` for individual order detail.
4. Create `public/orders/invoice.php` to stream or download a PDF invoice.
5. Create `services/InvoiceService.php` using Dompdf or TCPDF.
6. Store invoice files in `storage/invoices/` or generate them on demand.
7. Add order status history support so customers can track progress.
8. Limit order and invoice access to the order owner or admin.
9. Send order confirmation emails using `templates/emails/order-confirmation.php`.

## Phase 9: Admin Panel

Goal: give admins the tools to manage products, categories, orders, users, and reports.

### Files to create

- `admin/index.php`
- `admin/login.php`
- `admin/dashboard.php`
- `admin/products/index.php`
- `admin/products/create.php`
- `admin/products/edit.php`
- `admin/products/delete.php`
- `admin/categories/index.php`
- `admin/categories/create.php`
- `admin/categories/edit.php`
- `admin/categories/delete.php`
- `admin/orders/index.php`
- `admin/orders/show.php`
- `admin/orders/update-status.php`
- `admin/orders/cancel.php`
- `admin/users/index.php`
- `admin/users/show.php`
- `admin/users/edit.php`
- `admin/reports/sales.php`
- `admin/reports/top-products.php`
- `controllers/AdminController.php`
- `templates/admin/dashboard.php`
- `templates/admin/products/index.php`
- `templates/admin/products/form.php`
- `templates/admin/categories/index.php`
- `templates/admin/categories/form.php`
- `templates/admin/orders/index.php`
- `templates/admin/orders/show.php`
- `templates/admin/users/index.php`
- `templates/admin/users/show.php`
- `templates/admin/reports/sales.php`
- `templates/admin/reports/top-products.php`

### Step-by-step tasks

1. Create `admin/login.php` if admin auth is separate from customer auth, or reuse customer auth with role checks.
2. Create `admin/dashboard.php` to show sales totals, recent orders, and low-stock products.
3. Build product CRUD first because the storefront depends on manageable catalog data.
4. Build category CRUD next.
5. Build order management with status updates and cancellations.
6. Build user management for account lookup, role changes, and account status changes.
7. Build reporting pages for date-range sales and top-selling products.
8. Reuse shared admin guards from `includes/auth.php`.

## Phase 10: Search, Filters, and Sorting

Goal: make catalog browsing usable at scale.

### Files to create

- `services/SearchService.php`
- `controllers/SearchController.php`

### Files to update later

- `public/products/catalog.php`
- `templates/products/catalog.php`
- `models/Product.php`

### Step-by-step tasks

1. Create `services/SearchService.php` to normalize search/filter inputs.
2. Add product search by name, description, and SKU.
3. Add price range filters.
4. Add category and subcategory filters.
5. Add attribute filters if product attributes are introduced later.
6. Add sorting by price, popularity, and newest.
7. Preserve query string state across pagination.
8. Add indexes for searchable and sortable database columns.
9. Use prepared statements for every filter input.

## Phase 11: Wishlist, Reviews, Inventory, Coupons, Newsletter

Goal: add commerce enhancements after the core store is stable.

### Files to create

- `public/account/wishlist.php`
- `public/account/wishlist-add.php`
- `public/account/wishlist-remove.php`
- `public/products/review-create.php`
- `public/products/review-update.php`
- `public/newsletter/subscribe.php`
- `public/newsletter/unsubscribe.php`
- `controllers/WishlistController.php`
- `controllers/ReviewController.php`
- `controllers/CouponController.php`
- `controllers/NewsletterController.php`
- `services/WishlistService.php`
- `services/ReviewService.php`
- `services/CouponService.php`
- `services/NewsletterService.php`
- `templates/account/wishlist.php`
- `templates/products/review-form.php`

### Files to update later

- `templates/products/show.php`
- `templates/cart/index.php`
- `templates/partials/footer.php`
- `admin/dashboard.php`
- `admin/reports/sales.php`

### Step-by-step tasks

1. Create wishlist routes and account page.
2. Add move-to-cart support from wishlist.
3. Create product review submission endpoints and moderation-friendly storage.
4. Show average rating and review list on product pages.
5. Create `services/CouponService.php` and apply coupon logic at cart and checkout.
6. Add newsletter subscribe and unsubscribe routes.
7. Add inventory adjustment logic after successful orders and admin stock updates.
8. Surface low-stock information in the admin dashboard.

## Recommended Build Sequence

Work in this exact order:

1. Create foundation files and shared layout.
2. Migrate the existing catalog into controller/template structure.
3. Build cart routes, cart service, cart page, and mini-cart.
4. Build registration, verification, login, logout, and password reset.
5. Build profile and address management.
6. Build checkout pages and order creation flow.
7. Integrate PayPal sandbox.
8. Build order history, status tracking, and invoice download.
9. Build admin dashboard and management screens.
10. Expand search/filter/sort.
11. Add wishlist, reviews, inventory, coupons, and newsletter.

## Exact Minimum Viable File Set

If you want the smallest realistic first milestone, create these files first:

- `config/app.php`
- `config/database.php`
- `config/session.php`
- `includes/bootstrap.php`
- `includes/helpers.php`
- `includes/csrf.php`
- `includes/auth.php`
- `templates/partials/header.php`
- `templates/partials/footer.php`
- `templates/partials/mini-cart.php`
- `assets/css/store.css`
- `public/index.php`
- `public/products/catalog.php`
- `public/products/show.php`
- `controllers/ProductController.php`
- `controllers/CartController.php`
- `services/CartService.php`
- `models/Product.php`
- `models/Cart.php`
- `templates/products/catalog.php`
- `templates/products/show.php`
- `templates/cart/index.php`
- `public/cart/index.php`
- `public/cart/add.php`
- `public/cart/update.php`
- `public/cart/remove.php`
- `sql/schema.sql`
- `sql/seed.sql`

## Definition of Done by Milestone

### Milestone 1: Catalog + Cart
- Shared bootstrap works.
- Catalog renders through shared layout.
- Add to cart works.
- Cart page works.
- Mini-cart renders in header.
- Session cart survives refresh and page navigation.

### Milestone 2: Accounts
- Registration works.
- Email verification works.
- Login/logout works.
- Password reset works.
- User can manage shipping addresses.

### Milestone 3: Checkout + Orders
- Guest checkout works.
- Multi-step checkout works.
- PayPal sandbox payment works.
- Confirmation email sends.
- Order history renders.
- Invoice PDF downloads.

### Milestone 4: Admin + Search + Enhancements
- Admin can manage products, categories, orders, and users.
- Reporting pages show useful store metrics.
- Search/filter/sort behaves correctly.
- Wishlist, reviews, coupons, inventory, and newsletter are functional.

## Suggested First Implementation Sprint

Start with these concrete tasks:

1. Create `config/`, `includes/`, `templates/partials/`, `assets/`, `public/`, `controllers/`, `models/`, `services/`, and `sql/` directories.
2. Create the foundation config and bootstrap files.
3. Create `public/products/catalog.php`, `controllers/ProductController.php`, and `templates/products/catalog.php`.
4. Migrate `product-catalog.php` logic into that new structure.
5. Create the cart service and cart routes.
6. Add the mini-cart to the shared header.
7. Test catalog -> add to cart -> cart page flow before moving on to auth.
