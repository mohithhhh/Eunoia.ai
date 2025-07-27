import React, { useState } from 'react';
import Navigation from './Navigation';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Database, 
  Smartphone, 
  Globe, 
  Users, 
  Settings,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

type PageType = 'landing' | 'dashboard' | 'risk-assessment' | 'interventions' | 'about' | 'profile';

interface PrivacySettingsProps {
  onNavigateToPage: (page: PageType) => void;
  onLogout?: () => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ onNavigateToPage, onLogout }) => {
  const [dataSharing, setDataSharing] = useState({
    analytics: true,
    research: false,
    thirdParty: false,
    emergency: true
  });

  const [monitoringSources, setMonitoringSources] = useState({
    socialMedia: true,
    wearableDevice: false,
    phoneUsage: true,
    location: false
  });

  const [notifications, setNotifications] = useState({
    riskAlerts: true,
    dailyCheck: true,
    weeklyReport: false,
    emergencyContact: true
  });

  const toggleDataSharing = (key: keyof typeof dataSharing) => {
    setDataSharing(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMonitoring = (key: keyof typeof monitoringSources) => {
    setMonitoringSources(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="profile" onNavigateToPage={onNavigateToPage} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy & Data Control</h2>
        <p className="text-gray-600">Manage how your data is collected, processed, and shared</p>
      </div>

      {/* Privacy Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-semibold">Your Privacy is Protected</h3>
            <p className="text-blue-100">End-to-end encryption • Local processing • No data sales</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Lock className="w-6 h-6 mb-2" />
            <h4 className="font-semibold mb-1">Encrypted Storage</h4>
            <p className="text-sm text-blue-100">All data encrypted at rest and in transit</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Smartphone className="w-6 h-6 mb-2" />
            <h4 className="font-semibold mb-1">On-Device AI</h4>
            <p className="text-sm text-blue-100">AI processing happens locally when possible</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <Users className="w-6 h-6 mb-2" />
            <h4 className="font-semibold mb-1">No Data Sales</h4>
            <p className="text-sm text-blue-100">We never sell your personal information</p>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Data Collection Sources</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Social Media Analysis</h4>
                <p className="text-sm text-gray-600">Monitor public posts for sentiment and pattern changes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={monitoringSources.socialMedia}
                onChange={() => toggleMonitoring('socialMedia')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-purple-600" />
              <div>
                <h4 className="font-medium text-gray-900">Phone Usage Patterns</h4>
                <p className="text-sm text-gray-600">App usage, screen time, and interaction patterns</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={monitoringSources.phoneUsage}
                onChange={() => toggleMonitoring('phoneUsage')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-900">Wearable Device Data</h4>
                <p className="text-sm text-gray-600">Heart rate, sleep patterns, activity levels</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={monitoringSources.wearableDevice}
                onChange={() => toggleMonitoring('wearableDevice')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Data Sharing Preferences</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Anonymous Analytics</h4>
              <p className="text-sm text-gray-600">Help improve the system with anonymized usage data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dataSharing.analytics}
                onChange={() => toggleDataSharing('analytics')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Research Participation</h4>
              <p className="text-sm text-gray-600">Contribute to mental health research studies</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dataSharing.research}
                onChange={() => toggleDataSharing('research')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>Emergency Contact Sharing</span>
              </h4>
              <p className="text-sm text-gray-600">Share risk alerts with emergency contacts during crisis</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dataSharing.emergency}
                onChange={() => toggleDataSharing('emergency')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>Data Management</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Export Your Data</h4>
              <p className="text-sm text-gray-600">Download all your personal data</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-5 h-5 text-red-600" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-600">Permanently remove all data</p>
            </div>
          </button>
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Privacy Compliance</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">HIPAA Compliant</h4>
            <p className="text-gray-600">Health information protection standards</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">GDPR Compliant</h4>
            <p className="text-gray-600">European data protection regulations</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">SOC 2 Certified</h4>
            <p className="text-gray-600">Security and availability standards</p>
          </div>
        </div>
      </div>
    </div>
      </main>
    </div>
  );
};

export default PrivacySettings;