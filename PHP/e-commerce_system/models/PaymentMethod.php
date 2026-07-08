<?php

declare(strict_types=1);
// Starter note: This file handles ntMethod - straightforward on purpose.

final class PaymentMethod
{
    public function __construct(private mysqli $connection)
    {
    }

    public function allForUser(int $userId): array
    {
        $statement = $this->connection->prepare('SELECT * FROM payment_methods WHERE user_id = ? ORDER BY is_default DESC, payment_method_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare payment methods query.');
        }

        $statement->bind_param('i', $userId);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function create(int $userId, array $data): bool
    {
        $statement = $this->connection->prepare('INSERT INTO payment_methods (user_id, provider, provider_reference, brand, last_four, expires_month, expires_year, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare payment method create query.');
        }

        $isDefault = !empty($data['is_default']) ? 1 : 0;
        $statement->bind_param(
            'issssiii',
            $userId,
            $data['provider'],
            $data['provider_reference'],
            $data['brand'],
            $data['last_four'],
            $data['expires_month'],
            $data['expires_year'],
            $isDefault
        );

        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function delete(int $paymentMethodId, int $userId): bool
    {
        $statement = $this->connection->prepare('DELETE FROM payment_methods WHERE payment_method_id = ? AND user_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare payment method delete query.');
        }

        $statement->bind_param('ii', $paymentMethodId, $userId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }
}
