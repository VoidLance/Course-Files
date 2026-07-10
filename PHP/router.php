<?php

declare(strict_types=1);

// Router for php -S from PHP root.
// Goal: serve the root launcher page, and block accidental hits to private source files.

$uriPath = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
$fullPath = __DIR__ . $uriPath;

$privatePrefixes = [
    '/SecureFileShare/app/',
    '/SecureFileShare/config/',
    '/SecureFileShare/database/',
    '/SecureFileShare/storage/',
];

foreach ($privatePrefixes as $prefix) {
    if (str_starts_with($uriPath, $prefix)) {
        http_response_code(403);
        header('Content-Type: text/plain; charset=UTF-8');
        echo "403 Forbidden\nPrivate source path. Use /SecureFileShare/public instead.";
        exit;
    }
}

// If it is a real file and not private, let built-in server handle it.
if ($uriPath !== '/' && is_file($fullPath)) {
    return false;
}

// Default launcher page for workspace root.
if ($uriPath === '/' || $uriPath === '/index.php') {
    require __DIR__ . '/index.php';
    exit;
}

// SecureFileShare app routes should run through its public entrypoint.
if (str_starts_with($uriPath, '/SecureFileShare/public')) {
    require __DIR__ . '/SecureFileShare/public/index.php';
    exit;
}

// Fallback: if path looks like a folder, try folder index.php first.
if (is_dir($fullPath) && is_file(rtrim($fullPath, '/') . '/index.php')) {
    require rtrim($fullPath, '/') . '/index.php';
    exit;
}

// Last fallback to root launcher so broken URLs are still recoverable.
require __DIR__ . '/index.php';
