import React, { useState } from 'react';
import Card from './common/Card';
import { type View, type User } from '../types';

interface RegisterPageProps {
  onRegister: (user: User) => void;
  setActiveView: (view: View) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, setActiveView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onRegister({ name, email });
    } else {
       alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 animate-fade-in-up">
       <div className="w-full max-w-md">
         <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-500">
              Create Your Account
            </h1>
            <p className="text-slate-400">Start your future-proof career journey now.</p>
         </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
             <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" aria-label="Password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-center font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              Create Account
            </button>
          </form>
           <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{' '}
            <button onClick={() => setActiveView('login')} className="font-semibold text-indigo-400 hover:text-indigo-300">
              Log in
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;