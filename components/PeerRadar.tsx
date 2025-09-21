
import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import { type Skill } from '../types';
import { analyzePeerComparison } from '../services/geminiService';
import Loader from './common/Loader';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

// This is a global because Recharts is loaded from a script tag.
declare const Recharts: any;

interface PeerRadarProps {
  skills: Skill[];
}

const samplePeerData = {
    'AI/ML': [
        { skill: 'Python', level: 90 },
        { skill: 'TensorFlow', level: 80 },
        { skill: 'PyTorch', level: 75 },
        { skill: 'Data Structures', level: 85 },
        { skill: 'Cloud (AWS/GCP)', level: 70 },
        { skill: 'React', level: 40 },
    ],
    'Web Dev': [
        { skill: 'React', level: 90 },
        { skill: 'Node.js', level: 85 },
        { skill: 'TypeScript', level: 80 },
        { skill: 'SQL/NoSQL', level: 75 },
        { skill: 'CI/CD', level: 65 },
        { skill: 'Python', level: 50 },
    ],
};

const PeerRadar: React.FC<PeerRadarProps> = ({ skills }) => {
    const [domain, setDomain] = useState<'AI/ML' | 'Web Dev'>('AI/ML');
    const [chartData, setChartData] = useState<any[]>([]);
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const peerSkills = samplePeerData[domain];
        const allSkillNames = [...new Set([...skills.map(s => s.name), ...peerSkills.map(s => s.skill)])];

        const data = allSkillNames.map(name => {
            const userSkill = skills.find(s => s.name === name);
            const peerSkill = peerSkills.find(s => s.skill === name);
            return {
                subject: name,
                A: userSkill ? userSkill.level : 0, // User
                B: peerSkill ? peerSkill.level : 0, // Peer Average
                fullMark: 100,
            };
        });
        setChartData(data);
        
        const fetchAnalysis = async () => {
            setIsLoading(true);
            const result = await analyzePeerComparison(skills, peerSkills);
            setAnalysis(result);
            setIsLoading(false);
        };
        fetchAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skills, domain]);

    const { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer } = Recharts;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
                 <Card title="Peer Comparison Radar">
                    <div className="flex justify-center space-x-2 mb-4">
                        <button onClick={() => setDomain('AI/ML')} className={`px-4 py-2 text-sm rounded-md ${domain === 'AI/ML' ? 'bg-indigo-600' : 'bg-slate-700'}`}>AI/ML Domain</button>
                        <button onClick={() => setDomain('Web Dev')} className={`px-4 py-2 text-sm rounded-md ${domain === 'Web Dev' ? 'bg-indigo-600' : 'bg-slate-700'}`}>Web Dev Domain</button>
                    </div>
                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="#4A5568" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'none' }} />
                                <Radar name="You" dataKey="A" stroke="#818CF8" fill="#818CF8" fillOpacity={0.6} />
                                <Radar name="Peer Average" dataKey="B" stroke="#A78BFA" fill="#A78BFA" fillOpacity={0.4} />
                                <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #2D3748', color: '#E2E8F0' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card title="Top Missing Skills Analysis">
                    {isLoading && <Loader text="Analyzing skill gaps..." />}
                    {analysis && (
                         <div className="prose prose-sm prose-invert prose-headings:text-indigo-400 prose-strong:text-slate-100">
                            <ReactMarkdown>{analysis}</ReactMarkdown>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default PeerRadar;