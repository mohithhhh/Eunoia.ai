import React, { useState } from 'react';
import Navigation from './Navigation';
import { 
  Heart, 
  Phone, 
  MessageCircle, 
  BookOpen, 
  Music, 
  Sunrise, 
  Users, 
  MapPin,
  Clock,
  Star,
  ExternalLink,
  CheckCircle,
  Zap,
  Target,
  Calendar,
  Activity,
  Brain,
  Shield,
  AlertTriangle
} from 'lucide-react';

type PageType = 'landing' | 'dashboard' | 'risk-assessment' | 'interventions' | 'about' | 'profile';

interface InterventionsPageProps {
  onNavigateToPage: (page: PageType) => void;
  onLogout?: () => void;
}

const InterventionsPage: React.FC<InterventionsPageProps> = ({ onNavigateToPage, onLogout }) => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('immediate');

  const categories = [
    { id: 'immediate', label: 'Immediate Support', icon: AlertTriangle },
    { id: 'daily', label: 'Daily Actions', icon: Calendar },
    { id: 'professional', label: 'Professional Help', icon: Users },
    { id: 'long-term', label: 'Long-term Strategies', icon: Target },
  ];

  const toggleAction = (actionId: string) => {
    setCompletedActions(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const immediateSupport = [
    {
      id: 'crisis-line',
      title: 'National Crisis Lifeline',
      description: '24/7 confidential support for mental health crises',
      action: 'Call 988',
      icon: Phone,
      color: 'red',
      urgent: true,
      available: '24/7'
    },
    {
      id: 'crisis-chat',
      title: 'Crisis Text Line',
      description: 'Text-based crisis support',
      action: 'Text HOME to 741741',
      icon: MessageCircle,
      color: 'red',
      urgent: true,
      available: '24/7'
    },
    {
      id: 'emergency',
      title: 'Emergency Services',
      description: 'For immediate physical danger',
      action: 'Call 911',
      icon: Phone,
      color: 'red',
      urgent: true,
      available: '24/7'
    },
    {
      id: 'warmline',
      title: 'Mental Health Warmline',
      description: 'Non-crisis emotional support',
      action: 'Call 1-855-845-7415',
      icon: Heart,
      color: 'orange',
      urgent: false,
      available: 'Daily 8AM-10PM'
    }
  ];

  const dailyActions = [
    {
      id: 'breathing',
      title: '5-Minute Breathing Exercise',
      description: 'Guided deep breathing to reduce anxiety and stress',
      duration: '5 min',
      icon: Sunrise,
      color: 'blue',
      difficulty: 'Easy',
      completed: completedActions.includes('breathing')
    },
    {
      id: 'gratitude',
      title: 'Gratitude Journaling',
      description: 'Write down 3 things you\'re grateful for today',
      duration: '10 min',
      icon: BookOpen,
      color: 'green',
      difficulty: 'Easy',
      completed: completedActions.includes('gratitude')
    },
    {
      id: 'music',
      title: 'Calming Music Therapy',
      description: 'Listen to curated playlist for mood improvement',
      duration: '15 min',
      icon: Music,
      color: 'purple',
      difficulty: 'Easy',
      completed: completedActions.includes('music')
    },
    {
      id: 'walk',
      title: 'Nature Walk',
      description: 'Light exercise in a natural setting',
      duration: '20 min',
      icon: MapPin,
      color: 'green',
      difficulty: 'Moderate',
      completed: completedActions.includes('walk')
    },
    {
      id: 'meditation',
      title: 'Mindfulness Meditation',
      description: 'Guided meditation for mental clarity',
      duration: '15 min',
      icon: Brain,
      color: 'indigo',
      difficulty: 'Moderate',
      completed: completedActions.includes('meditation')
    },
    {
      id: 'social',
      title: 'Connect with Someone',
      description: 'Reach out to a friend or family member',
      duration: '30 min',
      icon: Users,
      color: 'pink',
      difficulty: 'Easy',
      completed: completedActions.includes('social')
    }
  ];

  const professionalResources = [
    {
      id: 'therapist',
      title: 'Licensed Therapist',
      description: 'Individual therapy sessions with licensed professionals',
      provider: 'Psychology Today',
      rating: 4.8,
      price: '$80-150/session',
      icon: Users,
      waitTime: '1-2 weeks'
    },
    {
      id: 'online-therapy',
      title: 'Online Therapy Platform',
      description: 'Convenient, secure video counseling sessions',
      provider: 'BetterHelp',
      rating: 4.6,
      price: '$60-90/week',
      icon: MessageCircle,
      waitTime: '24-48 hours'
    },
    {
      id: 'psychiatrist',
      title: 'Psychiatrist Consultation',
      description: 'Medical evaluation and medication management',
      provider: 'Local Healthcare',
      rating: 4.7,
      price: '$200-400/session',
      icon: Brain,
      waitTime: '2-4 weeks'
    },
    {
      id: 'support-groups',
      title: 'Support Groups',
      description: 'Peer support communities and group therapy',
      provider: 'NAMI',
      rating: 4.5,
      price: 'Free-$50/session',
      icon: Heart,
      waitTime: 'Immediate'
    }
  ];

  const longTermStrategies = [
    {
      id: 'routine',
      title: 'Establish Daily Routine',
      description: 'Create structure with consistent sleep, meals, and activities',
      timeframe: '2-4 weeks',
      icon: Calendar,
      difficulty: 'Moderate'
    },
    {
      id: 'exercise',
      title: 'Regular Exercise Program',
      description: 'Build physical activity into your weekly schedule',
      timeframe: '4-8 weeks',
      icon: Activity,
      difficulty: 'Moderate'
    },
    {
      id: 'social-network',
      title: 'Strengthen Social Connections',
      description: 'Build and maintain supportive relationships',
      timeframe: 'Ongoing',
      icon: Users,
      difficulty: 'Challenging'
    },
    {
      id: 'skills',
      title: 'Develop Coping Skills',
      description: 'Learn CBT techniques and stress management',
      timeframe: '8-12 weeks',
      icon: Brain,
      difficulty: 'Challenging'
    }
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'immediate':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-8 h-8" />
                <h3 className="text-2xl font-semibold">Crisis Support Resources</h3>
              </div>
              <p className="text-red-100 mb-6">
                If you're experiencing a mental health crisis or having thoughts of self-harm, reach out immediately. 
                Help is available 24/7.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {immediateSupport.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-6 transition-all duration-200 backdrop-blur-sm"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className="w-6 h-6" />
                        <span className="font-semibold text-lg">{item.title}</span>
                      </div>
                      <p className="text-red-100 mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm bg-white text-red-600 px-3 py-1 rounded-full font-medium">
                          {item.action}
                        </span>
                        <span className="text-xs text-red-200">{item.available}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'daily':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyActions.map((action) => {
                const Icon = action.icon;
                const isCompleted = action.completed;
                
                return (
                  <div
                    key={action.id}
                    className={`bg-white rounded-2xl shadow-lg border p-6 transition-all duration-200 ${
                      isCompleted 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl ${
                          action.color === 'blue' ? 'bg-blue-100' :
                          action.color === 'green' ? 'bg-green-100' :
                          action.color === 'purple' ? 'bg-purple-100' :
                          action.color === 'indigo' ? 'bg-indigo-100' :
                          action.color === 'pink' ? 'bg-pink-100' :
                          'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            action.color === 'blue' ? 'text-blue-600' :
                            action.color === 'green' ? 'text-green-600' :
                            action.color === 'purple' ? 'text-purple-600' :
                            action.color === 'indigo' ? 'text-indigo-600' :
                            action.color === 'pink' ? 'text-pink-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{action.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{action.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleAction(action.id)}
                      className={`w-full py-3 rounded-xl font-medium transition-colors ${
                        isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {isCompleted ? 'Completed ✓' : 'Start Activity'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Progress Tracking */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Today's Progress</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(completedActions.length / dailyActions.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {completedActions.length} / {dailyActions.length}
                </span>
              </div>
              
              {completedActions.length === dailyActions.length && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="font-semibold text-green-800">
                      Excellent! You've completed all daily activities. Keep up the great work!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalResources.map((resource) => {
              const Icon = resource.icon;
              
              return (
                <div key={resource.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 bg-indigo-100 rounded-xl">
                      <Icon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{resource.title}</h4>
                      <p className="text-sm text-gray-600">{resource.provider}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Price Range</span>
                      <span className="text-sm font-medium text-gray-700">{resource.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Wait Time</span>
                      <span className="text-sm font-medium text-gray-700">{resource.waitTime}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Book Consultation</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        );

      case 'long-term':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {longTermStrategies.map((strategy) => {
              const Icon = strategy.icon;
              
              return (
                <div key={strategy.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{strategy.title}</h4>
                      <p className="text-sm text-gray-600">{strategy.timeframe}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{strategy.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      strategy.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      strategy.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {strategy.difficulty}
                    </span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="interventions" onNavigateToPage={onNavigateToPage} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mental Health Interventions</h1>
              <p className="text-gray-600">Personalized support and resources for your mental wellness journey</p>
            </div>
          </div>

          {/* Category Selector */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-white text-blue-700 shadow-lg border border-blue-200'
                      : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Need Help Right Now?</h3>
              <p className="text-indigo-100">Access immediate support and crisis resources</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Crisis Line</span>
              </button>
              <button 
                onClick={() => onNavigateToPage('risk-assessment')}
                className="bg-indigo-400 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-300 transition-colors flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Check Risk Level</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterventionsPage;