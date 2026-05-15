<?php

declare(strict_types=1);

final class Order
{
    public function __construct(private mysqli $connection)
    {
    }
}
