<?php

declare(strict_types=1);
// Starter note: This file handles ponService - straightforward on purpose.

final class CouponService
{
    public function __construct(private Coupon $couponModel)
    {
    }

    public function resolve(?string $code, float $subtotal): ?array
    {
        $code = trim((string) $code);
        if ($code === '') {
            return null;
        }

        $coupon = $this->couponModel->findValidByCode($code, $subtotal);
        if ($coupon === null) {
            return null;
        }

        $discount = 0.0;

        if ($coupon['discount_type'] === 'percent') {
            $discount = round($subtotal * ((float) $coupon['discount_value'] / 100), 2);
        } else {
            $discount = min($subtotal, (float) $coupon['discount_value']);
        }

        return [
            'coupon' => $coupon,
            'discount' => $discount,
        ];
    }
}
