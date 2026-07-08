<?php

declare(strict_types=1);
// Starter note: This file handles php - straightforward on purpose.

require dirname(__DIR__) . '/includes/bootstrap.php';
require_admin();

redirect('dashboard.php');
