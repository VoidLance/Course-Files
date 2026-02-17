import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type UseCategorySelectionArgs<Category extends string> = {
  selectedCategories: Category[];
  setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
  maxSelected?: number;
};

type UseCategorySelectionResult<Category extends string> = {
  handleCategoryToggle: (category: Category) => void;
  clearCategories: () => void;
  isSelected: (category: Category) => boolean;
  canSelectMore: boolean;
  maxSelected: number;
};

export const useCategorySelection = <Category extends string>({
  selectedCategories,
  setSelectedCategories,
  maxSelected = 3,
}: UseCategorySelectionArgs<Category>): UseCategorySelectionResult<Category> => {
  const handleCategoryToggle = useCallback(
    (category: Category) => {
      setSelectedCategories((prev) => {
        if (prev.includes(category)) {
          return prev.filter((item) => item !== category);
        }
        if (prev.length >= maxSelected) {
          return prev;
        }
        return [...prev, category];
      });
    },
    [maxSelected, setSelectedCategories],
  );

  const clearCategories = useCallback(() => {
    setSelectedCategories([]);
  }, [setSelectedCategories]);

  const isSelected = useCallback(
    (category: Category) => selectedCategories.includes(category),
    [selectedCategories],
  );

  return {
    handleCategoryToggle,
    clearCategories,
    isSelected,
    canSelectMore: selectedCategories.length < maxSelected,
    maxSelected,
  };
};
