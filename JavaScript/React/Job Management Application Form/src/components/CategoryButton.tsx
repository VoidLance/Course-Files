import React from "react";
import "./CategoryButton.css";

type CategoryButtonProps = {
  value: string;
  selectCategory: (value: string) => void;
  isSelected?: boolean;
  disabled?: boolean;
  categoryColor?: string;
};

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  value,
  selectCategory,
  isSelected = false,
  disabled = false,
  categoryColor = "#0b4b59",
}) => {
  return (
    <button
      type="button"
      className={`category-button${isSelected ? " category-button--selected" : ""}`}
      style={{ backgroundColor: categoryColor, borderColor: categoryColor }}
      onClick={() => selectCategory(value)}
      disabled={disabled}
    >
      {value}
    </button>
  );
};
