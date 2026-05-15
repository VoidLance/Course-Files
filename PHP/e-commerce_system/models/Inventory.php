<?php

declare(strict_types=1);

final class Inventory
{
    public function __construct(private mysqli $connection)
    {
    }
}
