<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

session_destroy();
redirect(base_url('auth/login.php'));
