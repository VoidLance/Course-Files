<?php

declare(strict_types=1);
// Starter note: This file handles idation - straightforward on purpose.

function validate_required(array $data, array $fields): array
{
    $errors = [];

    foreach ($fields as $field) {
        if (trim((string) ($data[$field] ?? '')) === '') {
            $errors[$field] = 'This field is required.';
        }
    }

    return $errors;
}

function validate_email_address(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
