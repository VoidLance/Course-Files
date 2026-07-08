<?php

declare(strict_types=1);
// Starter note: This file handles rchService - straightforward on purpose.

final class SearchService
{
    public function normalize(array $input): array
    {
        return [
            'category' => trim((string) ($input['category'] ?? '')),
            'subcategory' => trim((string) ($input['subcategory'] ?? '')),
            'search' => trim((string) ($input['search'] ?? '')),
            'min_price' => trim((string) ($input['min_price'] ?? '')),
            'max_price' => trim((string) ($input['max_price'] ?? '')),
            'sort' => in_array((string) ($input['sort'] ?? 'newest'), ['newest', 'price_asc', 'price_desc', 'popularity'], true)
                ? (string) $input['sort']
                : 'newest',
        ];
    }
}
