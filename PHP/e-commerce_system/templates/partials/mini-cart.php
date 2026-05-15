<div class="mini-cart">
    <a href="<?= e(base_url('cart/index.php')); ?>">Cart (<?= (int) ($cartSummary['item_count'] ?? 0); ?>)</a>
    <span><?= e(money((float) ($cartSummary['subtotal'] ?? 0.0))); ?></span>
</div>
