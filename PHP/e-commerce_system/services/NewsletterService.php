<?php

declare(strict_types=1);

final class NewsletterService
{
    public function __construct(private mysqli $connection)
    {
    }
}
