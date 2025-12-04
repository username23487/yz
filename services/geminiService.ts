import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateTimeTravelImage = async (
  base64Image: string,
  promptModifier: string
): Promise<string> => {
  const ai = getAiClient();
  
  // Clean base64 string (remove data URL prefix if present)
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Nano Banana for image editing
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `Edit this image to place the person ${promptModifier}. Ensure the face remains recognizable but matches the lighting and style of the scene. The output should be a high-quality, photorealistic image.`
          }
        ]
      }
    });

    // Extract the image from the response
    // Check all parts for inlineData
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image generated in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
