<?php

declare(strict_types=1);
// Pay pal service. Business logic lives here instead of making a mess elsewhere.

final class PayPalService
{
    public function __construct(private array $config)
    {
    }

    public function createOrder(float $amount, string $currencyCode = 'USD'): array
    {
        $payload = [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => $currencyCode,
                        'value' => number_format($amount, 2, '.', ''),
                    ],
                ],
            ],
        ];

        return $this->apiRequest('POST', '/v2/checkout/orders', $payload);
    }

    public function captureOrder(string $paypalOrderId): array
    {
        return $this->apiRequest('POST', '/v2/checkout/orders/' . rawurlencode($paypalOrderId) . '/capture');
    }

    private function apiRequest(string $method, string $path, ?array $payload = null): array
    {
        $token = $this->accessToken();
        $ch = curl_init();
        $url = rtrim((string) ($this->config['base_url'] ?? ''), '/') . $path;

        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token,
        ];

        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 30,
        ]);

        if ($payload !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload, JSON_THROW_ON_ERROR));
        }

        $response = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false || $error !== '') {
            throw new RuntimeException('PayPal request failed: ' . $error);
        }

        $decoded = json_decode($response, true);
        if (!is_array($decoded)) {
            throw new RuntimeException('Invalid PayPal response.');
        }

        if ($status < 200 || $status >= 300) {
            throw new RuntimeException('PayPal API error: ' . ($decoded['message'] ?? 'Unknown error'));
        }

        return $decoded;
    }

    private function accessToken(): string
    {
        $clientId = (string) ($this->config['client_id'] ?? '');
        $clientSecret = (string) ($this->config['client_secret'] ?? '');

        if ($clientId === '' || $clientSecret === '') {
            throw new RuntimeException('PayPal credentials are missing in config/paypal.php.');
        }

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => rtrim((string) $this->config['base_url'], '/') . '/v1/oauth2/token',
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => 'grant_type=client_credentials',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_USERPWD => $clientId . ':' . $clientSecret,
            CURLOPT_HTTPHEADER => ['Accept: application/json', 'Accept-Language: en_US'],
            CURLOPT_TIMEOUT => 30,
        ]);

        $response = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false || $error !== '') {
            throw new RuntimeException('Failed to authenticate PayPal request: ' . $error);
        }

        $decoded = json_decode($response, true);
        if (!is_array($decoded) || $status < 200 || $status >= 300 || empty($decoded['access_token'])) {
            throw new RuntimeException('Unable to retrieve PayPal access token.');
        }

        return (string) $decoded['access_token'];
    }
}
