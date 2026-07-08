<?php

declare(strict_types=1);
// Checkout controller. Mostly traffic control so the app does not wander off.

final class CheckoutController
{
	public function __construct(private CheckoutService $checkoutService, private ShippingService $shippingService)
	{
	}

	public function shippingMethods(): array
	{
		return $this->shippingService->all();
	}

	public function saveShipping(array $input): array
	{
		return $this->checkoutService->saveShipping($input);
	}

	public function savePayment(array $input): array
	{
		return $this->checkoutService->savePayment($input);
	}

	public function review(): array
	{
		return $this->checkoutService->review();
	}
}
