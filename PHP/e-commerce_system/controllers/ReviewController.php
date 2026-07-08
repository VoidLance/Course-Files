<?php

declare(strict_types=1);
// Review controller. Mostly traffic control so the app does not wander off.

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
