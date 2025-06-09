import React, { useState } from 'react';
import { Sparkles, Wand2, Copy, RefreshCw } from 'lucide-react';

const AIGenerator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [aiModel, setAiModel] = useState('ChatGPT');
  const [tone, setTone] = useState('professional');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const aiModels = ['ChatGPT', 'Claude', 'DALL-E', 'Midjourney', 'Stable Diffusion'];
  const tones = ['professional', 'casual', 'creative', 'technical', 'persuasive', 'educational'];

  const generatePrompt = async () => {
    if (!goal.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      let prompt = '';
      
      if (aiModel === 'DALL-E' || aiModel === 'Midjourney' || aiModel === 'Stable Diffusion') {
        prompt = `Create a detailed ${aiModel.toLowerCase()} prompt for: ${goal}

Include specific details about:
- Visual style and composition
- Color palette and lighting
- Camera angle and perspective
- Artistic technique or medium
- Mood and atmosphere

Context: ${context || 'General purpose image generation'}

Example format: "${goal}, [artistic style], [color description], [lighting], [composition], high quality, detailed, professional photography"`;
      } else {
        prompt = `Act as an expert ${context || 'assistant'} and help me with: ${goal}

Please provide a ${tone} response that:
- Addresses the specific goal clearly
- Includes actionable steps or recommendations
- Uses appropriate examples when helpful
- Maintains a ${tone} tone throughout

Format your response in a structured way with clear sections and bullet points where appropriate.`;
      }
      
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 2000);
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      // Show success toast
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const regeneratePrompt = () => {
    generatePrompt();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Prompt Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Describe your goal and let AI create the perfect prompt for you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Generate Your Prompt
          </h2>
          
          <div className="space-y-6">
            {/* Goal Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What do you want to achieve? *
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Write a compelling email for product launch, Create a logo for tech startup, Debug React component..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                rows={4}
              />
            </div>

            {/* Context Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide any relevant background information, target audience, specific requirements..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                rows={3}
              />
            </div>

            {/* AI Model Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target AI Model
              </label>
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {aiModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Tone Selection (hide for image models) */}
            {!['DALL-E', 'Midjourney', 'Stable Diffusion'].includes(aiModel) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tone & Style
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {tones.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generatePrompt}
              disabled={!goal.trim() || isGenerating}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  <span>Generate Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Prompt */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Generated Prompt
            </h2>
            {generatedPrompt && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={regeneratePrompt}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
                  title="Regenerate"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={copyPrompt}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-200"
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {generatedPrompt ? (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                {generatedPrompt}
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Fill in your goal above and click "Generate Prompt" to see your custom AI prompt here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💡 Tips for Better Prompts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Be Specific</h4>
            <p>The more details you provide about your goal, the better the generated prompt will be.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Include Context</h4>
            <p>Mention your target audience, industry, or specific requirements for better results.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Choose Right Model</h4>
            <p>Different AI models excel at different tasks - pick the one that matches your goal.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Iterate & Refine</h4>
            <p>Use the regenerate button to get variations and find the perfect prompt.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;