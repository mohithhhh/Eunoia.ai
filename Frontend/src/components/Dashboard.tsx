import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { userAPI, aiAPI } from '../services/api';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Heart, 
  AlertTriangle, 
  Users, 
  Phone,
  MessageCircle,
  Calendar,
  Activity,
  Smile,
  Frown
} from 'lucide-react';
import RiskAssessment from './RiskAssessment';
import BehavioralPatterns from './BehavioralPatterns';
import Interventions from './Interventions';
import PrivacySettings from './PrivacySettings';

export type PageType = 'landing' | 'dashboard' | 'risk-assessment' | 'interventions' | 'about' | 'profile';

interface DashboardProps {
  onNavigateToPage: (page: PageType) => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToPage, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for live data
  const [userName, setUserName] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user profile and assessments simultaneously
        const [profileResponse, assessmentsResponse] = await Promise.all([
          userAPI.getProfile(),
          aiAPI.getUserAssessments()
        ]);

        setUserName(profileResponse.data.user.firstName);
        
        // Use the latest assessment for the risk score
        if (assessmentsResponse.data.assessments.length > 0) {
          setRiskScore(assessmentsResponse.data.assessments[0].risk_score);
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // The interceptor in api.ts will handle logout on auth errors (401)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty array [] means this runs only once

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'patterns', label: 'Patterns', icon: TrendingUp },
    { id: 'interventions', label: 'Support', icon: Heart },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent riskScore={riskScore} userName={userName} />;
      case 'patterns':
        return <BehavioralPatterns />;
      case 'interventions':
        return <Interventions />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return <OverviewContent riskScore={riskScore} userName={userName} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="dashboard" onNavigateToPage={onNavigateToPage} onLogout={onLogout} />

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

// OverviewContent component remains largely the same, but can accept userName
const OverviewContent = ({ riskScore, userName }: { riskScore: number; userName: string }) => {
    // ... your existing OverviewContent JSX ...
    // You can now use the `userName` variable for greetings.
    return (
      // ... your existing JSX ...
      <h2 className="text-2xl font-bold text-gray-800">Welcome back, {userName}!</h2>
      // ... more JSX ...
    );
};

export default Dashboard;