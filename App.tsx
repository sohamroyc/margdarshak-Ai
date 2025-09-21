
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SkillGenome from './components/SkillGenome';
import CareerSimulator from './components/CareerSimulator';
import PathwayBuilder from './components/PathwayBuilder';
import AiMentor from './components/AiMentor';
import EmotionalCheckin from './components/EmotionalCheckin';
import { type View, type Skill, type User } from './types';
import { DEFAULT_SKILLS } from './constants';
import { EmotionalCheckinIcon } from './components/common/icons';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('landing');
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [showEmotionalCheckin, setShowEmotionalCheckin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };
  
  const handleRegister = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveView('landing');
  };

  const renderAuthenticatedView = useCallback(() => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} user={user} />;
      case 'genome':
        return <SkillGenome skills={skills} setSkills={setSkills} />;
      case 'simulator':
        return <CareerSimulator skills={skills} />;
      case 'pathway':
        return <PathwayBuilder skills={skills} />;
      case 'mentor':
        return <AiMentor skills={skills} />;
      case 'profile':
        return <ProfilePage user={user} setUser={setUser} />;
      default:
        return <Dashboard setActiveView={setActiveView} user={user} />;
    }
  }, [activeView, skills, user, setSkills]);

  if (!isAuthenticated) {
     switch (activeView) {
      case 'login':
        return <LoginPage onLogin={handleLogin} setActiveView={setActiveView} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} setActiveView={setActiveView} />;
      default:
        return <LandingPage setActiveView={setActiveView} />;
     }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 selection:bg-indigo-500/30 flex flex-col">
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div key={activeView} className="animate-fade-in-up">
          {renderAuthenticatedView()}
        </div>
      </main>
      <button
        onClick={() => setShowEmotionalCheckin(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-br from-violet-500 to-indigo-600 p-3 rounded-full text-white shadow-lg shadow-indigo-500/30 hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Emotional Check-in"
      >
        <EmotionalCheckinIcon />
      </button>
      {showEmotionalCheckin && <EmotionalCheckin onClose={() => setShowEmotionalCheckin(false)} />}
      <Footer />
    </div>
  );
};

export default App;