import React from 'react';
import { type View } from '../types';
import { GenomeIcon, SimulatorIcon, PathwayIcon, MentorIcon } from './common/icons';
import Footer from './Footer';
import Header from './Header';

interface LandingPageProps {
  setActiveView: (view: View) => void;
}

const features = [
  {
    icon: <GenomeIcon />,
    title: 'Decode Your Skill Genome',
    description: "Visualize your skills like never before. Our AI analyzes your strengths, identifies hidden talents, and benchmarks you against industry leaders, giving you a clear understanding of your professional DNA."
  },
  {
    icon: <SimulatorIcon />,
    title: 'Simulate Your Future Career',
    description: "Travel to the job markets of 2030, 2035, and beyond. See which roles your skills will be perfect for, understand future salary trends, and know what to learn next to stay ahead of the curve."
  },
  {
    icon: <PathwayIcon />,
    title: 'Build Personalized Pathways',
    description: "Your dream job isn't a distant fantasy. Enter any role, and our AI will generate a step-by-step roadmap, from learning new skills and finding micro-internships to building a killer portfolio."
  },
  {
    icon: <MentorIcon />,
    title: 'Consult Your AI Mentor',
    description: "Get guidance on your terms. Chat with a variety of AI personas—from a friendly college senior to a strict IIT professor—for tailored advice, interview prep, and motivation whenever you need it."
  },
];


const LandingPage: React.FC<LandingPageProps> = ({ setActiveView }) => {
  return (
    <div className="bg-slate-900 text-white">
      <Header activeView="landing" setActiveView={setActiveView} isAuthenticated={false} user={null} onLogout={() => {}} />

      <main>
        {/* Hero Section */}
        <section className="text-center py-20 sm:py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_30%,transparent)]"></div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-500">
              Navigate Tomorrow's Career, Today.
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-400">
              Margdarshak AI is your personalized career co-pilot, using advanced AI to map your skills, simulate future job markets, and build your unique path to success.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button 
                onClick={() => setActiveView('register')}
                className="px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 transition-opacity transform hover:scale-105"
              >
                Get Started for Free
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 px-4 bg-slate-900/50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold">A Smarter Way to Build Your Future</h2>
              <p className="mt-4 text-slate-400">
                Stop guessing what employers want. Our platform gives you the data-driven insights you need to make the right moves.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 transform transition-all duration-300 hover:border-indigo-500 hover:bg-slate-800">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-500/20 text-indigo-300 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">{feature.title}</h3>
                  <p className="mt-2 text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;