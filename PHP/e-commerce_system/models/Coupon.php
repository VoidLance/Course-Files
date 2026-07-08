<?php

declare(strict_types=1);
// Starter note: This file handles n - straightforward on purpose.

final class Coupon
{
    public function __construct(private mysqli $connection)
    {
    }

    public function findValidByCode(string $code, float $orderTotal): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM coupons WHERE code = ? AND is_active = 1 AND (starts_at IS NULL OR starts_at <= NOW()) AND (expires_at IS NULL OR expires_at > NOW()) AND (minimum_order_total IS NULL OR minimum_order_total <= ?) AND (usage_limit IS NULL OR usage_count < usage_limit) LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare coupon lookup query.');
        }

        $statement->bind_param('sd', $code, $orderTotal);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function incrementUsage(int $couponId, ?int $userId, ?int $orderId): void
    {
        $update = $this->connection->prepare('UPDATE coupons SET usage_count = usage_count + 1 WHERE coupon_id = ?');
        if ($update === false) {
            throw new RuntimeException('Failed to prepare coupon usage update query.');
        }

        $update->bind_param('i', $couponId);
        $update->execute();
        $update->close();

        $insert = $this->connection->prepare('INSERT INTO coupon_usages (coupon_id, user_id, order_id) VALUES (?, ?, ?)');
        if ($insert === false) {
            throw new RuntimeException('Failed to prepare coupon usage insert query.');
        }

        $insert->bind_param('iii', $couponId, $userId, $orderId);
        $insert->execute();
        $insert->close();
    }
}
