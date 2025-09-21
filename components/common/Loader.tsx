
import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Generating..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 my-4">
      <div className="w-8 h-8 border-4 border-slate-500 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
};

export default Loader;
