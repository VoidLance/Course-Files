<?php

declare(strict_types=1);
// Mail settings. Emails do not send themselves, sadly.

return [
    'mailer' => 'smtp',
    'host' => 'localhost',
    'port' => 1025,
    'username' => '',
    'password' => '',
    'encryption' => null,
    'from_address' => 'no-reply@example.com',
    'from_name' => 'E-Commerce System',
];
