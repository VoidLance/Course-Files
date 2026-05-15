<?php

declare(strict_types=1);

final class CartController
{
    public function __construct(private CartService $cartService)
    {
    }

    public function index(): array
    {
        return $this->cartService->getDetailedCart();
    }

    public function add(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
            http_response_code(422);
            exit('Invalid request.');
        }

        $productId = (int) ($_POST['product_id'] ?? 0);
        $quantity = max(1, (int) ($_POST['quantity'] ?? 1));

        if ($this->cartService->add($productId, $quantity)) {
            flash('success', 'Product added to cart.');
        } else {
            flash('error', 'Unable to add that product to the cart.');
        }

        $returnTo = (string) ($_POST['return_to'] ?? base_url('cart/index.php'));
        redirect($returnTo);
    }

    public function update(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
            http_response_code(422);
            exit('Invalid request.');
        }

        $productId = (int) ($_POST['product_id'] ?? 0);
        $quantity = (int) ($_POST['quantity'] ?? 1);
        $this->cartService->update($productId, $quantity);
        flash('success', 'Cart updated.');
        redirect(base_url('cart/index.php'));
    }

    public function remove(): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !verify_csrf_token($_POST['csrf_token'] ?? null)) {
            http_response_code(422);
            exit('Invalid request.');
        }

        $productId = (int) ($_POST['product_id'] ?? 0);
        $this->cartService->remove($productId);
        flash('success', 'Product removed from cart.');
        redirect(base_url('cart/index.php'));
    }
}
