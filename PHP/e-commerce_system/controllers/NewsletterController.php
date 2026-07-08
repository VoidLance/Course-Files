<?php

declare(strict_types=1);
// Newsletter controller. Mostly traffic control so the app does not wander off.

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
