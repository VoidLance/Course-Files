<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <style>
        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, sans-serif;
            background: linear-gradient(135deg, #f5f7fa, #e4edf9);
            color: #1f2937;
            padding: 24px;
        }

        .bill-card {
            max-width: 900px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #d8e2f0;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(10, 36, 99, 0.08);
            overflow: hidden;
        }

        .bill-header {
            padding: 20px 24px;
            background: #0f4c81;
            color: #ffffff;
        }

        .bill-header h1 {
            margin: 0 0 8px;
            font-size: 1.8rem;
        }

        .bill-header p {
            margin: 4px 0;
            opacity: 0.95;
        }

        .content {
            padding: 20px 24px 24px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
            font-size: 0.95rem;
        }

        thead {
            background: #eff5ff;
        }

        th,
        td {
            border: 1px solid #dbe7f8;
            padding: 10px;
            text-align: left;
        }

        .money {
            text-align: right;
            font-variant-numeric: tabular-nums;
        }

        .discount {
            color: #b42318;
            font-weight: 600;
        }

        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
            margin-top: 14px;
        }

        .summary-card {
            border: 1px solid #dbe7f8;
            border-radius: 10px;
            padding: 12px;
            background: #f9fbff;
        }

        .summary-card strong {
            display: block;
            margin-bottom: 6px;
        }

        .total {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0f4c81;
        }

        .errors {
            margin: 0 0 14px;
            padding: 10px 14px;
            background: #fff4f2;
            border: 1px solid #f9c8c1;
            border-radius: 10px;
            color: #7a1d13;
        }
    </style>
</head>
<body>
    <?php
    // Product list for the cart.
    $products = [
        ['name' => 'Product 1', 'price' => 10, 'quantity' => 5],
        ['name' => 'Product 2', 'price' => 20, 'quantity' => 1],
        ['name' => 'Product 3', 'price' => 30, 'quantity' => 2],
    ];

    /*
     * Calculate item totals and collect values for summary math operations.
     * Also perform basic validation to handle negative quantities.
     */
    $itemized = [];
    $lineTotals = [];
    $errors = [];
    $discountThreshold = 100;
    $discountRate = 0;

    foreach ($products as $product) {
        if (!is_numeric($product['quantity']) || $product['quantity'] < 0) {
            $errors[] = "Invalid quantity for {$product['name']} (must be 0 or greater).";
            continue;
        }

        $lineTotal = $product['price'] * $product['quantity'];
        $itemized[] = [
            'name' => $product['name'],
            'price' => $product['price'],
            'quantity' => $product['quantity'],
            'line_total' => $lineTotal,
        ];
        $lineTotals[] = $lineTotal;
    }

    if (array_sum($lineTotals) > $discountThreshold) {
        $discountRate = 0.10;
    }

    // Apply discount per item so the bill shows exactly where savings come from.
    foreach ($itemized as $key => $item) {
        $itemDiscount = $item['line_total'] * $discountRate;
        $itemized[$key]['discount_amount'] = round($itemDiscount, 2);
        $itemized[$key]['discounted_total'] = round($item['line_total'] - $itemDiscount, 2);
    }

    $subtotal = array_sum($lineTotals);
    $discount = 0;
    foreach ($itemized as $item) {
        $discount += $item['discount_amount'];
    }

    // Use round() for a clean final total value.
    $finalTotal = round($subtotal - $discount, 2);

    // Use max() and min() to find most/least expensive line totals.
    $highestLineTotal = !empty($lineTotals) ? max($lineTotals) : 0;
    $lowestLineTotal = !empty($lineTotals) ? min($lineTotals) : 0;

    // Use rand() to generate a random order number.
    $orderNumber = rand(100000, 999999);
    ?>

    <div class="bill-card">
        <div class="bill-header">
            <h1>Shopping Cart</h1>
            <p>Order Number: <?= $orderNumber; ?></p>
            <p>Discount Rule: 10% off each item when the subtotal exceeds $<?= number_format($discountThreshold, 2); ?></p>
            <p>
                Subtotal: $<?= number_format($subtotal, 2); ?> &mdash;
                <?= $discountRate > 0
                    ? 'threshold exceeded, 10% discount applied to every line item'
                    : 'threshold not reached, no discount applied'; ?>
            </p>
        </div>

        <div class="content">
            <?php if (!empty($errors)): ?>
                <div class="errors">
                    <strong>Input Errors</strong>
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?= $error; ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Line Total</th>
                        <th>Discount (10% of line total)</th>
                        <th>Total After Discount</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($itemized as $item): ?>
                        <tr>
                            <td><?= $item['name']; ?></td>
                            <td class="money">$<?= number_format($item['price'], 2); ?></td>
                            <td><?= $item['quantity']; ?></td>
                            <td class="money">$<?= number_format($item['line_total'], 2); ?></td>
                            <td class="money discount">-$<?= number_format($item['discount_amount'], 2); ?></td>
                            <td class="money">$<?= number_format($item['discounted_total'], 2); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <div class="summary">
                <div class="summary-card">
                    <strong>Subtotal</strong>
                    <span>$<?= number_format($subtotal, 2); ?></span>
                </div>
                <div class="summary-card">
                    <strong>Total Discount</strong>
                    <span class="discount">-$<?= number_format($discount, 2); ?></span>
                </div>
                <div class="summary-card">
                    <strong>Final Total</strong>
                    <span class="total">$<?= number_format($finalTotal, 2); ?></span>
                </div>
                <div class="summary-card">
                    <strong>Highest Line Item</strong>
                    <span>$<?= number_format($highestLineTotal, 2); ?></span>
                </div>
                <div class="summary-card">
                    <strong>Lowest Line Item</strong>
                    <span>$<?= number_format($lowestLineTotal, 2); ?></span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>