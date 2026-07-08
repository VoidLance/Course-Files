<?php

declare(strict_types=1);
// Search controller. Mostly traffic control so the app does not wander off.

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
