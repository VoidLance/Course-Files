<?php

declare(strict_types=1);
// Logout page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$authController->logout();
session_regenerate_id(true);
redirect(base_url('auth/login.php'));
