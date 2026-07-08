<?php
// Starter note: This file handles rt  > index - straightforward on purpose.
$pageTitle = 'Shopping Cart';
require $rootPath . '/templates/partials/header.php';
?>
<section class="cart-page">
    <h1>Shopping Cart</h1>
    <?php if ($items === []): ?>
        <p>Your cart is empty.</p>
    <?php else: ?>
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($items as $item): ?>
                    <tr>
                        <td><?= e($item['product']['product_name']); ?></td>
                        <td><?= e(money((float) $item['product']['price'])); ?></td>
                        <td>
                            <form method="POST" action="<?= e(base_url('cart/update.php')); ?>" class="cart-inline-form">
                                <?= csrf_field(); ?>
                                <input type="hidden" name="product_id" value="<?= (int) $item['product']['product_id']; ?>">
                                <input type="number" name="quantity" min="0" max="<?= max(0, (int) $item['product']['stock_quantity']); ?>" value="<?= (int) $item['quantity']; ?>">
                                <button class="btn btn-view" type="submit">Update</button>
                            </form>
                        </td>
                        <td><?= e(money((float) $item['line_total'])); ?></td>
                        <td>
                            <form method="POST" action="<?= e(base_url('cart/remove.php')); ?>">
                                <?= csrf_field(); ?>
                                <input type="hidden" name="product_id" value="<?= (int) $item['product']['product_id']; ?>">
                                <button class="btn btn-remove" type="submit">Remove</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <div class="cart-summary">
            <p><strong>Items:</strong> <?= (int) $item_count; ?></p>
            <p><strong>Subtotal:</strong> <?= e(money((float) $subtotal)); ?></p>
            <p><strong>Discount:</strong> -<?= e(money((float) $discount)); ?></p>
            <p><strong>Estimated Tax:</strong> <?= e(money((float) $estimated_tax)); ?></p>
            <p><strong>Estimated Shipping:</strong> <?= e(money((float) $estimated_shipping)); ?></p>
            <p><strong>Grand Total:</strong> <?= e(money((float) $grand_total)); ?></p>
            <a class="btn btn-cart" href="<?= e(base_url('checkout/shipping.php')); ?>">Proceed to Checkout</a>
        </div>
    <?php endif; ?>
</section>
<?php require $rootPath . '/templates/partials/footer.php'; ?>
