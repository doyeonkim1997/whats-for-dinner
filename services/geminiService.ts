import { GoogleGenAI, Type } from "@google/genai";
import { DinnerRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getDinnerRecommendation = async (retryCount = 0): Promise<DinnerRecommendation> => {
  const model = "gemini-2.5-flash";
  const maxRetries = 3;
  
  const prompt = `
    You are a Korean culinary expert. 
    Randomly select one popular dinner menu item commonly eaten in Korea. 
    The selection should be diverse (Korean, Chinese, Japanese, Western, etc.), 
    ranging from simple meals to special dishes.
    
    Return the result in JSON format with the following fields:
    - name: The name of the dish in Korean.
    - description: A short, mouth-watering description in Korean (1 sentence).
    - category: The specific type of cuisine (e.g., 한식, 중식, 양식, 분식, 야식, etc.).
    - calories: Approximate calories (e.g., "약 500kcal").
    - tags: A list of 2-3 short, descriptive keywords (adjectives or nouns) in Korean describing the taste, texture, or feeling (e.g., "얼큰함", "쫄깃함", "바삭바삭", "단짠", "해장용").
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            calories: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
          },
          required: ["name", "description", "category", "calories", "tags"],
        },
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from AI");
    }
    
    return JSON.parse(text) as DinnerRecommendation;
  } catch (error: any) {
    // Check for rate limiting (429) or service unavailable (503)
    const isRetryable = 
      error?.status === 429 || 
      error?.response?.status === 429 ||
      error?.status === 503 ||
      (error?.message && (error.message.includes('429') || error.message.includes('quota')));

    if (isRetryable && retryCount < maxRetries) {
      const waitTime = Math.pow(2, retryCount) * 1000 + Math.random() * 500; // Exponential backoff + jitter
      console.warn(`Attempt ${retryCount + 1} failed. Retrying in ${Math.round(waitTime)}ms...`);
      await delay(waitTime);
      return getDinnerRecommendation(retryCount + 1);
    }

    console.error("Error fetching dinner recommendation:", error);
    throw error;
  }
};