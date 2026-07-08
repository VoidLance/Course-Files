<?php

declare(strict_types=1);
// Newsletter service. Business logic lives here instead of making a mess elsewhere.

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
