<?php

declare(strict_types=1);
// Wishlist model. Mostly database chats, but at least they are organized.

final class Wishlist
{
    public function __construct(private mysqli $connection)
    {
    }

    public function allForUser(int $userId): array
    {
        $statement = $this->connection->prepare('SELECT w.wishlist_id, p.product_id, p.product_name, p.price, p.image_url, p.stock_quantity FROM wishlists w JOIN products p ON w.product_id = p.product_id WHERE w.user_id = ? ORDER BY w.wishlist_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare wishlist query.');
        }

        $statement->bind_param('i', $userId);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function add(int $userId, int $productId): bool
    {
        $statement = $this->connection->prepare('INSERT IGNORE INTO wishlists (user_id, product_id) VALUES (?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare wishlist add query.');
        }

        $statement->bind_param('ii', $userId, $productId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function remove(int $userId, int $productId): bool
    {
        $statement = $this->connection->prepare('DELETE FROM wishlists WHERE user_id = ? AND product_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare wishlist remove query.');
        }

        $statement->bind_param('ii', $userId, $productId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }
}
