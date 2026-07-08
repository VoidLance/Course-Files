<?php

declare(strict_types=1);
// Order controller. Mostly traffic control so the app does not wander off.

final class OrderController
{
	public function __construct(private OrderService $orderService, private InvoiceService $invoiceService)
	{
	}

	public function userOrders(): array
	{
		return $this->orderService->listForCurrentUser();
	}

	public function userOrderDetail(int $orderId): ?array
	{
		return $this->orderService->detailForCurrentUser($orderId);
	}

	public function adminOrders(): array
	{
		return $this->orderService->adminList();
	}

	public function adminOrderDetail(int $orderId): ?array
	{
		return $this->orderService->adminDetail($orderId);
	}

	public function updateStatus(int $orderId, string $status, string $comment): bool
	{
		return $this->orderService->updateStatus($orderId, $status, $comment);
	}

	public function invoicePdf(array $order, array $items): string
	{
		return $this->invoiceService->generate($order, $items);
	}
}
