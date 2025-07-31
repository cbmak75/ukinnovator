import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, Target, CheckCircle, Sparkles, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GrokService } from "@/services/GrokService";
import { ApiKeySetup } from "@/components/ApiKeySetup";

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

export const IdeaEvaluator = () => {
  const [idea, setIdea] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const apiKey = GrokService.getApiKey();
    setHasApiKey(!!apiKey);
  }, []);

  const handleEvaluate = async () => {
    if (!idea.trim()) {
      toast({
        title: "Please enter your idea",
        description: "Describe your product, app, service, or business idea to get started.",
        variant: "destructive",
      });
      return;
    }

    if (!hasApiKey) {
      setShowApiSetup(true);
      toast({
        title: "API key required",
        description: "Please set up your Grok API key to start evaluating ideas.",
        variant: "destructive",
      });
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);
    
    try {
      const result = await GrokService.evaluateIdea(idea);
      setEvaluation(result);
      toast({
        title: "Evaluation Complete! 🔥",
        description: "Your idea has been thoroughly analyzed by Grok AI.",
      });
    } catch (error) {
      console.error('Evaluation error:', error);
      toast({
        title: "Evaluation Failed",
        description: error instanceof Error ? error.message : "Failed to evaluate idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleApiKeySet = () => {
    setHasApiKey(true);
    setShowApiSetup(false);
    toast({
      title: "Ready to go! 🚀",
      description: "You can now start evaluating your ideas.",
    });
  };

  const handleShowApiSetup = () => {
    setShowApiSetup(true);
  };

  const handleEvaluateAnother = () => {
    setIdea("");
    setEvaluation(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-success";
    if (score >= 6) return "bg-warning";
    return "bg-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    return "Needs Work";
  };

  // Show API setup if needed
  if (showApiSetup || !hasApiKey) {
    return (
      <div className="min-h-screen bg-background p-4 space-y-8">
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-innovation animate-pulse-glow" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LOVABLE: BUILD THIS?
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI checks your idea with research-backed analysis, scoring innovation, scalability, and viability
          </p>
        </div>
        <ApiKeySetup onApiKeySet={handleApiKeySet} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-innovation animate-pulse-glow" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LOVABLE: BUILD THIS?
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI checks your idea with research-backed analysis, scoring innovation, scalability, and viability
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShowApiSetup}
          className="text-muted-foreground hover:text-innovation"
        >
          <Settings className="h-4 w-4 mr-1" />
          API Settings
        </Button>
      </div>

      {/* Input Section */}
      <Card className="max-w-4xl mx-auto border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-innovation" />
            Share Your Idea
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your product, app, service, or business idea in detail..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="min-h-32 bg-background/50 border-border/50"
          />
          <Button 
            variant="evaluate" 
            size="lg" 
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full"
          >
            {isEvaluating ? "Analyzing your idea..." : "Evaluate My Idea 🔥"}
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isEvaluating && (
        <Card className="max-w-4xl mx-auto border-border/50 animate-slide-up">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
              <Sparkles className="h-8 w-8 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-semibold">Lovable AI is researching your idea...</h3>
            <p className="text-muted-foreground">Analyzing market data, competition, and innovation potential</p>
            <Progress value={66} className="w-full max-w-md mx-auto" />
          </CardContent>
        </Card>
      )}

      {/* Evaluation Results */}
      {evaluation && (
        <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
          {/* Overall Score */}
          <Card className="border-success/50 bg-gradient-success/5">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-bold text-success mb-2">
                {evaluation.overallScore}/10
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">
                {getScoreLabel(evaluation.overallScore)}
              </Badge>
              <p className="text-muted-foreground mt-2">Overall Lovable Score</p>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-innovation">
                  <Lightbulb className="h-5 w-5" />
                  Innovation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{evaluation.innovation.score}</div>
                  <div className="flex-1">
                    <Progress 
                      value={evaluation.innovation.score * 10} 
                      className={`h-3 ${getScoreColor(evaluation.innovation.score)}`}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{evaluation.innovation.analysis}</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-info">
                  <TrendingUp className="h-5 w-5" />
                  Scalability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{evaluation.scalability.score}</div>
                  <div className="flex-1">
                    <Progress 
                      value={evaluation.scalability.score * 10} 
                      className={`h-3 ${getScoreColor(evaluation.scalability.score)}`}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{evaluation.scalability.analysis}</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Target className="h-5 w-5" />
                  Viability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{evaluation.viability.score}</div>
                  <div className="flex-1">
                    <Progress 
                      value={evaluation.viability.score * 10} 
                      className={`h-3 ${getScoreColor(evaluation.viability.score)}`}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{evaluation.viability.analysis}</p>
              </CardContent>
            </Card>
          </div>

          {/* Research Summary */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Research Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{evaluation.researchSummary}</p>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Suggestions for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {evaluation.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Badge variant="secondary" className="bg-innovation/20 text-innovation text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-sm flex-1">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-innovation/50 bg-gradient-primary/5">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to Build? 🚀</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your idea shows strong potential! Consider implementing the suggestions above and start building your MVP.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="innovation" size="lg">
                  Start Building with Lovable
                </Button>
                <Button variant="outline" size="lg" onClick={handleEvaluateAnother}>
                  Evaluate Another Idea
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};