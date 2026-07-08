<?php

declare(strict_types=1);
// Starter note: This file handles oiceService - straightforward on purpose.

final class InvoiceService
{
    public function generate(array $order, array $items): string
    {
        $lines = [];
        $lines[] = 'Invoice: ' . (string) $order['order_number'];
        $lines[] = 'Date: ' . (string) $order['created_at'];
        $lines[] = 'Customer: ' . (string) $order['customer_email'];
        $lines[] = '';
        $lines[] = 'Items:';

        foreach ($items as $item) {
            $lines[] = sprintf(
                '%s x%d @ %0.2f = %0.2f',
                (string) $item['product_name'],
                (int) $item['quantity'],
                (float) $item['unit_price'],
                (float) $item['line_total']
            );
        }

        $lines[] = '';
        $lines[] = 'Subtotal: ' . number_format((float) $order['subtotal_amount'], 2);
        $lines[] = 'Discount: ' . number_format((float) $order['discount_amount'], 2);
        $lines[] = 'Tax: ' . number_format((float) $order['tax_amount'], 2);
        $lines[] = 'Shipping: ' . number_format((float) $order['shipping_amount'], 2);
        $lines[] = 'Total: ' . number_format((float) $order['total_amount'], 2);

        $text = implode("\n", $lines);

        return $this->pdfFromText($text);
    }

    private function pdfFromText(string $text): string
    {
        $escaped = str_replace(['\\', '(', ')', "\r"], ['\\\\', '\\(', '\\)', ''], $text);
        $content = "BT /F1 11 Tf 40 780 Td 13 TL (" . str_replace("\n", ') Tj T* (', $escaped) . ") Tj ET";

        $objects = [];
        $objects[] = '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj';
        $objects[] = '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj';
        $objects[] = '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj';
        $objects[] = '4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj';
        $objects[] = '5 0 obj << /Length ' . strlen($content) . ' >> stream\n' . $content . '\nendstream endobj';

        $pdf = "%PDF-1.4\n";
        $offsets = [0];

        foreach ($objects as $object) {
            $offsets[] = strlen($pdf);
            $pdf .= $object . "\n";
        }

        $xrefOffset = strlen($pdf);
        $pdf .= 'xref\n0 ' . (count($objects) + 1) . "\n";
        $pdf .= "0000000000 65535 f \n";

        for ($i = 1; $i <= count($objects); $i++) {
            $pdf .= sprintf('%010d 00000 n ', $offsets[$i]) . "\n";
        }

        $pdf .= 'trailer << /Size ' . (count($objects) + 1) . ' /Root 1 0 R >>\n';
        $pdf .= 'startxref\n' . $xrefOffset . "\n%%EOF";

        return $pdf;
    }
}
