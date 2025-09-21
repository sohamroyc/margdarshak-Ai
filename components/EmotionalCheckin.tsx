
import React, { useState } from 'react';
import Card from './common/Card';
import { generateEmotionalSupport } from '../services/geminiService';
import Loader from './common/Loader';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

interface EmotionalCheckinProps {
  onClose: () => void;
}

const EmotionalCheckin: React.FC<EmotionalCheckinProps> = ({ onClose }) => {
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const moods = ["Excited", "Stressed", "Curious", "Overwhelmed", "Confident", "Confused"];

  const handleMoodSelect = async (selectedMood: string) => {
    setMood(selectedMood);
    setIsLoading(true);
    setResponse('');
    const result = await generateEmotionalSupport(selectedMood);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up" onClick={onClose}>
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
         <Card title="Weekly Emotional Check-in" className="relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">&times;</button>
            {!response ? (
                <div>
                    <p className="text-slate-400 mb-4">How's the pressure this week? Let's check in.</p>
                    <div className="grid grid-cols-3 gap-2">
                        {moods.map(m => (
                            <button
                                key={m}
                                onClick={() => handleMoodSelect(m)}
                                disabled={isLoading}
                                className="p-3 bg-slate-700 hover:bg-indigo-600 rounded-lg text-sm transition-colors disabled:opacity-50"
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                    {isLoading && <Loader text={`Analyzing feelings of "${mood}"...`} />}
                </div>
            ) : (
                <div>
                    <p className="text-slate-400 mb-2">You're feeling: <span className="font-semibold text-indigo-400">{mood}</span></p>
                     <div className="prose prose-sm prose-invert bg-slate-900/50 p-3 rounded-lg">
                        <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                    <button
                        onClick={() => { setResponse(''); setMood(''); }}
                        className="mt-4 w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm transition-colors"
                    >
                        Check-in Again
                    </button>
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};

export default EmotionalCheckin;
