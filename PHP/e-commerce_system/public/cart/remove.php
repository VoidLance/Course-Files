<?php

declare(strict_types=1);
// Remove page entry. Small file, clear job, no need for more comments.

require dirname(__DIR__, 2) . '/includes/bootstrap.php';

$cartController->remove();
