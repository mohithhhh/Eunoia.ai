import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import RiskAssessmentPage from './components/RiskAssessmentPage';
import InterventionsPage from './components/InterventionsPage';
import AboutPage from './components/AboutPage';
import PrivacySettings from './components/PrivacySettings';
import Login from './components/Login';
import Register from './components/Register';

export type PageType = 'landing' | 'dashboard' | 'risk-assessment' | 'interventions' | 'about' | 'profile' | 'login' | 'register';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  
  // Check for the actual token to determine authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  // On initial load, if the user is authenticated, go to the dashboard
  useState(() => {
    if (!!localStorage.getItem('access_token')) {
      setCurrentPage('dashboard');
    }
  });

  const navigateToPage = (page: PageType) => {
    // If user tries to access protected pages without authentication, redirect
    if (!isAuthenticated && ['dashboard', 'risk-assessment', 'interventions', 'profile'].includes(page)) {
      setCurrentPage('login'); // Go to login page first
      return;
    }
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    // Clear all authentication-related keys from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('userEmail');
    
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <Login onNavigateToPage={navigateToPage} onLogin={handleLogin} />;
        case 'register':
          return <Register onNavigateToPage={navigateToPage} onRegister={handleLogin} />;
        case 'about':
           return <AboutPage onNavigateToPage={navigateToPage} isAuthenticated={isAuthenticated} />;
        default:
          return <LandingPage onNavigateToPage={navigateToPage} />;
      }
    }

    // --- Authenticated Routes ---
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigateToPage={navigateToPage} onLogout={handleLogout} />;
      case 'risk-assessment':
        return <RiskAssessmentPage onNavigateToPage={navigateToPage} onLogout={handleLogout} />;
      case 'interventions':
        return <InterventionsPage onNavigateToPage={navigateToPage} onLogout={handleLogout} />;
      case 'about':
        return <AboutPage onNavigateToPage={navigateToPage} isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
      case 'profile':
        return <PrivacySettings onNavigateToPage={navigateToPage} onLogout={handleLogout} />;
      default:
        // If authenticated user lands on a public page, redirect to dashboard
        return <Dashboard onNavigateToPage={navigateToPage} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

export default App;