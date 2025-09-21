
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-1 relative overflow-hidden ${className}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10"></div>
        <div className="relative z-10 p-4 sm:p-6">
            {title && <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">{title}</h2>}
            {children}
        </div>
    </div>
  );
};

export default Card;
