<?php

declare(strict_types=1);
// Admin controller. Mostly traffic control so the app does not wander off.

final class AdminController
{
	public function __construct(private OrderService $orderService, private Inventory $inventoryModel)
	{
	}

	public function dashboard(): array
	{
		return [
			'sales' => $this->orderService->salesSummary(),
			'recentOrders' => $this->orderService->recentOrders(8),
			'lowStock' => $this->inventoryModel->lowStockProducts(),
		];
	}
}
