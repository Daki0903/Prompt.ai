import React, { useState, useMemo } from 'react';
import { Filter, Search, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PromptCard from './PromptCard';
import PromptModal from './PromptModal';
import CategoryGrid from './CategoryGrid';
import { categories } from '../data/mockData';
import { Prompt, SearchFilters } from '../types';

interface PromptLibraryProps {
  selectedCategory?: string;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({ selectedCategory }) => {
  const { prompts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showCategories, setShowCategories] = useState(!selectedCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SearchFilters>({
    category: selectedCategory,
    sortBy: 'popular'
  });

  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prompt =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(query)) ||
        prompt.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(prompt => prompt.category === filters.category);
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(prompt => prompt.rating >= filters.rating!);
    }

    // Apply AI model filter
    if (filters.aiModel) {
      filtered = filtered.filter(prompt => prompt.aiModel.includes(filters.aiModel!));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.usage - a.usage);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'usage':
        filtered.sort((a, b) => b.usage - a.usage);
        break;
    }

    return filtered;
  }, [prompts, searchQuery, filters]);

  const handleCategorySelect = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    setShowCategories(false);
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'popular' });
    setSearchQuery('');
    setShowCategories(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Prompt Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover {prompts.length}+ high-quality prompts for every use case
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts, tags, or categories..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <select
            value={filters.category || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value || undefined }))}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* AI Model Filter */}
          <select
            value={filters.aiModel || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, aiModel: e.target.value || undefined }))}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          >
            <option value="">All AI Models</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Claude">Claude</option>
            <option value="DALL-E">DALL-E</option>
            <option value="Midjourney">Midjourney</option>
            <option value="Stable Diffusion">Stable Diffusion</option>
          </select>

          {/* Sort Filter */}
          <select
            value={filters.sortBy || 'popular'}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="usage">Most Used</option>
          </select>

          {/* Clear Filters */}
          {(filters.category || filters.aiModel || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Categories Section */}
      {showCategories && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <CategoryGrid categories={categories} onCategorySelect={handleCategorySelect} />
        </div>
      )}

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {filters.category ? `${categories.find(c => c.id === filters.category)?.name} Prompts` : 'All Prompts'}
            <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
              ({filteredPrompts.length} results)
            </span>
          </h2>
        </div>

        {filteredPrompts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onSelect={setSelectedPrompt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No prompts found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>

      {/* Prompt Modal - Only render when selectedPrompt exists */}
      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          isOpen={true}
          onClose={() => setSelectedPrompt(null)}
        />
      )}
    </div>
  );
};

export default PromptLibrary;