<?php

declare(strict_types=1);
// Starter note: This file handles AdminController - straightforward on purpose.

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
