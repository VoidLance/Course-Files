<?php

declare(strict_types=1);
// Auth service. Business logic lives here instead of making a mess elsewhere.

final class AuthService
{
    public function __construct(private User $userModel, private EmailService $emailService)
    {
    }

    public function register(array $input): array
    {
        $errors = validate_required($input, ['first_name', 'last_name', 'email', 'password']);

        if (!validate_email_address((string) ($input['email'] ?? ''))) {
            $errors['email'] = 'Please enter a valid email address.';
        }

        if (strlen((string) ($input['password'] ?? '')) < 8) {
            $errors['password'] = 'Password must be at least 8 characters.';
        }

        if ($errors !== []) {
            return ['ok' => false, 'errors' => $errors];
        }

        $email = mb_strtolower(trim((string) $input['email']));
        if ($this->userModel->findByEmail($email) !== null) {
            return ['ok' => false, 'errors' => ['email' => 'An account already exists for this email.']];
        }

        $userId = $this->userModel->createCustomer(
            trim((string) $input['first_name']),
            trim((string) $input['last_name']),
            $email,
            password_hash((string) $input['password'], PASSWORD_DEFAULT)
        );

        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + 86400);
        $this->userModel->createVerificationToken($userId, $token, $expiresAt);

        $verifyUrl = base_url('auth/verify-email.php?token=' . urlencode($token));
        $body = '<p>Welcome! Verify your email by clicking the link below:</p><p><a href="' . e($verifyUrl) . '">Verify Email</a></p>';
        $this->emailService->send($email, 'Verify your email', $body);

        return ['ok' => true, 'user_id' => $userId];
    }

    public function verifyEmail(string $token): bool
    {
        return $this->userModel->verifyByToken($token);
    }

    public function login(string $email, string $password): array
    {
        $email = mb_strtolower(trim($email));
        $user = $this->userModel->findByEmail($email);
        if ($user === null) {
            return ['ok' => false, 'error' => 'Invalid credentials.'];
        }

        if ($user['status'] !== 'active') {
            return ['ok' => false, 'error' => 'This account is disabled.'];
        }

        if (!password_verify($password, (string) $user['password_hash'])) {
            return ['ok' => false, 'error' => 'Invalid credentials.'];
        }

        if ((int) $user['is_verified'] !== 1) {
            return ['ok' => false, 'error' => 'Please verify your email before logging in.'];
        }

        $_SESSION['user_id'] = (int) $user['user_id'];
        $_SESSION['role'] = (string) $user['role'];
        $_SESSION['user_email'] = (string) $user['email'];
        $_SESSION['user_name'] = trim((string) $user['first_name'] . ' ' . (string) $user['last_name']);

        $this->userModel->setLastLogin((int) $user['user_id']);

        return ['ok' => true, 'user' => $user];
    }

    public function logout(): void
    {
        unset($_SESSION['user_id'], $_SESSION['role'], $_SESSION['user_email'], $_SESSION['user_name']);
    }

    public function sendPasswordReset(string $email): bool
    {
        $user = $this->userModel->findByEmail(mb_strtolower(trim($email)));
        if ($user === null) {
            return true;
        }

        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + 3600);
        $this->userModel->createPasswordResetToken((int) $user['user_id'], $token, $expiresAt);

        $resetUrl = base_url('auth/reset-password.php?token=' . urlencode($token));
        $body = '<p>Reset your password using the link below:</p><p><a href="' . e($resetUrl) . '">Reset Password</a></p>';
        $this->emailService->send((string) $user['email'], 'Password reset', $body);

        return true;
    }

    public function resetPassword(string $token, string $password): bool
    {
        if (strlen($password) < 8) {
            return false;
        }

        return $this->userModel->resetPassword($token, password_hash($password, PASSWORD_DEFAULT));
    }
}
