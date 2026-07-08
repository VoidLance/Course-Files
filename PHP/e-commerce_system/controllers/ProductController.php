<?php

declare(strict_types=1);
// Starter note: This file handles ProductController - straightforward on purpose.

final class ProductController
{
    public function __construct(
        private Product $productModel,
        private CartService $cartService,
        private SearchController $searchController,
        private ReviewController $reviewController
    )
    {
    }

    public function catalog(): array
    {
        $filters = $this->searchController->filters($_GET);

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
            'reviews' => $this->reviewController->listForProduct($productId),
            'relatedProducts' => $this->productModel->related($productId, isset($product['category_id']) ? (int) $product['category_id'] : null, 4),
            'cartSummary' => $this->cartService->getDetailedCart(),
        ];
    }
}
