
import React, { useState, useRef, useEffect } from 'react';
import Card from './common/Card';
import { type Skill, type ChatMessage, type MentorPersona } from '../types';
import { createChatSession } from '../services/geminiService';
import { MENTOR_PERSONAS } from '../constants';
import { type Chat } from '@google/genai';

interface AiMentorProps {
    skills: Skill[];
}

const AiMentor: React.FC<AiMentorProps> = ({ skills }) => {
    const [persona, setPersona] = useState<MentorPersona>('friendly');
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const initialMessages: ChatMessage[] = [{
            role: 'model',
            text: `Hello! I'm your AI Mentor. I'm currently in ${MENTOR_PERSONAS[persona].name} mode. How can I help you with your career today?`
        }];
        setMessages(initialMessages);
        setChatSession(createChatSession(persona, skills));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [persona, skills]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chatSession) return;
        
        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            let fullResponse = "";
            setMessages(prev => [...prev, { role: 'model', text: '...' }]);
            const responseStream = await chatSession.sendMessageStream({ message: input });

            for await (const chunk of responseStream) {
                fullResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: fullResponse };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card title="Adaptive AI Mentor">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                    <h3 className="text-md font-semibold text-slate-300 mb-2">Select Persona</h3>
                    <div className="space-y-2">
                        {(Object.keys(MENTOR_PERSONAS) as MentorPersona[]).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPersona(p)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${persona === p ? `text-white shadow-lg ${MENTOR_PERSONAS[p].bgColor}` : 'bg-slate-700 hover:bg-slate-600'}`}
                            >
                                {MENTOR_PERSONAS[p].name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="md:w-3/4 flex flex-col h-[60vh]">
                    <div className="flex-grow overflow-y-auto bg-slate-900/70 p-4 rounded-t-lg space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length-1]?.role === 'user' && (
                            <div className="flex justify-start">
                                <div className="max-w-md p-3 rounded-lg bg-slate-700 text-slate-200">
                                    <p className="text-sm animate-pulse">...</p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="flex p-2 bg-slate-800 rounded-b-lg border-t border-slate-700">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask your mentor anything... (e.g., 'Bhaiya, kya main AI engineer ban paunga?')"
                            className="flex-grow bg-slate-800 px-3 py-2 text-sm focus:outline-none"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-semibold transition-colors disabled:opacity-50">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default AiMentor;