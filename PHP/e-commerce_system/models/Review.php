<?php

declare(strict_types=1);
// Starter note: This file handles w - straightforward on purpose.

final class Review
{
    public function __construct(private mysqli $connection)
    {
    }

    public function approvedForProduct(int $productId): array
    {
        $statement = $this->connection->prepare('SELECT r.*, u.first_name, u.last_name FROM reviews r JOIN users u ON r.user_id = u.user_id WHERE r.product_id = ? AND r.status = "approved" ORDER BY r.created_at DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare product reviews query.');
        }

        $statement->bind_param('i', $productId);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function upsert(int $productId, int $userId, int $rating, string $title, string $body): bool
    {
        $existing = $this->connection->prepare('SELECT review_id FROM reviews WHERE product_id = ? AND user_id = ? LIMIT 1');
        if ($existing === false) {
            throw new RuntimeException('Failed to prepare existing review query.');
        }

        $existing->bind_param('ii', $productId, $userId);
        $existing->execute();
        $review = $existing->get_result()->fetch_assoc();
        $existing->close();

        if ($review) {
            $reviewId = (int) $review['review_id'];
            $update = $this->connection->prepare('UPDATE reviews SET rating = ?, title = ?, body = ?, status = "pending" WHERE review_id = ?');
            if ($update === false) {
                throw new RuntimeException('Failed to prepare review update query.');
            }

            $update->bind_param('issi', $rating, $title, $body, $reviewId);
            $ok = $update->execute();
            $update->close();
            return $ok;
        }

        $insert = $this->connection->prepare('INSERT INTO reviews (product_id, user_id, rating, title, body, status) VALUES (?, ?, ?, ?, ?, "pending")');
        if ($insert === false) {
            throw new RuntimeException('Failed to prepare review insert query.');
        }

        $insert->bind_param('iiiss', $productId, $userId, $rating, $title, $body);
        $ok = $insert->execute();
        $insert->close();

        return $ok;
    }
}
