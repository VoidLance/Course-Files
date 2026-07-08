<?php

declare(strict_types=1);
// Wishlist service. Business logic lives here instead of making a mess elsewhere.

final class WishlistService
{
    public function __construct(private Wishlist $wishlistModel)
    {
    }

    public function allForUser(int $userId): array
    {
        return $this->wishlistModel->allForUser($userId);
    }

    public function add(int $userId, int $productId): bool
    {
        return $this->wishlistModel->add($userId, $productId);
    }

    public function remove(int $userId, int $productId): bool
    {
        return $this->wishlistModel->remove($userId, $productId);
    }
}
