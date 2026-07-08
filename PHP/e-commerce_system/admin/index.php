<?php

declare(strict_types=1);
// Admin index page. Same app, more buttons, slightly more danger.

require dirname(__DIR__) . '/includes/bootstrap.php';
require_admin();

redirect('dashboard.php');
