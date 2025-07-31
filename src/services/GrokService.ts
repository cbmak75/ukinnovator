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
Use these EXACT criteria. Each criterion is INDEPENDENT and focuses on different aspects.

**Innovation (1-10) - Rate PURELY on novelty and differentiation:**
- 1-2: Direct copy of existing major solutions (Uber clone, Facebook clone)
- 3-4: Minor variations of existing solutions (different UI, slight feature changes)
- 5-6: Meaningful improvements to existing concepts (better UX, efficiency gains)
- 7-8: Significant innovation with unique approach (new business model, tech integration)
- 9-10: Revolutionary concepts that don't exist (breakthrough technology, paradigm shift)

**Scalability (1-10) - Rate PURELY on growth potential (regardless of innovation):**
- 1-2: Local/personal service, physical constraints, manual processes only
- 3-4: Regional potential, some automation, moderate tech requirements
- 5-6: National potential, good tech foundation, standard scaling challenges
- 7-8: Global potential, strong tech platform, network effects possible
- 9-10: Massive global scale, viral/exponential growth potential, platform effects

**Viability (1-10) - Rate PURELY on market readiness and execution feasibility:**
- 1-2: No clear market, unrealistic assumptions, major technical/regulatory hurdles
- 3-4: Niche market, unclear monetisation, significant execution challenges
- 5-6: Decent market size, clear revenue model, manageable challenges
- 7-8: Large market, proven demand, realistic execution path
- 9-10: Huge market, urgent need, clear path to profitability, low barriers

**IMPORTANT: Each score is INDEPENDENT. Examples:**
- A highly innovative idea (9/10) might have poor scalability (3/10) due to niche market
- A non-innovative idea (3/10) might have excellent scalability (8/10) if it's a proven model
- A scalable idea (8/10) might have poor viability (4/10) due to regulatory issues

**Overall Score = Innovation + Scalability + Viability (out of 30 total)**
- 25-30: Exceptional opportunity across all dimensions
- 20-24: Strong overall opportunity with some weaknesses
- 15-19: Decent opportunity but significant challenges
- 10-14: Poor opportunity, major issues in multiple areas
- 5-9: Very poor opportunity, fundamental problems

**RETURN YOUR RESPONSE AS A JSON OBJECT WITH THIS EXACT STRUCTURE:**
{
  "researchSummary": "Your research findings here",
  "innovation": {
    "analysis": "Focus ONLY on novelty and differentiation vs existing solutions",
    "score": 5
  },
  "scalability": {
    "analysis": "Focus ONLY on growth potential and scaling mechanisms", 
    "score": 8
  },
  "viability": {
    "analysis": "Focus ONLY on market demand, execution feasibility, and monetisation",
    "score": 6
  },
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "etc"
  ],
  "overallScore": 19
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