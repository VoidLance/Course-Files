<?php

declare(strict_types=1);

final class User
{
    public function __construct(private mysqli $connection)
    {
    }
}
