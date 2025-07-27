import React from 'react';
import Navigation from './Navigation';
import { 
  Brain, 
  Shield, 
  Heart, 
  TrendingUp, 
  Users, 
  Zap,
  Eye,
  Lock,
  Activity,
  MessageSquare,
  Clock,
  Target,
  CheckCircle,
  Star,
  Award,
  Globe,
  Smartphone
} from 'lucide-react';

type PageType = 'landing' | 'dashboard' | 'risk-assessment' | 'interventions' | 'about' | 'profile';

interface AboutPageProps {
  onNavigateToPage: (page: PageType) => void;
  isAuthenticated: boolean;
  onLogout?: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToPage, isAuthenticated, onLogout }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced NLP and emotion detection using fine-tuned BERT models to analyze text sentiment and behavioral patterns.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'End-to-end encryption with on-device processing and federated learning ensures your data remains private and secure.',
      color: 'green'
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Tailored interventions and recommendations based on your unique patterns and mental health profile.',
      color: 'purple'
    },
    {
      icon: TrendingUp,
      title: 'Early Detection',
      description: 'Proactive monitoring that identifies potential mental health challenges before they escalate.',
      color: 'orange'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with licensed mental health professionals for expert guidance and support.',
      color: 'indigo'
    },
    {
      icon: Activity,
      title: 'Continuous Monitoring',
      description: '24/7 behavioral pattern analysis across multiple data sources for comprehensive insights.',
      color: 'pink'
    }
  ];

  const stats = [
    { number: '95%', label: 'Early Detection Rate', icon: Target },
    { number: '24/7', label: 'Continuous Monitoring', icon: Clock },
    { number: '10K+', label: 'Lives Supported', icon: Users },
    { number: '99.9%', label: 'Data Security', icon: Lock }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Data Collection',
      description: 'Securely analyze behavioral patterns from social media, device usage, and biometric data with your consent.',
      icon: Smartphone,
      color: 'blue'
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'Our advanced AI models process your data to identify patterns and potential mental health indicators.',
      icon: Brain,
      color: 'purple'
    },
    {
      step: 3,
      title: 'Risk Assessment',
      description: 'Generate personalized risk scores and insights based on your unique behavioral patterns.',
      icon: TrendingUp,
      color: 'orange'
    },
    {
      step: 4,
      title: 'Interventions',
      description: 'Receive tailored recommendations, resources, and professional support based on your needs.',
      icon: Heart,
      color: 'pink'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer',
      specialty: 'Psychiatrist & AI Researcher',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Head of AI Development',
      specialty: 'Machine Learning & NLP Expert',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'Clinical Psychology Director',
      specialty: 'Licensed Clinical Psychologist',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Alex Thompson',
      role: 'Privacy & Security Lead',
      specialty: 'Cybersecurity & HIPAA Compliance',
      image: 'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {isAuthenticated ? (
        <Navigation currentPage="about" onNavigateToPage={onNavigateToPage} onLogout={onLogout} />
      ) : (
        // Simple header for non-authenticated users
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button 
                onClick={() => onNavigateToPage('landing')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Eunoia AI</h1>
                  <p className="text-xs text-gray-600">Mental Health Guardian</p>
                </div>
              </button>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onNavigateToPage('landing')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => onNavigateToPage('login')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => onNavigateToPage('register')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About Eunoia AI
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Eunoia AI is a revolutionary mental health early warning system that uses artificial intelligence 
            to detect potential mental health challenges before they escalate. Our mission is to provide 
            proactive, personalized, and private mental health support for everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              To democratize mental health care by making early detection and intervention accessible to everyone, 
              while maintaining the highest standards of privacy and security. We believe that mental health 
              support should be proactive, not reactive.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Eunoia AI Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    feature.color === 'blue' ? 'bg-blue-100' :
                    feature.color === 'green' ? 'bg-green-100' :
                    feature.color === 'purple' ? 'bg-purple-100' :
                    feature.color === 'orange' ? 'bg-orange-100' :
                    feature.color === 'indigo' ? 'bg-indigo-100' :
                    'bg-pink-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      feature.color === 'blue' ? 'text-blue-600' :
                      feature.color === 'green' ? 'text-green-600' :
                      feature.color === 'purple' ? 'text-purple-600' :
                      feature.color === 'orange' ? 'text-orange-600' :
                      feature.color === 'indigo' ? 'text-indigo-600' :
                      'text-pink-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            The Eunoia AI Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                      step.color === 'blue' ? 'bg-blue-100' :
                      step.color === 'purple' ? 'bg-purple-100' :
                      step.color === 'orange' ? 'bg-orange-100' :
                      'bg-pink-100'
                    }`}>
                      <Icon className={`w-10 h-10 ${
                        step.color === 'blue' ? 'text-blue-600' :
                        step.color === 'purple' ? 'text-purple-600' :
                        step.color === 'orange' ? 'text-orange-600' :
                        'text-pink-600'
                      }`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Impact & Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Expert Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border border-gray-100">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 lg:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Privacy & Security First</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Your mental health data is extremely sensitive. We've built Eunoia AI with privacy and security 
              as our foundation, not an afterthought.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <Lock className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-green-100 text-sm">All data is encrypted both in transit and at rest using military-grade encryption.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <Eye className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">On-Device Processing</h3>
              <p className="text-green-100 text-sm">AI analysis happens locally on your device whenever possible to minimize data exposure.</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-green-100 text-sm">Full compliance with healthcare privacy regulations and industry standards.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Take Control of Your Mental Health?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands who trust Eunoia AI for early mental health detection and personalized support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigateToPage('dashboard')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Brain className="w-6 h-6" />
              <span>Start Your Assessment</span>
            </button>
            
            <button 
              onClick={() => onNavigateToPage('interventions')}
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Explore Support Resources</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;