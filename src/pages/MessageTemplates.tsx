import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Template, templates, categories } from '../data/templates';

const MessageTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleTemplateSelect = (template: Template) => {
    navigate('/', { state: { template } });
  };

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-purple-900 hover:text-purple-700 transition-colors duration-200 mb-8"
        >
          AdMaxer
        </button>

        <h1 className="text-3xl font-bold text-purple-900 mb-6">Message Templates</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === 'All'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-purple-50 rounded-lg p-6 cursor-pointer hover:bg-purple-100 transition-colors duration-200 flex flex-col h-full relative"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="text-4xl mb-4">{template.icon}</div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{template.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{template.message}</p>
              <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full absolute bottom-4 right-4">
                {template.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageTemplates; 