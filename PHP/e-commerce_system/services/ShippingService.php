<?php

declare(strict_types=1);
// Shipping service. Business logic lives here instead of making a mess elsewhere.

final class ShippingService
{
    public function all(): array
    {
        return [
            ['code' => 'standard', 'name' => 'Standard Shipping', 'amount' => 5.99, 'eta' => '3-5 business days'],
            ['code' => 'express', 'name' => 'Express Shipping', 'amount' => 12.99, 'eta' => '1-2 business days'],
            ['code' => 'pickup', 'name' => 'Store Pickup', 'amount' => 0.00, 'eta' => 'Same day'],
        ];
    }

    public function find(string $code): ?array
    {
        foreach ($this->all() as $method) {
            if ($method['code'] === $code) {
                return $method;
            }
        }

        return null;
    }
}
