import { generateWithGPT4 } from './gpt';

export interface AnalysisResult {
  score: number;
  suggestions: string[];
  risks: string[];
  timeline: string;
  phases: {
    startup: { duration: string; progress: number };
    enrollment: { duration: string; progress: number };
    analysis: { duration: string; progress: number };
  };
  statistics: {
    sampleSize: number;
    powerAnalysis: string;
    primaryEndpoint: string;
  };
  compliance: {
    regulatoryRequirements: string[];
    monitoringPlan: string;
    safetyReporting: string;
  };
}

export async function analyzeProtocol(content: string): Promise<AnalysisResult> {
  if (!content.trim()) {
    throw new Error('Protocol content is empty');
  }

  const systemPrompt = `You are an expert clinical trial protocol analyzer. Analyze the provided protocol content and provide a detailed analysis including:

1. Overall quality score (0-100)
2. Key suggestions for improvement
3. Potential risks and mitigation strategies
4. Timeline estimation with phases
5. Statistical considerations
6. Compliance requirements

Format your response as a valid JSON object with the following structure:
{
  "score": number,
  "suggestions": string[],
  "risks": string[],
  "timeline": string,
  "phases": {
    "startup": { "duration": string, "progress": number },
    "enrollment": { "duration": string, "progress": number },
    "analysis": { "duration": string, "progress": number }
  },
  "statistics": {
    "sampleSize": number,
    "powerAnalysis": string,
    "primaryEndpoint": string
  },
  "compliance": {
    "regulatoryRequirements": string[],
    "monitoringPlan": string,
    "safetyReporting": string
  }
}`;

  try {
    const response = await generateWithGPT4([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Analyze this protocol content:\n\n${content}` }
    ]);

    if (!response) {
      throw new Error('No response received from analysis service');
    }

    try {
      const parsedResponse = JSON.parse(response);
      
      // Validate required fields
      if (!parsedResponse.score || !Array.isArray(parsedResponse.suggestions) || !parsedResponse.phases) {
        throw new Error('Invalid response format: missing required fields');
      }

      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse protocol analysis:', parseError);
      throw new Error('Failed to parse analysis results');
    }
  } catch (error) {
    console.error('Protocol analysis error:', error);
    throw error instanceof Error ? error : new Error('Failed to analyze protocol');
  }
}