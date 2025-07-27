import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { aiAPI } from '../services/api';
import { 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle, 
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  MessageSquare,
  Clock,
  Calendar,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

type PageType = 'landing' | 'dashboard' | 'risk-assessment' | 'interventions' | 'about' | 'profile';

interface RiskAssessmentPageProps {
  onNavigateToPage: (page: PageType) => void;
  onLogout?: () => void;
}

const RiskAssessmentPage: React.FC<RiskAssessmentPageProps> = ({ onNavigateToPage, onLogout }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [riskScore, setRiskScore] = useState(65);
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const timeframes = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
  ];

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { 
      level: 'High Risk', 
      color: 'red', 
      bgColor: 'bg-red-100', 
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: AlertTriangle,
      description: 'Immediate attention and intervention recommended',
      recommendation: 'Contact mental health professional immediately'
    };
    if (score >= 60) return { 
      level: 'Moderate Risk', 
      color: 'yellow', 
      bgColor: 'bg-yellow-100', 
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      description: 'Monitor closely and consider preventive interventions',
      recommendation: 'Schedule consultation within 1-2 weeks'
    };
    return { 
      level: 'Low Risk', 
      color: 'green', 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: CheckCircle,
      description: 'Continue regular monitoring and maintain healthy habits',
      recommendation: 'Continue current wellness practices'
    };
  };

  const risk = getRiskLevel(riskScore);
  const Icon = risk.icon;

  const riskFactors = [
    { name: 'Social Media Sentiment', score: 70, trend: 'down', color: 'yellow' },
    { name: 'Activity Patterns', score: 85, trend: 'down', color: 'red' },
    { name: 'Sleep Quality', score: 45, trend: 'up', color: 'green' },
    { name: 'Social Engagement', score: 60, trend: 'down', color: 'yellow' },
    { name: 'Communication Frequency', score: 75, trend: 'down', color: 'red' },
    { name: 'Mood Indicators', score: 55, trend: 'stable', color: 'yellow' },
  ];

  const getStrokeColor = (score: number) => {
    if (score >= 80) return '#EF4444';
    if (score >= 60) return '#F59E0B';
    return '#10B981';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  const performRiskAssessment = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const requestData = {
        user_id: userId,
        social_media_posts: [
          "Feeling a bit overwhelmed with work lately",
          "Had trouble sleeping last night",
          "Looking forward to the weekend"
        ],
        sleep_hours: 6.5,
        activity_level: 3,
        mood_rating: 3,
        stress_level: 4
      };

      const response = await aiAPI.performRiskAssessment(requestData);
      const data = response.data;
      
      setRiskScore(data.risk_score);
      setAssessmentData(data);
    } catch (error: any) {
      console.error('Risk assessment failed:', error);
      setError(error.response?.data?.detail || 'Failed to perform risk assessment');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Perform initial assessment when component mounts
    performRiskAssessment();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="risk-assessment" onNavigateToPage={onNavigateToPage} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mental Health Risk Assessment</h1>
              <p className="text-gray-600">Comprehensive analysis of your mental health indicators</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex bg-white rounded-lg border border-gray-200 p-1 w-fit">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assessment Controls */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={performRiskAssessment}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Run New Assessment</span>
              </>
            )}
          </button>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
        </div>

        {/* Main Risk Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Risk Score Circle */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Overall Risk Score</h3>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke={getStrokeColor(riskScore)}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">{riskScore}%</div>
                      <div className="text-sm text-gray-500">Risk Level</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`flex items-center justify-center space-x-2 p-4 rounded-xl ${risk.bgColor} ${risk.borderColor} border mb-4`}>
                <Icon className={`w-6 h-6 ${risk.textColor}`} />
                <span className={`font-semibold text-lg ${risk.textColor}`}>{risk.level}</span>
              </div>

              <p className="text-sm text-gray-600 text-center mb-4">{risk.description}</p>
              <p className="text-sm font-medium text-gray-800 text-center">{risk.recommendation}</p>
            </div>
          </div>

          {/* Risk Breakdown */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Risk Factor Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riskFactors.map((factor, index) => {
                  const trendIcon = factor.trend === 'up' ? TrendingUp : 
                                   factor.trend === 'down' ? TrendingDown : 
                                   Activity;
                  const trendColor = factor.trend === 'up' ? 'text-green-600' : 
                                    factor.trend === 'down' ? 'text-red-600' : 
                                    'text-gray-600';
                  
                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{factor.name}</h4>
                        <div className="flex items-center space-x-1">
                          {React.createElement(trendIcon, { className: `w-4 h-4 ${trendColor}` })}
                          <span className="text-sm font-medium text-gray-700">{factor.score}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            factor.color === 'red' ? 'bg-red-400' :
                            factor.color === 'yellow' ? 'bg-yellow-400' :
                            'bg-green-400'
                          }`}
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Insights */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">AI-Generated Insights</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800">
                      {assessmentData?.risk_level === 'High' ? 'High Risk Detected' : 'Concerning Pattern Detected'}
                    </h4>
                    <p className="text-sm text-red-700 mt-1">
                      {assessmentData?.recommendations?.[0] || 'Significant decrease in social media activity combined with negative sentiment shift over the past week.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Sleep Pattern Changes</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Irregular sleep schedule detected. Late-night activity increased by 40% this week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Communication Analysis</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Response time to messages has increased. Language patterns show increased stress indicators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Personalized Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Immediate Actions</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Schedule a check-in with a trusted friend or family member</li>
                      <li>• Practice 10 minutes of mindfulness meditation daily</li>
                      <li>• Maintain consistent sleep schedule (10 PM - 6 AM)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Weekly Goals</h4>
                    <ul className="text-sm text-green-700 mt-1 space-y-1">
                      {assessmentData?.recommendations?.slice(0, 3).map((rec: string, index: number) => (
                        <li key={index}>• {rec}</li>
                      )) || (
                        <>
                          <li>• Engage in 3 social activities this week</li>
                          <li>• Complete mood tracking daily</li>
                          <li>• Schedule professional consultation</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onNavigateToPage('interventions')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>View Detailed Interventions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Historical Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-semibold text-gray-900">Risk Score Trends</h3>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {Array.from({ length: 14 }, (_, i) => {
              const height = Math.random() * 200 + 50;
              const isToday = i === 13;
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isToday 
                        ? 'bg-gradient-to-t from-red-400 to-red-600' 
                        : 'bg-gradient-to-t from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700'
                    }`}
                    style={{ height: `${height}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {isToday ? 'Today' : `${14 - i}d`}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-4">
            <span>Low Risk (0-40%)</span>
            <span>Moderate Risk (40-80%)</span>
            <span>High Risk (80-100%)</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiskAssessmentPage;