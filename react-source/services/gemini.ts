
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getStylingAdvice = async (userGoal: string) => {
  if (!API_KEY) return "AI Styling is currently unavailable. Please provide an API Key.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional activewear stylist for ATHŸRE. 
      A customer is looking for gear advice. Their goal or activity is: "${userGoal}".
      Provide a short, motivating styling recommendation (max 3 sentences) that suggests 
      what type of gear (Tops, Bottoms, Outerwear) would be best from our 'Rise' collection.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text || "I recommend looking for high-performance pieces that move with you.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I recommend our versatile Rise Collection pieces for your journey.";
  }
};
