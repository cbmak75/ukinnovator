import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const MAX_REQUESTS_PER_HOUR = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_IDEA_LENGTH = 5000;

interface GrokResponse {
  choices: Array<{
    message: { content: string };
  }>;
}

// Create a Supabase client with service role for rate limiting
function getServiceClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
}

// Persistent rate limiting using database
async function checkRateLimit(ipAddress: string): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getServiceClient();
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);
  
  try {
    // Get current request count for this IP within the window
    const { data: existing, error: selectError } = await supabase
      .from('rate_limits')
      .select('id, request_count, window_start')
      .eq('ip_address', ipAddress)
      .gte('window_start', windowStart.toISOString())
      .order('window_start', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (selectError) {
      console.error('[rate-limit] Select error:', selectError);
      // On error, allow the request but log it
      return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR };
    }

    if (existing) {
      // Check if limit exceeded
      if (existing.request_count >= MAX_REQUESTS_PER_HOUR) {
        return { allowed: false, remaining: 0 };
      }
      
      // Increment the counter
      const { error: updateError } = await supabase
        .from('rate_limits')
        .update({ request_count: existing.request_count + 1 })
        .eq('id', existing.id);
      
      if (updateError) {
        console.error('[rate-limit] Update error:', updateError);
      }
      
      return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - existing.request_count - 1 };
    } else {
      // Create new rate limit entry
      const { error: insertError } = await supabase
        .from('rate_limits')
        .insert({
          ip_address: ipAddress,
          request_count: 1,
          window_start: now.toISOString()
        });
      
      if (insertError) {
        console.error('[rate-limit] Insert error:', insertError);
      }
      
      return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - 1 };
    }
  } catch (e) {
    console.error('[rate-limit] Unexpected error:', e);
    // On error, allow the request
    return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR };
  }
}

// Cleanup old rate limit entries (called occasionally)
async function cleanupOldEntries(): Promise<void> {
  // Only cleanup 10% of the time to reduce DB load
  if (Math.random() > 0.1) return;
  
  try {
    const supabase = getServiceClient();
    await supabase.rpc('cleanup_old_rate_limits');
  } catch (e) {
    console.error('[rate-limit] Cleanup error:', e);
  }
}

serve(async (req: Request): Promise<Response> => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Get IP address for rate limiting
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                      req.headers.get('x-real-ip') || 
                      'unknown';
    
    // Check persistent rate limit
    const { allowed, remaining } = await checkRateLimit(ipAddress);
    
    if (!allowed) {
      console.warn(`[grok-evaluator] Rate limit exceeded for IP ${ipAddress}`);
      return new Response(JSON.stringify({ 
        error: `Rate limit exceeded. Maximum ${MAX_REQUESTS_PER_HOUR} requests per hour.` 
      }), {
        status: 429,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(MAX_REQUESTS_PER_HOUR),
          "X-RateLimit-Remaining": "0",
          "Retry-After": "3600"
        },
      });
    }

    const { idea } = await req.json();
    
    // Input validation
    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Missing or invalid 'idea'" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (idea.length > MAX_IDEA_LENGTH) {
      return new Response(JSON.stringify({ 
        error: `Idea too long. Maximum ${MAX_IDEA_LENGTH} characters allowed.` 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("GROK_API_KEY");
    if (!apiKey) {
      console.error("GROK_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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

    console.log("[grok-evaluator] Request from IP:", ipAddress, "| Idea length:", idea.length, "| Remaining requests:", remaining);

    const resp = await fetch('https://api.x.ai/v1/chat/completions', {
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

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("[grok-evaluator] Upstream error:", resp.status, errText);
      return new Response(JSON.stringify({ error: `Upstream error ${resp.status}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data: GrokResponse = await resp.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return new Response(JSON.stringify({ error: "No content in upstream response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let evaluation: unknown;
    try {
      evaluation = JSON.parse(content);
    } catch (e) {
      console.error("[grok-evaluator] JSON parse failed. Content:", content);
      return new Response(JSON.stringify({ error: "Failed to parse AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Basic validation
    const valid = evaluation && typeof evaluation === 'object' &&
      (evaluation as any).researchSummary && (evaluation as any).innovation &&
      (evaluation as any).scalability && (evaluation as any).viability &&
      Array.isArray((evaluation as any).suggestions) && typeof (evaluation as any).overallScore === 'number';

    if (!valid) {
      console.error("[grok-evaluator] Invalid structure:", evaluation);
      return new Response(JSON.stringify({ error: "Invalid evaluation structure" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Trigger occasional cleanup
    cleanupOldEntries();

    console.log("[grok-evaluator] Success");
    return new Response(JSON.stringify(evaluation), {
      status: 200,
      headers: { 
        ...corsHeaders, 
        "Content-Type": "application/json",
        "X-RateLimit-Limit": String(MAX_REQUESTS_PER_HOUR),
        "X-RateLimit-Remaining": String(remaining)
      },
    });
  } catch (e) {
    console.error("[grok-evaluator] Unexpected error:", e);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
