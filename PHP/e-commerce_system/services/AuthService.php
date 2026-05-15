<?php

declare(strict_types=1);

final class AuthService
{
    public function __construct(private mysqli $connection)
    {
    }
}
