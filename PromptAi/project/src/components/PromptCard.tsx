import React from 'react';
import { Heart, Copy, Star, Eye, User, Calendar } from 'lucide-react';
import { Prompt } from '../types';
import { useApp } from '../context/AppContext';

interface PromptCardProps {
  prompt: Prompt;
  onSelect?: (prompt: Prompt) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onSelect }) => {
  const { favorites, toggleFavorite, isAuthenticated } = useApp();
  const isFavorited = favorites.includes(prompt.id);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      // In a real app, you'd show a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      toggleFavorite(prompt.id);
    }
  };

  return (
    <div
      onClick={() => onSelect?.(prompt)}
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {prompt.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {prompt.description}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            title="Copy prompt"
          >
            <Copy className="h-4 w-4" />
          </button>
          {isAuthenticated && (
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isFavorited
                  ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
              title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
          >
            #{tag}
          </span>
        ))}
        {prompt.tags.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
            +{prompt.tags.length - 3} more
          </span>
        )}
      </div>

      {/* AI Models */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.aiModel.map((model) => (
          <span
            key={model}
            className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-md font-medium"
          >
            {model}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-current text-yellow-400" />
            <span>{prompt.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{prompt.usage}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3" />
          <span>{prompt.author}</span>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;