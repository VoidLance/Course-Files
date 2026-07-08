<?php

declare(strict_types=1);
// Starter note: This file handles h - straightforward on purpose.

function is_logged_in(): bool
{
    return isset($_SESSION['user_id']);
}

function require_login(): void
{
    if (!is_logged_in()) {
        flash('error', 'Please log in to continue.');
        redirect(base_url('auth/login.php'));
    }
}

function require_admin(): void
{
    if (!is_logged_in()) {
        flash('error', 'Please log in as admin.');
        redirect(base_url('../admin/login.php'));
    }

    if (($_SESSION['role'] ?? null) !== 'admin') {
        http_response_code(403);
        exit('Forbidden');
    }
}
