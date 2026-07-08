<?php

declare(strict_types=1);
// Starter note: This file handles tService - straightforward on purpose.

final class CartService
{
    public function __construct(private Product $productModel, private Cart $cartModel)
    {
    }

    public function getDetailedCart(): array
    {
        $items = [];
        $subtotal = 0.0;
        $rawCart = $this->cartModel->all();

        foreach ($rawCart as $productId => $quantity) {
            $product = $this->productModel->findById((int) $productId);
            if ($product === null) {
                continue;
            }

            $quantity = max(1, (int) $quantity);
            $lineTotal = (float) $product['price'] * $quantity;
            $subtotal += $lineTotal;

            $items[] = [
                'product' => $product,
                'quantity' => $quantity,
                'line_total' => $lineTotal,
            ];
        }

        $discount = 0.0;
        $estimatedShipping = $subtotal > 0 ? 5.99 : 0.0;
        $estimatedTax = round(($subtotal - $discount) * 0.10, 2);
        $grandTotal = round($subtotal - $discount + $estimatedTax + $estimatedShipping, 2);

        return [
            'items' => $items,
            'item_count' => array_sum(array_map(static fn (array $item): int => $item['quantity'], $items)),
            'subtotal' => $subtotal,
            'discount' => $discount,
            'estimated_shipping' => $estimatedShipping,
            'estimated_tax' => $estimatedTax,
            'grand_total' => $grandTotal,
        ];
    }

    public function add(int $productId, int $quantity = 1): bool
    {
        $product = $this->productModel->findById($productId);
        if ($product === null || (int) $product['stock_quantity'] < 1) {
            return false;
        }

        $cart = $this->cartModel->all();
        $existingQuantity = (int) ($cart[$productId] ?? 0);
        $requestedQuantity = $existingQuantity + max(1, $quantity);
        $cart[$productId] = min($requestedQuantity, (int) $product['stock_quantity']);
        $this->cartModel->put($cart);

        return true;
    }

    public function update(int $productId, int $quantity): bool
    {
        $cart = $this->cartModel->all();
        if (!array_key_exists($productId, $cart)) {
            return false;
        }

        if ($quantity <= 0) {
            unset($cart[$productId]);
            $this->cartModel->put($cart);
            return true;
        }

        $product = $this->productModel->findById($productId);
        if ($product === null) {
            return false;
        }

        $cart[$productId] = min($quantity, (int) $product['stock_quantity']);
        $this->cartModel->put($cart);

        return true;
    }

    public function remove(int $productId): void
    {
        $cart = $this->cartModel->all();
        unset($cart[$productId]);
        $this->cartModel->put($cart);
    }
}
