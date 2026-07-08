<?php

declare(strict_types=1);
// Starter note: This file handles  - straightforward on purpose.

final class Order
{
    public function __construct(private mysqli $connection)
    {
    }

    public function create(array $orderData, array $items): int
    {
        $this->connection->begin_transaction();

        try {
            $statement = $this->connection->prepare('INSERT INTO orders (user_id, order_number, customer_email, status, payment_status, shipping_method, shipping_amount, tax_amount, discount_amount, subtotal_amount, total_amount, coupon_code, shipping_address_json, billing_address_json, notes, placed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())');
            if ($statement === false) {
                throw new RuntimeException('Failed to prepare order insert query.');
            }

            $statement->bind_param(
                'isssssdddddssss',
                $orderData['user_id'],
                $orderData['order_number'],
                $orderData['customer_email'],
                $orderData['status'],
                $orderData['payment_status'],
                $orderData['shipping_method'],
                $orderData['shipping_amount'],
                $orderData['tax_amount'],
                $orderData['discount_amount'],
                $orderData['subtotal_amount'],
                $orderData['total_amount'],
                $orderData['coupon_code'],
                $orderData['shipping_address_json'],
                $orderData['billing_address_json'],
                $orderData['notes']
            );
            $statement->execute();
            $orderId = (int) $statement->insert_id;
            $statement->close();

            $itemStatement = $this->connection->prepare('INSERT INTO order_items (order_id, product_id, sku, product_name, quantity, unit_price, line_total) VALUES (?, ?, ?, ?, ?, ?, ?)');
            if ($itemStatement === false) {
                throw new RuntimeException('Failed to prepare order item insert query.');
            }

            foreach ($items as $item) {
                $itemStatement->bind_param(
                    'iissidd',
                    $orderId,
                    $item['product_id'],
                    $item['sku'],
                    $item['product_name'],
                    $item['quantity'],
                    $item['unit_price'],
                    $item['line_total']
                );
                $itemStatement->execute();

                $stockStatement = $this->connection->prepare('UPDATE products SET stock_quantity = GREATEST(0, stock_quantity - ?) WHERE product_id = ?');
                if ($stockStatement === false) {
                    throw new RuntimeException('Failed to prepare stock update query.');
                }

                $stockStatement->bind_param('ii', $item['quantity'], $item['product_id']);
                $stockStatement->execute();
                $stockStatement->close();
            }
            $itemStatement->close();

            $history = $this->connection->prepare('INSERT INTO order_status_history (order_id, status, comment, created_by_user_id) VALUES (?, ?, ?, ?)');
            if ($history === false) {
                throw new RuntimeException('Failed to prepare order history insert query.');
            }

            $comment = 'Order placed';
            $history->bind_param('issi', $orderId, $orderData['status'], $comment, $orderData['user_id']);
            $history->execute();
            $history->close();

            $this->connection->commit();
            return $orderId;
        } catch (Throwable $exception) {
            $this->connection->rollback();
            throw $exception;
        }
    }

    public function setPayPalReferences(int $orderId, ?string $paypalOrderId, ?string $paypalCaptureId): void
    {
        $statement = $this->connection->prepare('UPDATE orders SET paypal_order_id = ?, paypal_capture_id = ? WHERE order_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare PayPal reference update query.');
        }

        $statement->bind_param('ssi', $paypalOrderId, $paypalCaptureId, $orderId);
        $statement->execute();
        $statement->close();
    }

    public function listByUser(int $userId): array
    {
        $statement = $this->connection->prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY order_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare user orders query.');
        }

        $statement->bind_param('i', $userId);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function findById(int $orderId): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM orders WHERE order_id = ? LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare order lookup query.');
        }

        $statement->bind_param('i', $orderId);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function findForUser(int $orderId, int $userId): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM orders WHERE order_id = ? AND user_id = ? LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare user order lookup query.');
        }

        $statement->bind_param('ii', $orderId, $userId);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function items(int $orderId): array
    {
        $statement = $this->connection->prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY order_item_id');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare order items query.');
        }

        $statement->bind_param('i', $orderId);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function history(int $orderId): array
    {
        $statement = $this->connection->prepare('SELECT * FROM order_status_history WHERE order_id = ? ORDER BY history_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare order history query.');
        }

        $statement->bind_param('i', $orderId);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function listAll(): array
    {
        $statement = $this->connection->prepare('SELECT o.*, u.email AS user_email FROM orders o LEFT JOIN users u ON o.user_id = u.user_id ORDER BY o.order_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare all orders query.');
        }

        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function updateStatus(int $orderId, string $status, string $comment, ?int $adminUserId): bool
    {
        $statement = $this->connection->prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare order status update query.');
        }

        $statement->bind_param('si', $status, $orderId);
        $ok = $statement->execute();
        $statement->close();

        if ($ok) {
            $history = $this->connection->prepare('INSERT INTO order_status_history (order_id, status, comment, created_by_user_id) VALUES (?, ?, ?, ?)');
            if ($history === false) {
                throw new RuntimeException('Failed to prepare order status history insert query.');
            }

            $history->bind_param('issi', $orderId, $status, $comment, $adminUserId);
            $history->execute();
            $history->close();
        }

        return $ok;
    }

    public function salesSummary(): array
    {
        $statement = $this->connection->prepare('SELECT COUNT(*) AS total_orders, COALESCE(SUM(total_amount), 0) AS total_sales, COALESCE(AVG(total_amount), 0) AS average_order_value FROM orders WHERE status != "cancelled"');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare sales summary query.');
        }

        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: ['total_orders' => 0, 'total_sales' => 0, 'average_order_value' => 0];
        $statement->close();

        return $row;
    }

    public function topProducts(): array
    {
        $statement = $this->connection->prepare('SELECT oi.product_id, oi.product_name, SUM(oi.quantity) AS units_sold, SUM(oi.line_total) AS revenue FROM order_items oi JOIN orders o ON o.order_id = oi.order_id WHERE o.status != "cancelled" GROUP BY oi.product_id, oi.product_name ORDER BY units_sold DESC LIMIT 10');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare top products query.');
        }

        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function recent(int $limit = 10): array
    {
        $statement = $this->connection->prepare('SELECT order_id, order_number, customer_email, status, total_amount, created_at FROM orders ORDER BY order_id DESC LIMIT ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare recent orders query.');
        }

        $statement->bind_param('i', $limit);
        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }
}
