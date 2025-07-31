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

  private static readonly STORAGE_KEY = 'grok_api_key';

  // Save API key to localStorage
  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.STORAGE_KEY, apiKey);
  }

  // Get API key from localStorage
  static getApiKey(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  // Clear API key from localStorage
  static clearApiKey(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }],
          model: 'grok-2-1212',
          max_tokens: 10,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async evaluateIdea(idea: string): Promise<EvaluationResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('No API key found. Please set your Grok API key first.');
    }

    const systemPrompt = `You are Lovable, an AI startup idea evaluator built with Grok. Take a user's idea for a product, app, service, or business. Research it, give constructive feedback on innovation, scalability, and viability. Add 5-10 suggestions. Score each criterion out of 10, then an overall mark.

Follow these steps exactly. Base everything on research. Be encouraging, objective, detailed. Use UK English.

### 1. **RESEARCH EXISTENCE**
Search if the exact idea or similar ones exist, are in development, or launched. Look for products, startups, patents, apps, or discussions.

### 2. **ASSESS INNOVATION**
Even if similar, explain differentiation. Suggest new features, markets, tech, or unique value.

### 3. **ASSESS SCALABILITY**
Check growth potential - technical, market, operations.

### 4. **ASSESS VIABILITY**
Evaluate feasibility - demand, competition, monetisation, hurdles.

### 5. **PROVIDE SUGGESTIONS**
Give 5-10 actionable ideas to improve. Number them.

### 6. **SCORING**
Score out of 10 (higher = better).
- **Innovation**: Novelty/differentiation (1 = unoriginal, 10 = groundbreaking)
- **Scalability**: Growth ease (1 = limited, 10 = infinite)
- **Viability**: Success likelihood (1 = impractical, 10 = feasible)

**RETURN YOUR RESPONSE AS A JSON OBJECT WITH THIS EXACT STRUCTURE:**
{
  "researchSummary": "Your research findings here",
  "innovation": {
    "analysis": "Your innovation analysis here",
    "score": 8.2
  },
  "scalability": {
    "analysis": "Your scalability analysis here", 
    "score": 7.5
  },
  "viability": {
    "analysis": "Your viability analysis here",
    "score": 8.0
  },
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "etc"
  ],
  "overallScore": 7.9
}

Only return the JSON object, no other text.`;

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Evaluate this idea: ${idea}` }
          ],
          model: 'grok-2-1212',
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Grok API key.');
        }
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: GrokResponse = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response content received from API');
      }

      // Parse the JSON response
      try {
        const evaluation = JSON.parse(content) as EvaluationResult;
        
        // Validate the response structure
        if (!evaluation.researchSummary || !evaluation.innovation || !evaluation.scalability || 
            !evaluation.viability || !evaluation.suggestions || !evaluation.overallScore) {
          throw new Error('Invalid response structure from API');
        }

        return evaluation;
      } catch (parseError) {
        console.error('Failed to parse JSON response:', content);
        throw new Error('Failed to parse API response. Please try again.');
      }

    } catch (error) {
      console.error('Error calling Grok API:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to evaluate idea. Please try again.');
    }
  }
}