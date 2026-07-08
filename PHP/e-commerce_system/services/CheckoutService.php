<?php

declare(strict_types=1);
// Checkout service. Business logic lives here instead of making a mess elsewhere.

final class CheckoutService
{
    public function __construct(
        private CartService $cartService,
        private ShippingService $shippingService,
        private CouponService $couponService,
        private Order $orderModel,
        private Coupon $couponModel
    )
    {
    }

    public function shippingState(): array
    {
        return $_SESSION['checkout']['shipping'] ?? [];
    }

    public function paymentState(): array
    {
        return $_SESSION['checkout']['payment'] ?? [];
    }

    public function saveShipping(array $input): array
    {
        $errors = validate_required($input, ['customer_email', 'recipient_name', 'line_one', 'city', 'state_region', 'postal_code', 'country_code', 'shipping_method']);
        if (!validate_email_address((string) ($input['customer_email'] ?? ''))) {
            $errors['customer_email'] = 'Please provide a valid email address.';
        }

        $method = $this->shippingService->find((string) ($input['shipping_method'] ?? ''));
        if ($method === null) {
            $errors['shipping_method'] = 'Please choose a shipping method.';
        }

        if ($errors !== []) {
            return ['ok' => false, 'errors' => $errors];
        }

        $_SESSION['checkout']['shipping'] = [
            'customer_email' => mb_strtolower(trim((string) $input['customer_email'])),
            'recipient_name' => trim((string) $input['recipient_name']),
            'line_one' => trim((string) $input['line_one']),
            'line_two' => trim((string) ($input['line_two'] ?? '')),
            'city' => trim((string) $input['city']),
            'state_region' => trim((string) $input['state_region']),
            'postal_code' => trim((string) $input['postal_code']),
            'country_code' => strtoupper(trim((string) $input['country_code'])),
            'phone' => trim((string) ($input['phone'] ?? '')),
            'shipping_method' => $method,
        ];

        return ['ok' => true];
    }

    public function savePayment(array $input): array
    {
        $method = (string) ($input['payment_method'] ?? 'paypal');
        if (!in_array($method, ['paypal'], true)) {
            return ['ok' => false, 'errors' => ['payment_method' => 'Invalid payment method selected.']];
        }

        $_SESSION['checkout']['payment'] = [
            'payment_method' => $method,
            'coupon_code' => trim((string) ($input['coupon_code'] ?? '')),
        ];

        return ['ok' => true];
    }

    public function review(): array
    {
        $cart = $this->cartService->getDetailedCart();
        $shipping = $this->shippingState();
        $payment = $this->paymentState();

        $shippingAmount = (float) ($shipping['shipping_method']['amount'] ?? 0.0);
        $couponResult = $this->couponService->resolve($payment['coupon_code'] ?? '', (float) $cart['subtotal']);
        $discountAmount = (float) ($couponResult['discount'] ?? 0.0);
        $taxAmount = round(max(0.0, ((float) $cart['subtotal'] - $discountAmount) * 0.10), 2);
        $total = round(max(0.0, (float) $cart['subtotal'] - $discountAmount + $taxAmount + $shippingAmount), 2);

        return [
            'cart' => $cart,
            'shipping' => $shipping,
            'payment' => $payment,
            'coupon' => $couponResult['coupon'] ?? null,
            'discount_amount' => $discountAmount,
            'shipping_amount' => $shippingAmount,
            'tax_amount' => $taxAmount,
            'total_amount' => $total,
        ];
    }

    public function placeOrder(?string $paypalOrderId = null, ?string $paypalCaptureId = null): ?int
    {
        $review = $this->review();
        if (($review['cart']['items'] ?? []) === [] || ($review['shipping'] ?? []) === [] || ($review['payment'] ?? []) === []) {
            return null;
        }

        $orderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
        $shipping = $review['shipping'];
        $userId = is_logged_in() ? (int) $_SESSION['user_id'] : null;

        $orderData = [
            'user_id' => $userId,
            'order_number' => $orderNumber,
            'customer_email' => $shipping['customer_email'],
            'status' => $paypalCaptureId ? 'paid' : 'pending',
            'payment_status' => $paypalCaptureId ? 'paid' : 'pending',
            'shipping_method' => $shipping['shipping_method']['name'],
            'shipping_amount' => $review['shipping_amount'],
            'tax_amount' => $review['tax_amount'],
            'discount_amount' => $review['discount_amount'],
            'subtotal_amount' => $review['cart']['subtotal'],
            'total_amount' => $review['total_amount'],
            'coupon_code' => $review['coupon']['code'] ?? null,
            'shipping_address_json' => json_encode($shipping, JSON_THROW_ON_ERROR),
            'billing_address_json' => json_encode($shipping, JSON_THROW_ON_ERROR),
            'notes' => null,
        ];

        $items = [];
        foreach ($review['cart']['items'] as $item) {
            $items[] = [
                'product_id' => (int) $item['product']['product_id'],
                'sku' => (string) $item['product']['sku'],
                'product_name' => (string) $item['product']['product_name'],
                'quantity' => (int) $item['quantity'],
                'unit_price' => (float) $item['product']['price'],
                'line_total' => (float) $item['line_total'],
            ];
        }

        $orderId = $this->orderModel->create($orderData, $items);
        $this->orderModel->setPayPalReferences($orderId, $paypalOrderId, $paypalCaptureId);

        if (($review['coupon']['coupon_id'] ?? null) !== null) {
            $this->couponModel->incrementUsage((int) $review['coupon']['coupon_id'], $userId, $orderId);
        }

        unset($_SESSION['checkout']);
        $_SESSION['last_order_id'] = $orderId;

        return $orderId;
    }
}
