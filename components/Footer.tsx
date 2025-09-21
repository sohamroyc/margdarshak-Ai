import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-500">
              Margdarshak AI
            </div>
            <p className="text-xs text-slate-500 mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;