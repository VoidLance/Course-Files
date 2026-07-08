<?php

declare(strict_types=1);
// Starter note: This file handles WishlistController - straightforward on purpose.

final class WishlistController
{
	public function __construct(private WishlistService $wishlistService)
	{
	}

	public function index(int $userId): array
	{
		return $this->wishlistService->allForUser($userId);
	}

	public function add(int $userId, int $productId): bool
	{
		return $this->wishlistService->add($userId, $productId);
	}

	public function remove(int $userId, int $productId): bool
	{
		return $this->wishlistService->remove($userId, $productId);
	}
}
