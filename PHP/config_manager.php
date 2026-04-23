<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    header('Content-Type: text/plain; charset=UTF-8');
}

/*
 * Config Manager Constant Demonstration
 *
 * This script demonstrates:
 * 1. Basic constant usage
 * 2. Array constant access
 * 3. Constant case-sensitivity behavior across PHP versions
 * 4. Global scope access from inside functions
 * 5. Error handling for constant redefinition attempts
 */

// Constants for database configuration.
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'config_manager');

// Constants for application information.
const APP_NAME = 'Config Manager';
const APP_VERSION = '1.0.0';
const DEBUG_MODE = true;

// Array constant to store supported languages.
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de'];

/*
 * Optional extension:
 * Multi-dimensional array constant for app configuration.
 */
const APP_CONFIG = [
    'timezone' => 'UTC',
    'cache' => [
        'enabled' => true,
        'ttl' => 300,
    ],
    'features' => [
        'registration' => true,
        'beta_dashboard' => false,
    ],
];

// Display DB constants.
function displayConfig(): void
{
    echo "===== Database Configuration =====\n";
    echo "Host: " . DB_HOST . "\n";
    echo "Username: " . DB_USERNAME . "\n";
    echo "Password: " . DB_PASSWORD . "\n";
    echo "Database: " . DB_NAME . "\n";
}

// Display app metadata constants.
function displayAppInfo(): void
{
    echo "===== App Information =====\n";
    echo "App Name: " . APP_NAME . "\n";
    echo "App Version: " . APP_VERSION . "\n";
    echo "Debug Mode: " . (DEBUG_MODE ? 'Enabled' : 'Disabled') . "\n";
}

// Display one-dimensional array constant values.
function displaySupportedLanguages(): void
{
    echo "===== Supported Languages =====\n";
    echo "Supported Languages: " . implode(', ', SUPPORTED_LANGUAGES) . "\n";
    echo "Primary Language: " . SUPPORTED_LANGUAGES[0] . "\n";
}

// Demonstrates constants are available inside function scope without using global.
function demonstrateGlobalScopeAccess(): void
{
    echo "===== Global Scope Demo =====\n";
    echo "Inside function - APP_NAME: " . APP_NAME . "\n";
    echo "Inside function - DB_HOST: " . DB_HOST . "\n";
}

// Demonstrates complex array constant access.
function configureApplication(): void
{
    echo "===== App Configuration Demo =====\n";
    $cacheStatus = APP_CONFIG['cache']['enabled'] ? 'enabled' : 'disabled';
    $ttl = APP_CONFIG['cache']['ttl'];
    $timezone = APP_CONFIG['timezone'];

    echo "Configured timezone: {$timezone}\n";
    echo "Cache is {$cacheStatus} (TTL: {$ttl} seconds)\n";
}

// Demonstrates case-sensitivity differences across PHP versions.
function demonstrateCaseSensitivity(): void
{
    echo "===== Case-Sensitivity Demo =====\n";
    echo "APP_NAME: " . APP_NAME . "\n";

    // In PHP 8+, undefined constants throw an Error (catchable as Throwable).
    // In older PHP versions, undefined constants could be treated as strings with notices.
    try {
        echo "app_name: " . app_name . "\n";
    } catch (Throwable $exception) {
        echo "app_name access failed: " . $exception->getMessage() . "\n";
    }
}

// Demonstrates error handling around constant redefinition attempts.
function demonstrateRedefinitionHandling(): void
{
    echo "===== Redefinition Demo =====\n";

    // Convert warnings/notices to exceptions so try-catch can handle them.
    set_error_handler(
        static function (int $severity, string $message, string $file, int $line): bool {
            throw new ErrorException($message, 0, $severity, $file, $line);
        }
    );

    try {
        define('APP_NAME', 'Another Name');
        echo "Redefinition attempted with no throwable error.\n";
    } catch (Throwable $exception) {
        echo "Redefinition failed as expected: " . $exception->getMessage() . "\n";
    } finally {
        restore_error_handler();
    }

    echo "APP_NAME remains: " . APP_NAME . "\n";
}

// Main execution area: call display functions to demonstrate constant access.
displayConfig();
echo str_repeat('-', 40) . "\n";
displayAppInfo();
echo str_repeat('-', 40) . "\n";
displaySupportedLanguages();
echo str_repeat('-', 40) . "\n";

// Show direct array constant access in the main execution flow.
echo "===== Main Array Constant Access =====\n";
echo "Feature registration enabled: " . (APP_CONFIG['features']['registration'] ? 'Yes' : 'No') . "\n";
echo "Beta dashboard enabled: " . (APP_CONFIG['features']['beta_dashboard'] ? 'Yes' : 'No') . "\n";
echo str_repeat('-', 40) . "\n";

demonstrateGlobalScopeAccess();
echo str_repeat('-', 40) . "\n";
configureApplication();
echo str_repeat('-', 40) . "\n";
demonstrateCaseSensitivity();
echo str_repeat('-', 40) . "\n";
demonstrateRedefinitionHandling();