<?php

declare(strict_types=1);
// Starter note: This file handles hlistService - straightforward on purpose.

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
