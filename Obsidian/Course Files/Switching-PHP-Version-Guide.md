# Switching PHP Versions on Linux

This guide explains how to switch PHP versions for:
- Command line (CLI)
- Web server (Apache or PHP-FPM)

## 1) Check current PHP version

Run:

```bash
php -v
which php
```

## 2) See installed PHP versions

On Debian/Ubuntu systems:

```bash
ls /usr/bin/php*
update-alternatives --list php
```

If `update-alternatives` is not configured yet, you can still switch by setting it up in step 3.

## 3) Switch CLI PHP version with update-alternatives

### A) Register versions (only if needed)

Example for PHP 8.1 and 8.3:

```bash
sudo update-alternatives --install /usr/bin/php php /usr/bin/php8.1 81
sudo update-alternatives --install /usr/bin/php php /usr/bin/php8.3 83
```

### B) Choose active version

```bash
sudo update-alternatives --config php
```

Select the number for the PHP version you want.

### C) Verify

```bash
php -v
```

## 4) Switch Apache PHP module (if using mod_php)

Disable old version, enable new version, then restart Apache.

Example: switch from 8.1 to 8.3

```bash
sudo a2dismod php8.1
sudo a2enmod php8.3
sudo systemctl restart apache2
```

Verify from browser using a `phpinfo()` page.

## 5) Switch PHP-FPM version (if using Nginx or Apache with FPM)

### A) Enable/start target PHP-FPM service

```bash
sudo systemctl enable --now php8.3-fpm
```

### B) Update your web server config socket/path

Typical socket example:

```text
/run/php/php8.3-fpm.sock
```

### C) Reload web server

```bash
sudo systemctl reload nginx
# or
sudo systemctl reload apache2
```

## 6) Confirm web PHP version

Create a file such as `info.php` in your web root:

```php
<?php phpinfo();
```

Open it in your browser and check the version shown.

## 7) Common issues

- CLI changed but website did not: your web server is using a different PHP handler (mod_php or FPM).
- Command not found for `php8.x`: install that version first, for example:

```bash
sudo apt update
sudo apt install php8.3 php8.3-cli php8.3-fpm
```

- Extensions missing after switch: install extensions for the selected version, for example:

```bash
sudo apt install php8.3-mysql php8.3-xml php8.3-curl
```

## 8) Quick reference

```bash
# Show current CLI PHP
php -v

# Choose CLI PHP
sudo update-alternatives --config php

# Apache module switch example
sudo a2dismod php8.1 && sudo a2enmod php8.3 && sudo systemctl restart apache2

# FPM service example
sudo systemctl enable --now php8.3-fpm
```

---
