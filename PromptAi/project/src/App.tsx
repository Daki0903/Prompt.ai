import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard';
import AIGenerator from './components/AIGenerator';
import PromptLibrary from './components/PromptLibrary';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveSection('library');
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (section !== 'library') {
      setSelectedCategory(undefined);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard 
            onSectionChange={handleSectionChange}
            onCategorySelect={handleCategorySelect}
          />
        );
      case 'generator':
        return <AIGenerator />;
      case 'library':
        return <PromptLibrary selectedCategory={selectedCategory} />;
      case 'favorites':
        return <PromptLibrary selectedCategory={selectedCategory} />;
      case 'create':
        return <AIGenerator />;
      case 'analytics':
        return <Dashboard onSectionChange={handleSectionChange} onCategorySelect={handleCategorySelect} />;
      case 'profile':
        return <Dashboard onSectionChange={handleSectionChange} onCategorySelect={handleCategorySelect} />;
      default:
        return (
          <Dashboard 
            onSectionChange={handleSectionChange}
            onCategorySelect={handleCategorySelect}
          />
        );
    }
  };

  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <div className="flex">
            <Sidebar 
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
            <main className="flex-1 p-6 lg:p-8">
              {renderContent()}
            </main>
          </div>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;