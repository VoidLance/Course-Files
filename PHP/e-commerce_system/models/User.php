<?php

declare(strict_types=1);
// User model. Mostly database chats, but at least they are organized.

final class User
{
    public function __construct(private mysqli $connection)
    {
    }

    public function createCustomer(string $firstName, string $lastName, string $email, string $passwordHash): int
    {
        $statement = $this->connection->prepare('INSERT INTO users (first_name, last_name, email, password_hash, role, is_verified, status) VALUES (?, ?, ?, ?, "customer", 0, "active")');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare user create query.');
        }

        $statement->bind_param('ssss', $firstName, $lastName, $email, $passwordHash);
        $statement->execute();
        $userId = (int) $statement->insert_id;
        $statement->close();

        return $userId;
    }

    public function findByEmail(string $email): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare user by email query.');
        }

        $statement->bind_param('s', $email);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function findById(int $userId): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM users WHERE user_id = ? LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare user by id query.');
        }

        $statement->bind_param('i', $userId);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function updateProfile(int $userId, string $firstName, string $lastName): bool
    {
        $statement = $this->connection->prepare('UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare update profile query.');
        }

        $statement->bind_param('ssi', $firstName, $lastName, $userId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }

    public function setLastLogin(int $userId): void
    {
        $statement = $this->connection->prepare('UPDATE users SET last_login_at = NOW() WHERE user_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare last login query.');
        }

        $statement->bind_param('i', $userId);
        $statement->execute();
        $statement->close();
    }

    public function createVerificationToken(int $userId, string $token, string $expiresAt): void
    {
        $statement = $this->connection->prepare('INSERT INTO email_verifications (user_id, token, expires_at) VALUES (?, ?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare verification token query.');
        }

        $statement->bind_param('iss', $userId, $token, $expiresAt);
        $statement->execute();
        $statement->close();
    }

    public function verifyByToken(string $token): bool
    {
        $this->connection->begin_transaction();
        try {
            $lookup = $this->connection->prepare('SELECT verification_id, user_id FROM email_verifications WHERE token = ? AND verified_at IS NULL AND expires_at > NOW() LIMIT 1 FOR UPDATE');
            if ($lookup === false) {
                throw new RuntimeException('Failed to prepare verification lookup query.');
            }

            $lookup->bind_param('s', $token);
            $lookup->execute();
            $record = $lookup->get_result()->fetch_assoc();
            $lookup->close();

            if (!$record) {
                $this->connection->rollback();
                return false;
            }

            $userId = (int) $record['user_id'];
            $verificationId = (int) $record['verification_id'];

            $updateUser = $this->connection->prepare('UPDATE users SET is_verified = 1 WHERE user_id = ?');
            if ($updateUser === false) {
                throw new RuntimeException('Failed to prepare user verify query.');
            }

            $updateUser->bind_param('i', $userId);
            $updateUser->execute();
            $updateUser->close();

            $updateToken = $this->connection->prepare('UPDATE email_verifications SET verified_at = NOW() WHERE verification_id = ?');
            if ($updateToken === false) {
                throw new RuntimeException('Failed to prepare token verify query.');
            }

            $updateToken->bind_param('i', $verificationId);
            $updateToken->execute();
            $updateToken->close();

            $this->connection->commit();
            return true;
        } catch (Throwable $exception) {
            $this->connection->rollback();
            throw $exception;
        }
    }

    public function createPasswordResetToken(int $userId, string $token, string $expiresAt): void
    {
        $statement = $this->connection->prepare('INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare password reset token query.');
        }

        $statement->bind_param('iss', $userId, $token, $expiresAt);
        $statement->execute();
        $statement->close();
    }

    public function findValidResetToken(string $token): ?array
    {
        $statement = $this->connection->prepare('SELECT * FROM password_resets WHERE token = ? AND used_at IS NULL AND expires_at > NOW() LIMIT 1');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare valid reset token query.');
        }

        $statement->bind_param('s', $token);
        $statement->execute();
        $row = $statement->get_result()->fetch_assoc() ?: null;
        $statement->close();

        return $row;
    }

    public function resetPassword(string $token, string $passwordHash): bool
    {
        $this->connection->begin_transaction();
        try {
            $reset = $this->findValidResetToken($token);
            if ($reset === null) {
                $this->connection->rollback();
                return false;
            }

            $userId = (int) $reset['user_id'];
            $resetId = (int) $reset['reset_id'];

            $updatePassword = $this->connection->prepare('UPDATE users SET password_hash = ? WHERE user_id = ?');
            if ($updatePassword === false) {
                throw new RuntimeException('Failed to prepare reset password query.');
            }

            $updatePassword->bind_param('si', $passwordHash, $userId);
            $updatePassword->execute();
            $updatePassword->close();

            $consume = $this->connection->prepare('UPDATE password_resets SET used_at = NOW() WHERE reset_id = ?');
            if ($consume === false) {
                throw new RuntimeException('Failed to prepare consume reset token query.');
            }

            $consume->bind_param('i', $resetId);
            $consume->execute();
            $consume->close();

            $this->connection->commit();
            return true;
        } catch (Throwable $exception) {
            $this->connection->rollback();
            throw $exception;
        }
    }

    public function listAll(): array
    {
        $statement = $this->connection->prepare('SELECT user_id, first_name, last_name, email, role, is_verified, status, created_at FROM users ORDER BY user_id DESC');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare users list query.');
        }

        $statement->execute();
        $rows = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
        $statement->close();

        return $rows;
    }

    public function updateAdminFields(int $userId, string $role, string $status): bool
    {
        $statement = $this->connection->prepare('UPDATE users SET role = ?, status = ? WHERE user_id = ?');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare update user admin fields query.');
        }

        $statement->bind_param('ssi', $role, $status, $userId);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }
}
