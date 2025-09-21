import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import { type User } from '../types';

interface ProfilePageProps {
    user: User | null;
    setUser: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, setUser }) => {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
    }, [user]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if(user) {
            setUser({ ...user, name, email });
            setIsEditing(false);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    if (!user) {
        return <div className="text-center text-slate-400">Loading profile...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card title="Your Profile">
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-slate-800/50 disabled:cursor-not-allowed"
                        />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:bg-slate-800/50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="flex justify-end space-x-4 pt-2">
                        {isEditing ? (
                            <>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 rounded-lg transition-opacity">
                                Edit Profile
                            </button>
                        )}
                    </div>
                    {successMessage && <p className="text-sm text-emerald-400 text-center mt-4">{successMessage}</p>}
                </form>
            </Card>
        </div>
    );
};

export default ProfilePage;