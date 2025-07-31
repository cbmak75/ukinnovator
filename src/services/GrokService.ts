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

Follow these steps exactly. Base everything on research. Be honest, objective, detailed, and use the FULL scoring range. Use UK English.

CRITICAL: FOR CONSISTENCY, follow the EXACT scoring criteria below. Same ideas should get similar scores.

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

### 6. **SCORING RULES - MUST BE CONSISTENT**
Use these EXACT criteria. Same concept types should score similarly.

**Innovation (1-10) - Rate based on differentiation and novelty:**
- 1-2: Direct copy of existing major solutions (Uber clone, Facebook clone)
- 3-4: Minor variations of existing solutions (different UI, slight feature changes)
- 5-6: Meaningful improvements to existing concepts (better UX, efficiency gains)
- 7-8: Significant innovation with unique approach (new business model, tech integration)
- 9-10: Revolutionary concepts that don't exist (breakthrough technology, paradigm shift)

**Scalability (1-10) - Rate based on growth potential:**
- 1-2: Local/personal service, physical constraints, manual processes
- 3-4: Regional potential, some automation, moderate tech requirements
- 5-6: National potential, good tech foundation, standard scaling challenges
- 7-8: Global potential, strong tech platform, network effects possible
- 9-10: Massive global scale, viral/exponential growth potential, platform effects

**Viability (1-10) - Rate based on market readiness and execution feasibility:**
- 1-2: No clear market, unrealistic assumptions, major technical hurdles
- 3-4: Niche market, unclear monetisation, significant challenges
- 5-6: Decent market size, clear revenue model, manageable challenges
- 7-8: Large market, proven demand, realistic execution path
- 9-10: Huge market, urgent need, clear path to profitability

**CONSISTENCY CHECKERS:**
- Food delivery app = Innovation: 2-3, Scalability: 6-7, Viability: 5-6
- AI-powered personal assistant = Innovation: 4-5, Scalability: 7-8, Viability: 6-7
- Social media platform = Innovation: 2-3, Scalability: 8-9, Viability: 3-4
- B2B SaaS tool = Innovation: 5-7, Scalability: 6-8, Viability: 6-8
- Hardware product = Innovation: 5-8, Scalability: 4-6, Viability: 4-6
- Marketplace = Innovation: 3-5, Scalability: 7-9, Viability: 5-7

**Overall Score = (Innovation + Scalability + Viability) / 3 (rounded to 1 decimal)**

**RETURN YOUR RESPONSE AS A JSON OBJECT WITH THIS EXACT STRUCTURE:**
{
  "researchSummary": "Your research findings here",
  "innovation": {
    "analysis": "Your innovation analysis with specific reference to scoring criteria",
    "score": 5.2
  },
  "scalability": {
    "analysis": "Your scalability analysis with specific reference to scoring criteria", 
    "score": 6.5
  },
  "viability": {
    "analysis": "Your viability analysis with specific reference to scoring criteria",
    "score": 5.8
  },
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "etc"
  ],
  "overallScore": 5.8
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
          temperature: 0.3,
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