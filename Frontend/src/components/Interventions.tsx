import React, { useState } from 'react';
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
  CheckCircle
} from 'lucide-react';

const Interventions = () => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);

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
      title: 'Crisis Support Line',
      description: '24/7 confidential support',
      action: 'Call Now',
      icon: Phone,
      color: 'red',
      urgent: true
    },
    {
      id: 'crisis-chat',
      title: 'Crisis Text Line',
      description: 'Text HOME to 741741',
      action: 'Text Now',
      icon: MessageCircle,
      color: 'red',
      urgent: true
    },
    {
      id: 'emergency',
      title: 'Emergency Services',
      description: 'For immediate danger',
      action: 'Call 911',
      icon: Phone,
      color: 'red',
      urgent: true
    }
  ];

  const personalizedActions = [
    {
      id: 'breathing',
      title: '5-Minute Breathing Exercise',
      description: 'Guided deep breathing to reduce anxiety',
      duration: '5 min',
      icon: Sunrise,
      color: 'blue',
      completed: completedActions.includes('breathing')
    },
    {
      id: 'gratitude',
      title: 'Gratitude Journaling',
      description: 'Write down 3 things you\'re grateful for',
      duration: '10 min',
      icon: BookOpen,
      color: 'green',
      completed: completedActions.includes('gratitude')
    },
    {
      id: 'music',
      title: 'Calming Music Playlist',
      description: 'Curated playlist for mood improvement',
      duration: '15 min',
      icon: Music,
      color: 'purple',
      completed: completedActions.includes('music')
    },
    {
      id: 'walk',
      title: 'Nature Walk',
      description: 'Light exercise in a natural setting',
      duration: '20 min',
      icon: MapPin,
      color: 'green',
      completed: completedActions.includes('walk')
    }
  ];

  const professionalResources = [
    {
      id: 'therapist',
      title: 'Find a Therapist',
      description: 'Connect with licensed mental health professionals',
      provider: 'Psychology Today',
      rating: 4.8,
      icon: Users
    },
    {
      id: 'online-therapy',
      title: 'Online Therapy Sessions',
      description: 'Convenient, secure video counseling',
      provider: 'BetterHelp',
      rating: 4.6,
      icon: MessageCircle
    },
    {
      id: 'support-groups',
      title: 'Support Groups',
      description: 'Join peer support communities',
      provider: 'NAMI',
      rating: 4.7,
      icon: Heart
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personalized Support & Interventions</h2>
        <p className="text-gray-600">Based on your current risk assessment and behavioral patterns</p>
      </div>

      {/* Crisis Support */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Phone className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Immediate Crisis Support</h3>
        </div>
        <p className="mb-6 text-red-100">If you're experiencing a mental health crisis or having thoughts of self-harm, reach out immediately:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {immediateSupport.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 text-left transition-all duration-200 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.title}</span>
                </div>
                <p className="text-sm text-red-100 mb-3">{item.description}</p>
                <span className="text-sm font-medium bg-white text-red-600 px-3 py-1 rounded-full">
                  {item.action}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Actions for Today</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalizedActions.map((action) => {
            const Icon = action.icon;
            const isCompleted = action.completed;
            
            return (
              <div
                key={action.id}
                className={`bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 ${
                  isCompleted 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${
                      action.color === 'blue' ? 'bg-blue-100' :
                      action.color === 'green' ? 'bg-green-100' :
                      action.color === 'purple' ? 'bg-purple-100' :
                      'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        action.color === 'blue' ? 'text-blue-600' :
                        action.color === 'green' ? 'text-green-600' :
                        action.color === 'purple' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                  
                  {isCompleted && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{action.duration}</span>
                  </div>
                  
                  <button
                    onClick={() => toggleAction(action.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Resources */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Support Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {professionalResources.map((resource) => {
            const Icon = resource.icon;
            
            return (
              <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.provider}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                    <span>Learn More</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedActions.length / personalizedActions.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">
            {completedActions.length} of {personalizedActions.length} completed
          </span>
        </div>
        
        {completedActions.length === personalizedActions.length && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Great job! You've completed all recommended actions for today.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interventions;