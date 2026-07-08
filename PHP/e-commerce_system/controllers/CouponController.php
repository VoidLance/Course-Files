<?php

declare(strict_types=1);
// Starter note: This file handles CouponController - straightforward on purpose.

final class CouponController
{
	public function __construct(private CouponService $couponService)
	{
	}

	public function resolve(?string $code, float $subtotal): ?array
	{
		return $this->couponService->resolve($code, $subtotal);
	}
}
