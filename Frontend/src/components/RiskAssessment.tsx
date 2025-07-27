import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskAssessmentProps {
  riskScore: number;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ riskScore }) => {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { 
      level: 'High Risk', 
      color: 'red', 
      bgColor: 'bg-red-100', 
      textColor: 'text-red-800',
      icon: AlertTriangle,
      description: 'Immediate attention recommended'
    };
    if (score >= 60) return { 
      level: 'Moderate Risk', 
      color: 'yellow', 
      bgColor: 'bg-yellow-100', 
      textColor: 'text-yellow-800',
      icon: AlertCircle,
      description: 'Monitor closely and consider interventions'
    };
    return { 
      level: 'Low Risk', 
      color: 'green', 
      bgColor: 'bg-green-100', 
      textColor: 'text-green-800',
      icon: CheckCircle,
      description: 'Continue regular monitoring'
    };
  };

  const risk = getRiskLevel(riskScore);
  const Icon = risk.icon;

  const getStrokeColor = (score: number) => {
    if (score >= 80) return '#EF4444';
    if (score >= 60) return '#F59E0B';
    return '#10B981';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Mental Health Risk Assessment</h3>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={getStrokeColor(riskScore)}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{riskScore}%</div>
              <div className="text-xs text-gray-500">Risk Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-center space-x-2 p-3 rounded-lg ${risk.bgColor} mb-4`}>
        <Icon className={`w-5 h-5 ${risk.textColor}`} />
        <span className={`font-medium ${risk.textColor}`}>{risk.level}</span>
      </div>

      <p className="text-sm text-gray-600 text-center mb-6">{risk.description}</p>

      {/* Risk Factors */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Key Risk Factors</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Social Media Sentiment</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-xs text-gray-500">70%</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Activity Patterns</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-red-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-xs text-gray-500">85%</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Sleep Patterns</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-xs text-gray-500">60%</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Social Engagement</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-xs text-gray-500">40%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;