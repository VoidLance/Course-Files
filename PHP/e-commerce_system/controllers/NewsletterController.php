<?php

declare(strict_types=1);
// Starter note: This file handles NewsletterController - straightforward on purpose.

final class NewsletterController
{
	public function __construct(private NewsletterService $newsletterService)
	{
	}

	public function subscribe(string $email): bool
	{
		return $this->newsletterService->subscribe($email);
	}
}
