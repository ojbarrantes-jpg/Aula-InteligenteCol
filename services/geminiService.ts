import { GoogleGenAI } from "@google/genai";

export const generateAIResponse = async (fullPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-2.5-flash for speed and efficiency in this text task
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "No se recibió respuesta de la IA.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw new Error("Hubo un error al conectar con la IA. Por favor intenta de nuevo.");
  }
};