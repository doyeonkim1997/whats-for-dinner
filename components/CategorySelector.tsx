import React from 'react';
import { Category } from '../types';

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
  disabled: boolean;
}

const categories: Category[] = ['전체', '한식', '중식', '일식', '양식', '분식', '면요리', '밥요리', '국물요리', '야식'];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect, disabled }) => {
  return (
    <div className="w-full max-w-2xl flex flex-wrap justify-center gap-2 mb-8 px-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border
            ${selected === cat
              ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
              : 'bg-white text-slate-500 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};