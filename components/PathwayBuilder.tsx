
import React, { useState } from 'react';
import Card from './common/Card';
import { type Skill } from '../types';
import { generateCareerPathway } from '../services/geminiService';
import Loader from './common/Loader';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';


interface PathwayBuilderProps {
  skills: Skill[];
}

const PathwayBuilder: React.FC<PathwayBuilderProps> = ({ skills }) => {
  const [targetRole, setTargetRole] = useState('');
  const [pathway, setPathway] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleBuildPathway = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole) return;

    setIsLoading(true);
    setPathway('');
    const result = await generateCareerPathway(skills, targetRole);
    setPathway(result);
    setIsLoading(false);
  };

  return (
    <Card title="Personalized Skill-to-Job Pathway">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <form onSubmit={handleBuildPathway} className="space-y-4">
            <div>
              <label htmlFor="targetRole" className="block text-sm font-medium text-slate-300 mb-1">
                Enter Your Target Career Role
              </label>
              <input
                id="targetRole"
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., AI Ethics Officer"
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !targetRole}
              className="w-full py-3 text-center font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isLoading ? 'Building...' : 'Build My Pathway'}
            </button>
          </form>
        </div>
        <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Your Roadmap to Success</h3>
            <div className="bg-slate-900/50 p-4 rounded-lg min-h-[200px]">
                {isLoading && <Loader text={`Building pathway to ${targetRole}...`} />}
                {pathway && (
                     <div className="prose prose-sm prose-invert prose-headings:text-indigo-400 prose-strong:text-slate-100">
                        <ReactMarkdown>{pathway}</ReactMarkdown>
                    </div>
                )}
                {!isLoading && !pathway && (
                    <div className="text-center text-slate-400 pt-10">
                        <p>Define your destination to generate a personalized career roadmap.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </Card>
  );
};

export default PathwayBuilder;