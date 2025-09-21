
import React, { useState } from 'react';
import Card from './common/Card';
import { type Skill } from '../types';
import { generateSkillGenomeAnalysis } from '../services/geminiService';
import Loader from './common/Loader';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

interface SkillGenomeProps {
    skills: Skill[];
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const SkillNode: React.FC<{ skill: Skill; onRemove: (name: string) => void }> = ({ skill, onRemove }) => (
    <div className="group relative flex items-center justify-between bg-slate-700/50 p-2 rounded-lg my-1 animate-fade-in-up">
        <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-400 mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-300">{skill.name}</span>
        </div>
        <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden ml-4">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
        </div>
        <button onClick={() => onRemove(skill.name)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
            &times;
        </button>
    </div>
);

const SkillGenome: React.FC<SkillGenomeProps> = ({ skills, setSkills }) => {
    const [newSkill, setNewSkill] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddSkill = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkill && !skills.some(s => s.name.toLowerCase() === newSkill.toLowerCase())) {
            setSkills([...skills, { name: newSkill, level: 50 }]); // Default level
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (name: string) => {
        setSkills(skills.filter(s => s.name !== name));
    };
    
    const handleAnalyze = async () => {
        setIsLoading(true);
        setAnalysis('');
        const result = await generateSkillGenomeAnalysis(skills);
        setAnalysis(result);
        setIsLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Your Skill Genome">
                <div className="space-y-2 mb-4">
                    {skills.map((skill) => (
                        <SkillNode key={skill.name} skill={skill} onRemove={handleRemoveSkill} />
                    ))}
                </div>
                <form onSubmit={handleAddSkill} className="flex space-x-2">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a new skill (e.g., Go)"
                        className="flex-grow bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button type="submit" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-semibold transition-colors">Add</button>
                </form>
                <button 
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="mt-4 w-full py-3 text-center font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze & Compare with Leader'}
                </button>
            </Card>
            <Card title="AI Analysis & Comparison">
                {isLoading && <Loader text="Generating analysis..." />}
                {analysis && (
                    <div className="prose prose-sm prose-invert prose-headings:text-indigo-400 prose-strong:text-slate-100">
                        <ReactMarkdown>{analysis}</ReactMarkdown>
                    </div>
                )}
                {!isLoading && !analysis && (
                    <div className="text-center text-slate-400 py-10">
                        <p>Click the "Analyze" button to see your personalized AI analysis and how you stack up against an industry leader.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default SkillGenome;