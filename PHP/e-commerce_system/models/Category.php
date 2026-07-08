<?php

declare(strict_types=1);
// Category model. Mostly database chats, but at least they are organized.

final class Category
{
    public function __construct(private mysqli $connection)
    {
    }

    public function all(): array
    {
        $statement = $this->connection->prepare('SELECT * FROM categories ORDER BY category_name');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare categories query.');
        }

        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function findById(int $categoryId): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM categories WHERE category_id = ? LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare category by id query.');
        }

        $statement->bind_param('i', $categoryId);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function create(string $name, string $slug): bool
    {
        $statement = $this->connection->prepare('INSERT INTO categories (category_name, slug) VALUES (?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare category create query.');
        }

        $statement->bind_param('ss', $name, $slug);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function update(int $categoryId, string $name, string $slug): bool
    {
        $statement = $this->connection->prepare('UPDATE categories SET category_name = ?, slug = ? WHERE category_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare category update query.');
        }

        $statement->bind_param('ssi', $name, $slug, $categoryId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function delete(int $categoryId): bool
    {
        $statement = $this->connection->prepare('DELETE FROM categories WHERE category_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare category delete query.');
        }

        $statement->bind_param('i', $categoryId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }
}
