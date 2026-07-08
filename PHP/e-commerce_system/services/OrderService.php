<?php

declare(strict_types=1);
// Order service. Business logic lives here instead of making a mess elsewhere.

final class OrderService
{
    public function __construct(private Order $orderModel)
    {
    }

    public function listForCurrentUser(): array
    {
        if (!is_logged_in()) {
            return [];
        }

        return $this->orderModel->listByUser((int) $_SESSION['user_id']);
    }

    public function detailForCurrentUser(int $orderId): ?array
    {
        if (!is_logged_in()) {
            return null;
        }

        $order = $this->orderModel->findForUser($orderId, (int) $_SESSION['user_id']);
        if ($order === null) {
            return null;
        }

        return [
            'order' => $order,
            'items' => $this->orderModel->items($orderId),
            'history' => $this->orderModel->history($orderId),
        ];
    }

    public function adminList(): array
    {
        return $this->orderModel->listAll();
    }

    public function adminDetail(int $orderId): ?array
    {
        $order = $this->orderModel->findById($orderId);
        if ($order === null) {
            return null;
        }

        return [
            'order' => $order,
            'items' => $this->orderModel->items($orderId),
            'history' => $this->orderModel->history($orderId),
        ];
    }

    public function updateStatus(int $orderId, string $status, string $comment): bool
    {
        $allowed = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
        if (!in_array($status, $allowed, true)) {
            return false;
        }

        $adminId = is_logged_in() ? (int) $_SESSION['user_id'] : null;
        return $this->orderModel->updateStatus($orderId, $status, $comment, $adminId);
    }

    public function salesSummary(): array
    {
        return $this->orderModel->salesSummary();
    }

    public function topProducts(): array
    {
        return $this->orderModel->topProducts();
    }

    public function recentOrders(int $limit = 10): array
    {
        return $this->orderModel->recent($limit);
    }
}
