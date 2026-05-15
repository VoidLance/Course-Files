<?php

declare(strict_types=1);

final class PaymentMethod
{
    public function __construct(private mysqli $connection)
    {
    }
}
