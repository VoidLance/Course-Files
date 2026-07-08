<?php

declare(strict_types=1);
// Starter note: This file handles tory - straightforward on purpose.

final class Inventory
{
    public function __construct(private mysqli $connection)
    {
    }

    public function record(int $productId, string $movementType, int $quantityChange, ?string $referenceType = null, ?int $referenceId = null, ?string $notes = null): void
    {
        $statement = $this->connection->prepare('INSERT INTO inventory_movements (product_id, movement_type, quantity_change, reference_type, reference_id, notes) VALUES (?, ?, ?, ?, ?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare inventory movement query.');
        }

        $statement->bind_param('isisis', $productId, $movementType, $quantityChange, $referenceType, $referenceId, $notes);
        $statement->execute();
        $statement->close();
    }

    public function lowStockProducts(): array
    {
        $statement = $this->connection->prepare('SELECT product_id, product_name, stock_quantity, low_stock_threshold FROM products WHERE stock_quantity <= low_stock_threshold ORDER BY stock_quantity ASC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare low stock query.');
        }

        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }
}
