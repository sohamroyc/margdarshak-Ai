
import React, { useState } from 'react';
import Card from './common/Card';
import { type Skill } from '../types';
import { generateCareerForecast } from '../services/geminiService';
import Loader from './common/Loader';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';


interface CareerSimulatorProps {
  skills: Skill[];
}

const CareerSimulator: React.FC<CareerSimulatorProps> = ({ skills }) => {
  const [year, setYear] = useState<number>(2030);
  const [forecast, setForecast] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSimulate = async () => {
    setIsLoading(true);
    setForecast('');
    const result = await generateCareerForecast(skills, year);
    setForecast(result);
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card title="Time Travel Controls">
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">Select a year to simulate the job market based on your current skills.</p>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded-lg">
              <span className="font-mono text-4xl text-indigo-400">{year}</span>
              <div className="flex flex-col space-y-2">
                {[2030, 2035, 2040].map(y => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`px-4 py-1 text-sm rounded-md transition-colors ${year === y ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleSimulate}
              disabled={isLoading}
              className="w-full py-3 text-center font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isLoading ? 'Simulating...' : 'Launch Simulation'}
            </button>
          </div>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card title={`Future Snapshot: ${year}`}>
            {isLoading && <Loader text={`Traveling to ${year}...`} />}
            {forecast && (
                <div className="prose prose-sm prose-invert prose-headings:text-indigo-400 prose-strong:text-slate-100">
                    <ReactMarkdown>{forecast}</ReactMarkdown>
                </div>
            )}
            {!isLoading && !forecast && (
                 <div className="text-center text-slate-400 py-20">
                    <p className="text-lg">Your future awaits.</p>
                    <p>Select a year and launch the simulation to get your personalized career forecast.</p>
                </div>
            )}
        </Card>
      </div>
    </div>
  );
};

export default CareerSimulator;