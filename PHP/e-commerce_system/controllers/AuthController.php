<?php

declare(strict_types=1);
// Starter note: This file handles AuthController - straightforward on purpose.

final class AuthController
{
	public function __construct(private AuthService $authService)
	{
	}

	public function register(array $input): array
	{
		return $this->authService->register($input);
	}

	public function login(string $email, string $password): array
	{
		return $this->authService->login($email, $password);
	}

	public function verifyEmail(string $token): bool
	{
		return $this->authService->verifyEmail($token);
	}

	public function forgotPassword(string $email): bool
	{
		return $this->authService->sendPasswordReset($email);
	}

	public function resetPassword(string $token, string $password): bool
	{
		return $this->authService->resetPassword($token, $password);
	}

	public function logout(): void
	{
		$this->authService->logout();
	}
}
