export type View = 'landing' | 'login' | 'register' | 'dashboard' | 'genome' | 'simulator' | 'pathway' | 'mentor' | 'profile';

export interface Skill {
  name: string;
  level: number; // 1-100
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type MentorPersona = 'friendly' | 'strict' | 'motivational';

export interface User {
    name: string;
    email: string;
}