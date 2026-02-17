import React from 'react';
import './AppForm.css';
import { CategoryButton } from './CategoryButton';

export const categoryStyles = {
  'Read Emails': '#ff8c00',
  'Send Emails': '#ffd700',
  'Parse Web': '#1e90ff',
};

interface CategorySelectorProps {
  filteredCategories: string[];
  selectCategory: (category: string) => void;
  isSelected: (category: string) => boolean;
  canSelectMore: boolean;
  clearCategories: () => void;
  selectedCategories: string[];
  maxSelected: number;
  categorySearch: string;
  setCategorySearch: (search: string) => void;
  formError?: string;
  setFormError?: (error: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  filteredCategories,
  selectCategory,
  isSelected,
  canSelectMore,
  clearCategories,
  selectedCategories,
  maxSelected,
  categorySearch,
  setCategorySearch,
  formError,
  setFormError,
}) => {
  const validateCategory = (category: string): boolean => {
    return selectedCategories.includes(category);
  };

  const handleSelectCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      selectCategory(cat);
    } else {
      if (!canSelectMore) {
        setFormError?.(`You can select up to ${maxSelected} categories.`);
        return;
      }
      selectCategory(cat);
    }
    setFormError?.('');
  };

  const handleClearCategories = () => {
    clearCategories();
    setFormError?.('');
  };

  return (
    <div className="form-field">
      <input
        type="text"
        className="bot-input category-search"
        placeholder="Search categories..."
        value={categorySearch}
        onChange={(event) => setCategorySearch(event.target.value)}
      />
      <div className="category-list">
        {filteredCategories.map((category) => (
          <CategoryButton
            key={category}
            value={category}
            selectCategory={handleSelectCategory}
            isSelected={isSelected(category)}
            disabled={!isSelected(category) && !canSelectMore}
            categoryColor={
              categoryStyles[category as keyof typeof categoryStyles] ||
              '#0b4b59'
            }
          />
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <div className="category-summary">
          <div className="category-summary-title">Selected categories:</div>
          <div className="category-tags">
            {selectedCategories.map((category) => (
              <span key={category} className="category-tag">
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="category-actions">
        <button
          type="button"
          className="category-clear"
          onClick={handleClearCategories}
          disabled={selectedCategories.length === 0}
        >
          Clear Categories
        </button>
        <div className="category-limit">Max {maxSelected} selections</div>
      </div>
    </div>
  );
};
