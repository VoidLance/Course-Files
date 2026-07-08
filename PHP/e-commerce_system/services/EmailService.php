<?php

declare(strict_types=1);
// Starter note: This file handles ilService - straightforward on purpose.

final class EmailService
{
    public function __construct(private array $config)
    {
    }

    public function send(string $to, string $subject, string $body): bool
    {
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . ($this->config['from_name'] ?? 'Store') . ' <' . ($this->config['from_address'] ?? 'no-reply@example.com') . '>',
        ];

        $sent = @mail($to, $subject, $body, implode("\r\n", $headers));

        if (!$sent) {
            $logDir = dirname(__DIR__) . '/storage/logs';
            if (!is_dir($logDir)) {
                mkdir($logDir, 0775, true);
            }

            $entry = sprintf(
                "[%s] TO: %s SUBJECT: %s\n%s\n\n",
                date('c'),
                $to,
                $subject,
                $body
            );

            file_put_contents($logDir . '/email.log', $entry, FILE_APPEND);
        }

        return true;
    }
}
