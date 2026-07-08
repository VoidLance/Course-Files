<?php

declare(strict_types=1);
// Starter note: This file handles SearchController - straightforward on purpose.

final class SearchController
{
	public function __construct(private SearchService $searchService)
	{
	}

	public function filters(array $input): array
	{
		return $this->searchService->normalize($input);
	}
}
