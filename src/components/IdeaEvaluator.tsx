import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, TrendingUp, Target, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GrokService } from "@/services/GrokService";

import { SlotMachine } from "@/components/SlotMachine";

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
  const [showSlotMachine, setShowSlotMachine] = useState(false);
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
    setEvaluation(null);
    
    try {
      const result = await GrokService.evaluateIdea(idea);
      
      // Show slot machine effect first
      setShowSlotMachine(true);
      setEvaluation({
        ...result,
        innovation: { ...result.innovation, score: 0 },
        scalability: { ...result.scalability, score: 0 },
        viability: { ...result.viability, score: 0 },
        overallScore: 0
      });
      
      // After a brief delay, show the real results with slot machine
      setTimeout(() => {
        setEvaluation(result);
      }, 100);
      
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
      // Reset slot machine after results are shown
      setTimeout(() => setShowSlotMachine(false), 3000);
    }
  };



  const handleEvaluateAnother = () => {
    setIdea("");
    setEvaluation(null);
    setShowSlotMachine(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-success";
    if (score >= 6) return "bg-warning";
    return "bg-destructive";
  };

  const getScoreLabel = (overallScore: number) => {
    if (overallScore >= 25) return "Exceptional";
    if (overallScore >= 20) return "Strong";
    if (overallScore >= 15) return "Decent";
    if (overallScore >= 10) return "Poor";
    return "Very Poor";
  };


  return (
    <div className="min-h-screen bg-background p-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-innovation animate-pulse-glow" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow-text">
            FF: FOUNDER FEEDBACK
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI checks your idea with research-backed analysis, scoring innovation, scalability, and viability 🚀
        </p>
      </div>

      {/* Input Section */}
      <Card className="max-w-4xl mx-auto border-innovation/30 backdrop-blur-sm shadow-glow-card bg-card/80">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Lightbulb className="h-6 w-6 text-innovation animate-pulse-glow" />
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-glow-text">
              Share Your Idea
            </span>
          </CardTitle>
          <p className="text-muted-foreground">
            Tell us about your brilliant idea and we'll give you detailed feedback! ✨
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Textarea
              placeholder="💡 Examples:
• A mobile app that helps people find local food trucks in real-time
• A platform connecting freelance graphic designers with small businesses
• An AI-powered personal finance coach for Gen Z
• A subscription service for eco-friendly home cleaning products
• A VR fitness game that makes working out feel like an adventure

Describe your product, app, service, or business idea in detail..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-40 text-lg bg-background/80 border-innovation/20 focus:border-innovation/50 focus:shadow-glow-primary transition-all duration-300 resize-none"
            />
            <div className="absolute top-3 right-3">
              <Sparkles className="h-5 w-5 text-innovation/40" />
            </div>
          </div>
          <Button 
            variant="evaluate" 
            size="lg" 
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full text-lg py-6 shadow-glow-primary hover:shadow-glow-primary transition-all duration-300"
          >
            {isEvaluating ? "🔍 Analyzing your idea..." : "🚀 Evaluate My Idea"}
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
            <h3 className="text-xl font-semibold">FF is researching your idea...</h3>
            <p className="text-muted-foreground">Analyzing market data, competition, and innovation potential</p>
            <Progress value={66} className="w-full max-w-md mx-auto" />
          </CardContent>
        </Card>
      )}

      {/* Evaluation Results */}
      {evaluation && (
        <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
          {/* Overall Score */}
          <Card className="border-success/50 bg-gradient-success/5 shadow-glow-card">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-bold text-success mb-2 h-20 flex items-center justify-center">
                {showSlotMachine && evaluation ? (
                  <div className="flex items-baseline gap-2">
                    <SlotMachine 
                      finalValue={evaluation.overallScore} 
                      duration={2500}
                      className="animate-glow-text"
                    />
                    <span className="text-3xl">/30</span>
                  </div>
                ) : (
                  <span className="animate-glow-text">{evaluation.overallScore}/30</span>
                )}
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success text-lg px-4 py-2">
                {getScoreLabel(evaluation.overallScore)}
              </Badge>
              <p className="text-muted-foreground mt-2 text-lg">Overall FF Score ⭐</p>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-innovation/30 shadow-glow-card hover:shadow-glow-primary transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-innovation animate-glow-text">
                  <Lightbulb className="h-5 w-5 animate-pulse-glow" />
                  Innovation 💡
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold h-12 flex items-center">
                    {showSlotMachine && evaluation ? (
                      <SlotMachine 
                        finalValue={evaluation.innovation.score} 
                        duration={2000}
                        className="animate-glow-text"
                      />
                    ) : (
                      <span className="animate-glow-text">{evaluation.innovation.score}</span>
                    )}
                  </div>
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

            <Card className="border-info/30 shadow-glow-card hover:shadow-glow-primary transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-info animate-glow-text">
                  <TrendingUp className="h-5 w-5 animate-pulse-glow" />
                  Scalability 📈
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold h-12 flex items-center">
                    {showSlotMachine && evaluation ? (
                      <SlotMachine 
                        finalValue={evaluation.scalability.score} 
                        duration={2200}
                        className="animate-glow-text"
                      />
                    ) : (
                      <span className="animate-glow-text">{evaluation.scalability.score}</span>
                    )}
                  </div>
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

            <Card className="border-success/30 shadow-glow-card hover:shadow-glow-primary transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success animate-glow-text">
                  <Target className="h-5 w-5 animate-pulse-glow" />
                  Viability 🎯
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold h-12 flex items-center">
                    {showSlotMachine && evaluation ? (
                      <SlotMachine 
                        finalValue={evaluation.viability.score} 
                        duration={2400}
                        className="animate-glow-text"
                      />
                    ) : (
                      <span className="animate-glow-text">{evaluation.viability.score}</span>
                    )}
                  </div>
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
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-glow-text">Ready to Build? 🚀</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your idea shows strong potential! Consider implementing the suggestions above and start building your MVP. ✨
              </p>
              <div className="flex justify-center">
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