<?php

declare(strict_types=1);

final class ProductController
{
    public function __construct(private Product $productModel, private CartService $cartService)
    {
    }

    public function catalog(): array
    {
        $filters = [
            'category' => trim((string) ($_GET['category'] ?? '')),
            'subcategory' => trim((string) ($_GET['subcategory'] ?? '')),
            'search' => trim((string) ($_GET['search'] ?? '')),
        ];

        $page = max(1, (int) ($_GET['page'] ?? 1));
        $catalog = $this->productModel->getCatalogData($filters, $page, 12);
        $catalog['cartSummary'] = $this->cartService->getDetailedCart();

        return $catalog;
    }

    public function show(int $productId): ?array
    {
        $product = $this->productModel->findById($productId);
        if ($product === null) {
            return null;
        }

        return [
            'product' => $product,
            'cartSummary' => $this->cartService->getDetailedCart(),
        ];
    }
}
