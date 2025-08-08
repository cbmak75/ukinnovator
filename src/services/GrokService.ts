import { supabase } from '@/integrations/supabase/client';

interface GrokResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface EvaluationResult {
  researchSummary: string;
  innovation: {
    analysis: string;
    score: number;
  };
  scalability: {
    analysis: string;
    score: number;
  };
  viability: {
    analysis: string;
    score: number;
  };
  suggestions: string[];
  overallScore: number;
}

export class GrokService {
  private static readonly API_URL = 'https://api.x.ai/v1/chat/completions';


  static async testApiKey(_apiKey: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('grok-evaluator', {
        body: { idea: 'Health check' },
      });
      if (error) return false;
      return !!data;
    } catch (error) {
      console.error('Error testing backend function:', error);
      return false;
    }
  }

  static async evaluateIdea(idea: string): Promise<EvaluationResult> {
    try {
      const prompt = `${idea}\n\nPlease respond using UK English spelling and grammar throughout the assessment.`;
      const { data, error } = await supabase.functions.invoke('grok-evaluator', {
        body: { idea: prompt },
      });

      if (error) {
        throw new Error(error.message || 'Edge function error');
      }

      const evaluation = data as EvaluationResult;
      if (
        !evaluation ||
        !evaluation.researchSummary ||
        !evaluation.innovation ||
        !evaluation.scalability ||
        !evaluation.viability ||
        !evaluation.suggestions ||
        typeof evaluation.overallScore !== 'number'
      ) {
        throw new Error('Invalid response structure from backend');
      }

      return evaluation;
    } catch (error) {
      console.error('Error invoking grok-evaluator function:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to evaluate idea. Please try again.');
    }
  }

}