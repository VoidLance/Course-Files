<?php

declare(strict_types=1);
// Address model. Mostly database chats, but at least they are organized.

final class Address
{
    public function __construct(private mysqli $connection)
    {
    }

    public function allForUser(int $userId): array
    {
        $statement = $this->connection->prepare('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, address_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare addresses query.');
        }

        $statement->bind_param('i', $userId);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function findByIdForUser(int $addressId, int $userId): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM addresses WHERE address_id = ? AND user_id = ? LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare address lookup query.');
        }

        $statement->bind_param('ii', $addressId, $userId);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function create(int $userId, array $data): bool
    {
        $statement = $this->connection->prepare('INSERT INTO addresses (user_id, label, recipient_name, line_one, line_two, city, state_region, postal_code, country_code, phone, address_type, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare address create query.');
        }

        $isDefault = !empty($data['is_default']) ? 1 : 0;
        $statement->bind_param(
            'issssssssssi',
            $userId,
            $data['label'],
            $data['recipient_name'],
            $data['line_one'],
            $data['line_two'],
            $data['city'],
            $data['state_region'],
            $data['postal_code'],
            $data['country_code'],
            $data['phone'],
            $data['address_type'],
            $isDefault
        );
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function update(int $addressId, int $userId, array $data): bool
    {
        $statement = $this->connection->prepare('UPDATE addresses SET label = ?, recipient_name = ?, line_one = ?, line_two = ?, city = ?, state_region = ?, postal_code = ?, country_code = ?, phone = ?, address_type = ?, is_default = ? WHERE address_id = ? AND user_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare address update query.');
        }

        $isDefault = !empty($data['is_default']) ? 1 : 0;
        $statement->bind_param(
            'ssssssssssiii',
            $data['label'],
            $data['recipient_name'],
            $data['line_one'],
            $data['line_two'],
            $data['city'],
            $data['state_region'],
            $data['postal_code'],
            $data['country_code'],
            $data['phone'],
            $data['address_type'],
            $isDefault,
            $addressId,
            $userId
        );
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function delete(int $addressId, int $userId): bool
    {
        $statement = $this->connection->prepare('DELETE FROM addresses WHERE address_id = ? AND user_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare address delete query.');
        }

        $statement->bind_param('ii', $addressId, $userId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }
}
