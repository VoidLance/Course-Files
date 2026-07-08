<?php require $rootPath . '/templates/partials/header.php'; ?>
// Starter note: This file handles eckout  > review - straightforward on purpose.
<section class="card p-4">
    <h1 class="h3 mb-3">Checkout: Review</h1>

    <div class="table-responsive mb-3">
        <table class="table table-striped align-middle">
            <thead><tr><th>Product</th><th>Qty</th><th>Total</th></tr></thead>
            <tbody>
            <?php foreach ($reviewData['cart']['items'] as $item): ?>
                <tr>
                    <td><?= e($item['product']['product_name']); ?></td>
                    <td><?= (int) $item['quantity']; ?></td>
                    <td><?= e(money((float) $item['line_total'])); ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between"><span>Subtotal</span><strong><?= e(money((float) $reviewData['cart']['subtotal'])); ?></strong></li>
        <li class="list-group-item d-flex justify-content-between"><span>Discount</span><strong>-<?= e(money((float) $reviewData['discount_amount'])); ?></strong></li>
        <li class="list-group-item d-flex justify-content-between"><span>Tax</span><strong><?= e(money((float) $reviewData['tax_amount'])); ?></strong></li>
        <li class="list-group-item d-flex justify-content-between"><span>Shipping</span><strong><?= e(money((float) $reviewData['shipping_amount'])); ?></strong></li>
        <li class="list-group-item d-flex justify-content-between"><span>Total</span><strong><?= e(money((float) $reviewData['total_amount'])); ?></strong></li>
    </ul>

    <form method="POST" action="<?= e(base_url('checkout/process.php')); ?>" class="mb-3">
        <?= csrf_field(); ?>
        <button class="btn btn-primary" type="submit">Place Order (Manual)</button>
    </form>

    <?php if (!empty($paypalConfig['client_id'])): ?>
        <div id="paypal-button-container"></div>
        <script src="https://www.paypal.com/sdk/js?client-id=<?= e($paypalConfig['client_id']); ?>&currency=USD"></script>
        <script>
        paypal.Buttons({
            createOrder: function () {
                return fetch('<?= e(base_url('checkout/paypal-create-order.php')); ?>', { method: 'post' })
                    .then((res) => res.json())
                    .then((data) => data.order.id);
            },
            onApprove: function (data) {
                const formData = new URLSearchParams();
                formData.append('paypal_order_id', data.orderID);
                return fetch('<?= e(base_url('checkout/paypal-capture-order.php')); ?>', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                })
                .then((res) => res.json())
                .then((payload) => {
                    if (payload.ok) {
                        window.location.href = '<?= e(base_url('checkout/confirmation.php')); ?>';
                    }
                });
            },
            onCancel: function () {
                window.location.href = '<?= e(base_url('checkout/review.php')); ?>';
            }
        }).render('#paypal-button-container');
        </script>
    <?php endif; ?>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
