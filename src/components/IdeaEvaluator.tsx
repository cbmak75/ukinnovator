import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, Target, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const mockEvaluation: EvaluationResult = {
  researchSummary: "Initial research shows several similar concepts in the market including Rover, Wag, and Petco's telehealth services. However, AI-powered matching remains underexplored with significant differentiation opportunities.",
  innovation: {
    analysis: "AI matching algorithms for pet-owner-vet relationships represent a novel approach. Current solutions lack personalized matching based on pet behavior, medical history, and owner preferences.",
    score: 8.2
  },
  scalability: {
    analysis: "Strong scalability potential with cloud infrastructure. Network effects increase value as more vets and pet owners join. Global expansion possible with localized vet networks.",
    score: 8.7
  },
  viability: {
    analysis: "High market demand with $261B global pet industry. Clear monetization through subscription fees and commission structure. Regulatory hurdles manageable through proper veterinary partnerships.",
    score: 7.9
  },
  suggestions: [
    "Partner with established veterinary chains for immediate credibility and network access",
    "Implement blockchain for secure, portable pet medical records",
    "Add emergency consultation features for urgent pet health issues",
    "Develop AI-powered symptom checker for preliminary assessments",
    "Create loyalty rewards program for frequent users",
    "Integrate with pet insurance providers for seamless claims",
    "Build mobile-first experience with offline consultation booking",
    "Add community features for pet owner knowledge sharing"
  ],
  overallScore: 8.3
};

export const IdeaEvaluator = () => {
  const [idea, setIdea] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const { toast } = useToast();

  const handleEvaluate = async () => {
    if (!idea.trim()) {
      toast({
        title: "Please enter your idea",
        description: "Describe your product, app, service, or business idea to get started.",
        variant: "destructive",
      });
      return;
    }

    setIsEvaluating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setEvaluation(mockEvaluation);
      setIsEvaluating(false);
      toast({
        title: "Evaluation Complete! 🔥",
        description: "Your idea has been thoroughly analyzed by Lovable AI.",
      });
    }, 3000);
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
                <Button variant="outline" size="lg">
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