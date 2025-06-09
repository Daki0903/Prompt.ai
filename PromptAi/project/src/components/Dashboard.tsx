import React from 'react';
import { TrendingUp, Users, Star, Zap, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PromptCard from './PromptCard';
import CategoryGrid from './CategoryGrid';
import { categories, prompts } from '../data/mockData';

interface DashboardProps {
  onSectionChange: (section: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange, onCategorySelect }) => {
  const { user, isAuthenticated } = useApp();
  
  const stats = [
    { label: 'Total Prompts', value: '2,156', icon: Star, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Active Users', value: '12,849', icon: Users, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Generated Today', value: '4,327', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Success Rate', value: '94.2%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  const topPrompts = prompts.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Welcome to SmartPrompt AI'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover, create, and optimize AI prompts for better results.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 flex space-x-4">
            <button
              onClick={() => onSectionChange('generator')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Zap className="h-5 w-5" />
              <span>Generate Prompt</span>
            </button>
            <button
              onClick={() => onSectionChange('library')}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Browse Library
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className={`p-3 ${stat.bg} rounded-xl`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Categories Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Categories</h2>
          <button
            onClick={() => onSectionChange('library')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
          >
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <CategoryGrid categories={categories} onCategorySelect={onCategorySelect} />
      </div>

      {/* Top Prompts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Prompts</h2>
          <button
            onClick={() => onSectionChange('library')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
          >
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {topPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;