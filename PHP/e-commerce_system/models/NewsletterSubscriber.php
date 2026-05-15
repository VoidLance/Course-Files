<?php

declare(strict_types=1);

final class NewsletterSubscriber
{
    public function __construct(private mysqli $connection)
    {
    }
}
