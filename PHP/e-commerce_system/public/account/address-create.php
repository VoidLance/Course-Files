<?php

declare(strict_types=1);

require dirname(__DIR__, 2) . '/includes/bootstrap.php';
require_login();

$pageTitle = 'Add Address';
require $rootPath . '/templates/account/address-form.php';
