<?php

declare(strict_types=1);
// Starter note: This file handles logout - straightforward on purpose.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$authController->logout();
session_regenerate_id(true);
redirect(base_url('auth/login.php'));
