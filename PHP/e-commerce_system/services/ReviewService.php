<?php

declare(strict_types=1);
// Starter note: This file handles iewService - straightforward on purpose.

final class ReviewService
{
    public function __construct(private Review $reviewModel)
    {
    }

    public function listForProduct(int $productId): array
    {
        return $this->reviewModel->approvedForProduct($productId);
    }

    public function save(int $productId, int $userId, int $rating, string $title, string $body): bool
    {
        $rating = max(1, min(5, $rating));
        return $this->reviewModel->upsert($productId, $userId, $rating, trim($title), trim($body));
    }
}
