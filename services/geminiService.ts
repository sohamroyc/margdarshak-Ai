
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { type Skill, type MentorPersona } from '../types';
import { MENTOR_PERSONAS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateSkillGenomeAnalysis = async (skills: Skill[]): Promise<string> => {
    try {
        const skillsString = skills.map(s => `${s.name} (Proficiency: ${s.level}/100)`).join(', ');
        const prompt = `Analyze this student's 'Skill Genome': ${skillsString}. Provide a brief, futuristic-sounding analysis of their strengths, potential, and one key area for growth. Then, generate a fictional 'Skill Genome' of an industry leader in a related field (e.g., 'Chief AI Architect') for comparison, highlighting 2-3 skills the student should aim for. Format the response in Markdown.`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating skill genome analysis:", error);
        return "An error occurred while analyzing the skill genome. Please try again.";
    }
};

export const generateCareerForecast = async (skills: Skill[], year: number): Promise<string> => {
    try {
        const skillsString = skills.map(s => s.name).join(', ');
        const prompt = `Based on the current skill set of [${skillsString}], project future job market trends for the year ${year}. Describe 3 potential futuristic job roles, estimated salary trends (in INR), and the key new skills that would be in demand. Present this as an exciting 'Future Snapshot' report. Format the response in Markdown with headings.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating career forecast:", error);
        return "An error occurred while simulating the future. Please try again.";
    }
};


export const generateCareerPathway = async (skills: Skill[], targetRole: string): Promise<string> => {
    try {
        const skillsString = skills.map(s => `${s.name} (${s.level}/100)`).join(', ');
        const prompt = `A student with skills [${skillsString}] wants to become a ${targetRole}. Create a personalized, step-by-step interactive-style map to guide them. The path should include: learning new skills, practical projects, potential micro-internships, and portfolio-building activities. Make it encouraging and actionable. Format as a numbered list in Markdown.`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating career pathway:", error);
        return "An error occurred while building the pathway. Please try again.";
    }
};

// FIX: Add missing analyzePeerComparison function
export const analyzePeerComparison = async (userSkills: Skill[], peerSkills: { skill: string, level: number }[]): Promise<string> => {
    try {
        const userSkillsString = userSkills.map(s => `${s.name} (Level: ${s.level}/100)`).join(', ');
        const peerSkillsString = peerSkills.map(s => `${s.skill} (Level: ${s.level}/100)`).join(', ');
        const prompt = `Analyze the user's skill gaps compared to their peers for a job in their domain.
User's skills: [${userSkillsString}].
Average peer skills: [${peerSkillsString}].

Identify the top 2-3 most critical skills the user is missing or is significantly weaker in. For each of these skills, provide a brief, actionable suggestion on how to start learning it. The tone should be encouraging and constructive. Format the response in Markdown.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing peer comparison:", error);
        return "An error occurred while analyzing your skill gaps. Please try again.";
    }
};

export const generateEmotionalSupport = async (mood: string): Promise<string> => {
    try {
        const prompt = `A student is feeling "${mood}". Respond as an empathetic AI career mentor. Validate their feelings, offer a brief, comforting message, and provide one simple, actionable tip to help them manage their stress or feelings related to their career journey. Keep it concise and supportive.`;
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating emotional support:", error);
        return "I'm sorry, I couldn't process that right now. Remember to take a break if you need one.";
    }
};

export const createChatSession = (persona: MentorPersona, skills: Skill[]): Chat => {
    const skillsString = skills.map(s => s.name).join(', ');
    const personaPrompt = MENTOR_PERSONAS[persona].prompt;
    const systemInstruction = `${personaPrompt} The student you are mentoring has the following skills: ${skillsString}. Use this context to inform your guidance.`;

    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
        },
    });
    return chat;
};
