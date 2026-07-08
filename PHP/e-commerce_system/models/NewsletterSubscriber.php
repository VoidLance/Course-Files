<?php

declare(strict_types=1);
// Starter note: This file handles etterSubscriber - straightforward on purpose.

final class NewsletterSubscriber
{
    public function __construct(private mysqli $connection)
    {
    }

    public function subscribe(string $email, string $source = 'site'): bool
    {
        $statement = $this->connection->prepare('INSERT INTO newsletter_subscribers (email, source, unsubscribed_at) VALUES (?, ?, NULL) ON DUPLICATE KEY UPDATE unsubscribed_at = NULL, source = VALUES(source)');
        if ($statement === false) {
            throw new RuntimeException('Failed to prepare newsletter subscribe query.');
        }

        $statement->bind_param('ss', $email, $source);
        $ok = $statement->execute();
        $statement->close();

        return $ok;
    }
}
