<?php

declare(strict_types=1);
// Account controller. Mostly traffic control so the app does not wander off.

final class AccountController
{
	public function __construct(
		private User $userModel,
		private Address $addressModel,
		private PaymentMethod $paymentMethodModel
	) {
	}

	public function profile(int $userId): ?array
	{
		return $this->userModel->findById($userId);
	}

	public function updateProfile(int $userId, array $input): bool
	{
		return $this->userModel->updateProfile(
			$userId,
			trim((string) ($input['first_name'] ?? '')),
			trim((string) ($input['last_name'] ?? ''))
		);
	}

	public function addresses(int $userId): array
	{
		return $this->addressModel->allForUser($userId);
	}

	public function saveAddress(?int $addressId, int $userId, array $input): bool
	{
		if ($addressId === null) {
			return $this->addressModel->create($userId, $input);
		}

		return $this->addressModel->update($addressId, $userId, $input);
	}

	public function deleteAddress(int $addressId, int $userId): bool
	{
		return $this->addressModel->delete($addressId, $userId);
	}

	public function paymentMethods(int $userId): array
	{
		return $this->paymentMethodModel->allForUser($userId);
	}

	public function addPaymentMethod(int $userId, array $input): bool
	{
		return $this->paymentMethodModel->create($userId, $input);
	}

	public function deletePaymentMethod(int $paymentMethodId, int $userId): bool
	{
		return $this->paymentMethodModel->delete($paymentMethodId, $userId);
	}
}
