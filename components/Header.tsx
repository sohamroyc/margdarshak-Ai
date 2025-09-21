
import React, { useState, useRef, useEffect } from 'react';
import { type View, type User } from '../types';
import { HomeIcon, GenomeIcon, SimulatorIcon, PathwayIcon, MentorIcon, UserIcon, LogoutIcon } from './common/icons';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

const NavButton: React.FC<{
  label: string;
  view: View;
  activeView: View;
  onClick: (view: View) => void;
  icon: React.ReactNode;
}> = ({ label, view, activeView, onClick, icon }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => onClick(view)}
      className={`flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
        isActive ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="text-xs sm:text-sm mt-1 sm:mt-0">{label}</span>
    </button>
  );
};

const ProfileDropdown: React.FC<{ user: User; onLogout: () => void; setActiveView: (view: View) => void }> = ({ user, onLogout, setActiveView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 text-slate-300 hover:text-white">
        <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ring-2 ring-slate-600">
           <UserIcon />
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 z-50 animate-fade-in-up">
          <button
            onClick={() => { setActiveView('profile'); setIsOpen(false); }}
            className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
          >
            <UserIcon />
            <span>Profile</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-rose-400 hover:bg-slate-700"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};


const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, isAuthenticated, user, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/70 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-slate-800">
          <div 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-500 cursor-pointer"
            onClick={() => setActiveView(isAuthenticated ? 'dashboard' : 'landing')}
          >
            Margdarshak AI
          </div>
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-1 sm:space-x-2">
              <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 mr-4">
                  <NavButton label="Dashboard" view="dashboard" activeView={activeView} onClick={setActiveView} icon={<HomeIcon />} />
                  <NavButton label="Genome" view="genome" activeView={activeView} onClick={setActiveView} icon={<GenomeIcon />} />
                  <NavButton label="Simulator" view="simulator" activeView={activeView} onClick={setActiveView} icon={<SimulatorIcon />} />
                  <NavButton label="Pathway" view="pathway" activeView={activeView} onClick={setActiveView} icon={<PathwayIcon />} />
                  <NavButton label="Mentor" view="mentor" activeView={activeView} onClick={setActiveView} icon={<MentorIcon />} />
              </nav>
              <ProfileDropdown user={user} onLogout={onLogout} setActiveView={setActiveView} />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
               <button onClick={() => setActiveView('login')} className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                  Login
               </button>
               <button onClick={() => setActiveView('register')} className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-opacity">
                  Register
               </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;