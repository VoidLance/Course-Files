<?php

declare(strict_types=1);
// Starter note: This file handles ReviewController - straightforward on purpose.

final class ReviewController
{
	public function __construct(private ReviewService $reviewService)
	{
	}

	public function listForProduct(int $productId): array
	{
		return $this->reviewService->listForProduct($productId);
	}

	public function save(int $productId, int $userId, array $input): bool
	{
		return $this->reviewService->save(
			$productId,
			$userId,
			(int) ($input['rating'] ?? 0),
			(string) ($input['title'] ?? ''),
			(string) ($input['body'] ?? '')
		);
	}
}
