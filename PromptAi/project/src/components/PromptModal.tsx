import React, { useState } from 'react';
import { X, Copy, Heart, Star, Eye, User, Calendar } from 'lucide-react';
import { Prompt } from '../types';
import { useApp } from '../context/AppContext';

interface PromptModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, isOpen, onClose }) => {
  const { favorites, toggleFavorite, isAuthenticated } = useApp();
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [processedContent, setProcessedContent] = useState(prompt.content);
  const isFavorited = favorites.includes(prompt.id);

  React.useEffect(() => {
    if (isOpen) {
      let content = prompt.content;
      Object.entries(variables).forEach(([key, value]) => {
        if (value.trim()) {
          content = content.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
      });
      setProcessedContent(content);
    }
  }, [variables, prompt.content, isOpen]);

  const handleVariableChange = (name: string, value: string) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedContent);
      // In a real app, you'd show a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleFavorite = () => {
    if (isAuthenticated) {
      toggleFavorite(prompt.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {prompt.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {prompt.description}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-6">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
              {isAuthenticated && (
                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isFavorited
                      ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Variables */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Customize Variables
                  </h3>
                  {prompt.variables.length > 0 ? (
                    <div className="space-y-4">
                      {prompt.variables.map((variable) => (
                        <div key={variable.name}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {variable.name.charAt(0).toUpperCase() + variable.name.slice(1)}
                            {variable.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          <input
                            type="text"
                            placeholder={variable.placeholder}
                            value={variables[variable.name] || ''}
                            onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      This prompt doesn't have any customizable variables.
                    </p>
                  )}
                </div>

                {/* Metadata */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Prompt Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Category:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {prompt.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {prompt.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Usage:</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {prompt.usage}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Author:</span>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {prompt.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Models */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Compatible AI Models</h4>
                  <div className="flex flex-wrap gap-2">
                    {prompt.aiModel.map((model) => (
                      <span
                        key={model}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-lg font-medium"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Prompt Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Prompt Preview
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                    {processedContent}
                  </pre>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Fill in the variables on the left to customize this prompt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;