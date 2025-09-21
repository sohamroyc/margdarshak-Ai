
import React from 'react';
import Card from './common/Card';
import { type View, type User } from '../types';
import { GenomeIcon, SimulatorIcon, PathwayIcon, MentorIcon } from './common/icons';

interface DashboardProps {
  setActiveView: (view: View) => void;
  user: User | null;
}

const featureCards = [
  {
    view: 'genome' as View,
    icon: <GenomeIcon />,
    title: 'Skill Genome',
    description: 'Map your skills, identify strengths, and discover your unique professional DNA.'
  },
  {
    view: 'simulator' as View,
    icon: <SimulatorIcon />,
    title: 'Career Simulator',
    description: 'Time-travel to future job markets and see how your skills will fare in 2030 and beyond.'
  },
  {
    view: 'pathway' as View,
    icon: <PathwayIcon />,
    title: 'Pathway Builder',
    description: 'Get a personalized, step-by-step roadmap to achieve your dream career role.'
  },
  {
    view: 'mentor' as View,
    icon: <MentorIcon />,
    title: 'AI Mentor',
    description: 'Chat with adaptive AI personas for guidance, from a friendly senior to a strict professor.'
  }
];

const FeatureCard: React.FC<{
  view: View;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: (view: View) => void;
}> = ({ view, icon, title, description, onClick }) => (
  <div className="transform transition-transform duration-300 hover:-translate-y-2" onClick={() => onClick(view)}>
    <Card className="cursor-pointer h-full flex flex-col">
      <div className="flex items-center mb-3">
        <div className="bg-indigo-500/20 p-2 rounded-lg mr-4 text-indigo-300">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-200">{title}</h3>
      </div>
      <p className="text-sm text-slate-400 flex-grow">{description}</p>
      <button
        className="mt-4 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors self-start"
      >
        Explore &rarr;
      </button>
    </Card>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, user }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-500">
          Welcome back, {user?.name.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-lg text-slate-400">Your personal AI guide to a future-proof career.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureCards.map(card => (
          <FeatureCard 
            key={card.view}
            {...card}
            onClick={setActiveView}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;