<?php

declare(strict_types=1);

final class OrderService
{
    public function __construct(private mysqli $connection)
    {
    }
}
