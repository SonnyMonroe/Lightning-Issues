import { GoogleGenAI } from "@google/genai";
import { IssueSuggestion, IssueType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseRepoUrl = (url: string): { owner: string; name: string } | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') return null;
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], name: parts[1] };
  } catch (e) {
    return null;
  }
};

export const generateIssueSuggestions = async (
  repoUrl: string, 
  projectGoals?: string, 
  scanTodos?: boolean
): Promise<IssueSuggestion[]> => {
  const repoInfo = parseRepoUrl(repoUrl);
  if (!repoInfo) {
    throw new Error("Invalid GitHub URL");
  }

  const model = "gemini-2.5-flash";
  
  // Construct the prompt based on optional inputs
  let specificInstructions = "";
  
  if (projectGoals && projectGoals.trim()) {
    specificInstructions += `\nThe user has specified the following Project Goals: "${projectGoals}". Please ensure at least one suggested issue aligns directly with these goals.\n`;
  }

  if (scanTodos) {
    specificInstructions += `\nCRITICAL INSTRUCTION: The user wants to scan for existing TODOs. Use Google Search to specifically look for "TODO", "FIXME" or "HACK" comments in the repository code (e.g. search query 'site:github.com/${repoInfo.owner}/${repoInfo.name} "TODO"'). If you find relevant TODOs, prioritize creating an issue to resolve them.\n`;
  }

  const prompt = `
    I have a GitHub repository at: ${repoUrl}
    
    Please analyze this repository. 
    1. Use Google Search to understand what this repository does, its main technologies, and if there are any common known issues or missing obvious features.
    2. Search specifically for "issues site:github.com/${repoInfo.owner}/${repoInfo.name}" to see existing problems.
    ${scanTodos ? '3. Search for TODO/FIXME comments in the code as requested.' : '3. Suggest 3 distinct issues that could be created for this repository.'}
    
    ${specificInstructions}

    For each suggestion, provide:
    - A clear, professional Title.
    - A very detailed Body in GitHub-flavored Markdown. 
    - The type of issue (Bug, Feature, Refactor, Documentation).
    - A short reasoning.

    IMPORTANT OUTPUT FORMAT:
    You must return a valid JSON array.
    Do not wrap the JSON in markdown code blocks.
    Start the response with '[' and end with ']'.

    Example:
    [
      {
        "title": "Example Title",
        "body": "Example Body",
        "type": "Feature",
        "reasoning": "Reasoning here"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No data received from AI");
    }

    // Robust JSON extraction
    let jsonStr = text.trim();
    
    // 1. Try to find the JSON array if there is extra text around it
    const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    // 2. Clean up any markdown code blocks that might still be present
    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '');

    try {
      return JSON.parse(jsonStr) as IssueSuggestion[];
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw text:", text);
      throw new Error("Failed to parse AI response. Please try again.");
    }

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("400")) {
       throw new Error("AI request failed. The repository might be private or inaccessible.");
    }
    throw new Error(error.message || "Failed to generate suggestions");
  }
};