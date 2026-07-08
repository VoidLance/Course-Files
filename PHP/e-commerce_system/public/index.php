<?php

declare(strict_types=1);
// Index page entry. Small file, clear job, no need for any more explanation.

require dirname(__DIR__) . '/includes/bootstrap.php';

redirect(base_url('products/catalog.php'));
