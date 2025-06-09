import React from 'react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategorySelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<any>;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 text-left"
          >
            <div className="flex items-center space-x-4 mb-3">
              <div className={`p-3 ${category.color} rounded-xl`}>
                {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.promptCount} prompts
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {category.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryGrid;