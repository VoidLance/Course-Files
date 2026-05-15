<?php

declare(strict_types=1);

final class Cart
{
    public function all(): array
    {
        return $_SESSION['cart'] ?? [];
    }

    public function put(array $items): void
    {
        $_SESSION['cart'] = $items;
    }

    public function clear(): void
    {
        unset($_SESSION['cart']);
    }
}
