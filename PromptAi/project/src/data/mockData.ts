import { Prompt, Category, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Thompson',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  favorites: ['1', '3', '5'],
  collections: [
    {
      id: '1',
      name: 'Writing Prompts',
      description: 'My favorite prompts for creative writing',
      prompts: ['1', '2'],
      isPublic: false,
      createdAt: new Date()
    }
  ],
  createdAt: new Date()
};

export const categories: Category[] = [
  { id: 'writing', name: 'Writing', description: 'Creative writing, articles, and content creation', icon: 'PenTool', promptCount: 45, color: 'bg-blue-500' },
  { id: 'coding', name: 'Coding', description: 'Programming, debugging, and code review', icon: 'Code', promptCount: 32, color: 'bg-green-500' },
  { id: 'marketing', name: 'Marketing', description: 'Social media, ads, and campaigns', icon: 'TrendingUp', promptCount: 28, color: 'bg-purple-500' },
  { id: 'design', name: 'Design', description: 'UI/UX, graphics, and visual creation', icon: 'Palette', promptCount: 24, color: 'bg-pink-500' },
  { id: 'business', name: 'Business', description: 'Strategy, analysis, and planning', icon: 'Briefcase', promptCount: 19, color: 'bg-orange-500' },
  { id: 'education', name: 'Education', description: 'Learning, teaching, and curriculum', icon: 'GraduationCap', promptCount: 16, color: 'bg-indigo-500' },
  { id: 'research', name: 'Research', description: 'Analysis, reports, and insights', icon: 'Search', promptCount: 12, color: 'bg-teal-500' },
  { id: 'creative', name: 'Creative', description: 'Art, music, and creative projects', icon: 'Sparkles', promptCount: 21, color: 'bg-rose-500' }
];

export const prompts: Prompt[] = [
  {
    id: '1',
    title: 'YouTube Script Writer',
    description: 'Create engaging YouTube video scripts with hooks, content structure, and call-to-actions',
    content: 'Create a YouTube script for a {duration}-minute video about {topic}. Include an attention-grabbing hook in the first 15 seconds, structure the content with clear sections, and end with a strong call-to-action. Target audience: {audience}. Tone: {tone}.',
    category: 'writing',
    tags: ['youtube', 'script', 'video', 'content'],
    aiModel: ['ChatGPT', 'Claude'],
    rating: 4.8,
    usage: 1245,
    author: 'Sarah Chen',
    isPublic: true,
    variables: [
      { name: 'duration', placeholder: '10', required: true },
      { name: 'topic', placeholder: 'sustainable living', required: true },
      { name: 'audience', placeholder: 'young professionals', required: true },
      { name: 'tone', placeholder: 'conversational and inspiring', required: false }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Code Review Assistant',
    description: 'Comprehensive code review focusing on best practices, security, and optimization',
    content: 'Review this {language} code for best practices, security vulnerabilities, performance issues, and maintainability. Provide specific suggestions for improvement and explain the reasoning behind each recommendation:\n\n```{language}\n{code}\n```\n\nFocus areas: {focus_areas}',
    category: 'coding',
    tags: ['code-review', 'debugging', 'best-practices'],
    aiModel: ['ChatGPT', 'Claude', 'Copilot'],
    rating: 4.9,
    usage: 892,
    author: 'Mike Rodriguez',
    isPublic: true,
    variables: [
      { name: 'language', placeholder: 'JavaScript', required: true },
      { name: 'code', placeholder: 'Paste your code here', required: true },
      { name: 'focus_areas', placeholder: 'security, performance', required: false }
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Instagram Caption Generator',
    description: 'Create engaging Instagram captions with hashtags and call-to-actions',
    content: 'Create an engaging Instagram caption for a post about {topic}. Include:\n- A compelling hook\n- 2-3 sentences of valuable content\n- A question to boost engagement\n- 5-10 relevant hashtags\n- A clear call-to-action\n\nBrand voice: {brand_voice}\nTarget audience: {target_audience}',
    category: 'marketing',
    tags: ['instagram', 'social-media', 'captions', 'hashtags'],
    aiModel: ['ChatGPT', 'Claude'],
    rating: 4.7,
    usage: 2156,
    author: 'Emma Wilson',
    isPublic: true,
    variables: [
      { name: 'topic', placeholder: 'morning workout routine', required: true },
      { name: 'brand_voice', placeholder: 'friendly and motivational', required: true },
      { name: 'target_audience', placeholder: 'fitness enthusiasts aged 25-35', required: true }
    ],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '4',
    title: 'DALL-E Image Prompt Creator',
    description: 'Generate detailed prompts for AI image generation with style and composition guidance',
    content: 'Create a detailed DALL-E prompt for: {image_description}\n\nInclude:\n- Artistic style: {art_style}\n- Color palette: {colors}\n- Composition: {composition}\n- Lighting: {lighting}\n- Camera angle: {camera_angle}\n- Additional details: {details}\n\nFormat the prompt as a single, descriptive sentence optimized for AI image generation.',
    category: 'design',
    tags: ['dall-e', 'image-generation', 'art', 'visual'],
    aiModel: ['DALL-E', 'Midjourney', 'Stable Diffusion'],
    rating: 4.6,
    usage: 743,
    author: 'David Kim',
    isPublic: true,
    variables: [
      { name: 'image_description', placeholder: 'a cozy coffee shop in autumn', required: true },
      { name: 'art_style', placeholder: 'watercolor painting', required: true },
      { name: 'colors', placeholder: 'warm oranges and browns', required: false },
      { name: 'composition', placeholder: 'wide shot', required: false },
      { name: 'lighting', placeholder: 'soft natural light', required: false },
      { name: 'camera_angle', placeholder: 'eye level', required: false },
      { name: 'details', placeholder: 'people reading books', required: false }
    ],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '5',
    title: 'Business Strategy Analyzer',
    description: 'Analyze business strategies with SWOT analysis and actionable recommendations',
    content: 'Analyze the business strategy for {company_name} in the {industry} industry. Provide:\n\n1. SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats)\n2. Market positioning assessment\n3. Competitive analysis\n4. 3-5 actionable strategic recommendations\n5. Potential risks and mitigation strategies\n\nCompany context: {company_context}\nKey challenges: {challenges}',
    category: 'business',
    tags: ['strategy', 'analysis', 'swot', 'business-planning'],
    aiModel: ['ChatGPT', 'Claude'],
    rating: 4.5,
    usage: 567,
    author: 'Jennifer Park',
    isPublic: true,
    variables: [
      { name: 'company_name', placeholder: 'TechStart Solutions', required: true },
      { name: 'industry', placeholder: 'SaaS', required: true },
      { name: 'company_context', placeholder: 'B2B productivity software, 50 employees', required: true },
      { name: 'challenges', placeholder: 'increasing competition, customer retention', required: false }
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '6',
    title: 'Lesson Plan Creator',
    description: 'Create comprehensive lesson plans with objectives, activities, and assessments',
    content: 'Create a detailed lesson plan for {subject} targeting {grade_level} students.\n\nTopic: {topic}\nDuration: {duration}\n\nInclude:\n1. Learning objectives (3-5 specific, measurable goals)\n2. Materials needed\n3. Lesson structure with timing\n4. Interactive activities and exercises\n5. Assessment methods\n6. Homework assignment\n7. Differentiation strategies for diverse learners\n\nTeaching style: {teaching_style}',
    category: 'education',
    tags: ['lesson-plan', 'teaching', 'curriculum', 'education'],
    aiModel: ['ChatGPT', 'Claude'],
    rating: 4.8,
    usage: 432,
    author: 'Robert Chen',
    isPublic: true,
    variables: [
      { name: 'subject', placeholder: 'Mathematics', required: true },
      { name: 'grade_level', placeholder: '7th grade', required: true },
      { name: 'topic', placeholder: 'Introduction to Algebra', required: true },
      { name: 'duration', placeholder: '45 minutes', required: true },
      { name: 'teaching_style', placeholder: 'interactive and hands-on', required: false }
    ],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  }
];