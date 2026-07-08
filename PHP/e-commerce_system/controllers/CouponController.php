<?php

declare(strict_types=1);
// Coupon controller. Mostly traffic control so the app does not wander off.

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
