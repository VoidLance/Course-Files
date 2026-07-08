<?php

declare(strict_types=1);
// Shared helpers. Reusing code beats copy-paste, surprisingly enough.

function app_config(string $key, mixed $default = null): mixed
{
    return $GLOBALS['app_config'][$key] ?? $default;
}

function base_url(string $path = ''): string
{
    $baseUrl = rtrim((string) app_config('base_url', ''), '/');
    $suffix = ltrim($path, '/');

    return $suffix === '' ? $baseUrl : $baseUrl . '/' . $suffix;
}

function asset_url(string $path): string
{
    return base_url('../assets/' . ltrim($path, '/'));
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function money(float $amount): string
{
    return (string) app_config('currency_symbol', '$') . number_format($amount, 2);
}

function query_string(array $overrides = []): string
{
    $params = array_merge($_GET, $overrides);
    $params = array_filter(
        $params,
        static fn ($value): bool => $value !== null && $value !== ''
    );

    return http_build_query($params);
}

function redirect(string $path): never
{
    header('Location: ' . $path);
    exit;
}

function flash(string $key, ?string $message = null): ?string
{
    if ($message !== null) {
        $_SESSION['flash'][$key] = $message;
        return null;
    }

    $value = $_SESSION['flash'][$key] ?? null;
    unset($_SESSION['flash'][$key]);

    return $value;
}
