<?php

declare(strict_types=1);
// Starter note: This file handles sletterService - straightforward on purpose.

final class NewsletterService
{
    public function __construct(private NewsletterSubscriber $subscriberModel)
    {
    }

    public function subscribe(string $email): bool
    {
        if (!validate_email_address($email)) {
            return false;
        }

        return $this->subscriberModel->subscribe(mb_strtolower(trim($email)), 'site');
    }
}
