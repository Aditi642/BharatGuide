import { GoogleGenAI, Type } from "@google/genai";
import { Place, Location, Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateHiddenGems = async (
  location: Location,
  language: Language
): Promise<Place[]> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    I am a tourist at Latitude: ${location.lat}, Longitude: ${location.lng} in India.
    Identify 3 specific, real, and interesting "hidden gem" tourist spots within 50km of this location.
    Prefer lesser-known but accessible historical sites, nature spots, or cultural landmarks.
    Return the response as a JSON array of objects.
    Each object must have:
    - name: string (in ${language})
    - description: string (short catchy description in ${language}, max 2 sentences)
    - category: one of 'History', 'Nature', 'Spiritual', 'Modern', 'Food'
    - rating: number (between 4.0 and 5.0)
    - tags: array of 2-3 short strings
    - lat: number
    - lng: number
    
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER },
            },
            required: ["name", "description", "category", "rating", "tags", "lat", "lng"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const rawPlaces = JSON.parse(text);
    
    // Transform to Place interface
    return rawPlaces.map((p: any, index: number) => ({
      id: `gem-${location.lat}-${index}`,
      name: p.name,
      description: p.description,
      location: { lat: p.lat, lng: p.lng },
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(p.name)}/600/800`, // Placeholder
      category: p.category as any,
      rating: p.rating,
      tags: p.tags
    }));

  } catch (error) {
    console.error("Gemini Discovery Error:", error);
    return [];
  }
};

export const chatWithArjun = async (
  history: { role: string; text: string }[],
  message: string,
  language: Language,
  currentContext?: string
): Promise<string> => {
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are Arjun, a witty, knowledgeable, and storytelling Indian historian and tour guide.
    You speak in a friendly, warm, and slightly poetic tone.
    You love sharing "did you know" facts about India.
    Your current language is: ${language}.
    If the user asks about a location, provide historical context and local legends.
    Keep responses concise (under 100 words) unless asked for details.
    ${currentContext ? `User context: ${currentContext}` : ''}
  `;

  try {
    // Construct chat history for the API
    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model,
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I am having trouble connecting to the history archives right now.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Something went wrong. Arjun is taking a tea break!";
  }
};