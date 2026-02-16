import React from "react";
import "./FormButton.css";

type FormButtonProps = {
  value: string;
  selectCategory: (value: string) => void;
  isSelected?: boolean;
  disabled?: boolean;
};

export const FormButton: React.FC<FormButtonProps> = ({
  value,
  selectCategory,
  isSelected = false,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`category-button${isSelected ? " category-button--selected" : ""}`}
      onClick={() => selectCategory(value)}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

