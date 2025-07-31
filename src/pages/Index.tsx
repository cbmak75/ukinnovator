import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { GrokService } from '@/services/GrokService';
import ApiKeyManager from '@/components/ApiKeyManager';
import { Lightbulb, Sparkles, TrendingUp, Target, CheckCircle, Settings } from 'lucide-react';

interface EvaluationResult {
  researchSummary: string;
  innovation: {
    score: number;
    analysis: string;
  };
  scalability: {
    score: number;
    analysis: string;
  };
  viability: {
    score: number;
    analysis: string;
  };
  suggestions: string[];
  overallScore: number;
}

const Index = () => {
  const [idea, setIdea] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showApiKeyManager, setShowApiKeyManager] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = () => {
    try {
      const apiKey = GrokService.getApiKey();
      setHasApiKey(!!apiKey);
    } catch (error) {
      console.error('Error checking API key:', error);
    }
  };

  const handleEvaluate = async () => {
    if (!idea.trim()) {
      toast({
        title: "Please enter an idea",
        description: "Enter your startup idea to get it evaluated.",
        variant: "destructive",
      });
      return;
    }

    if (!hasApiKey) {
      setShowApiKeyManager(true);
      return;
    }

    setIsEvaluating(true);
    try {
      const result = await GrokService.evaluateIdea(idea);
      setEvaluation(result);
      toast({
        title: "Evaluation complete!",
        description: "Your startup idea has been analyzed.",
      });
    } catch (error) {
      toast({
        title: "Evaluation failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleApiKeyUpdate = () => {
    checkApiKey();
    setShowApiKeyManager(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <h1 className="text-xl font-semibold">Startup Evaluator</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKeyManager(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {showApiKeyManager ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Settings</h2>
              <Button variant="outline" onClick={() => setShowApiKeyManager(false)}>
                Back to Evaluator
              </Button>
            </div>
            <ApiKeyManager onApiKeyUpdate={handleApiKeyUpdate} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Evaluate Your Startup Idea
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get AI-powered insights on innovation, scalability, and viability for your startup concept.
              </p>
            </div>

            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Tell us your idea</span>
                </CardTitle>
                <CardDescription>
                  Describe your startup idea in detail. The more specific you are, the better the evaluation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idea">Startup Idea</Label>
                  <Input
                    id="idea"
                    placeholder="e.g., A mobile app that connects local farmers with consumers for fresh produce delivery..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="min-h-[100px]"
                    disabled={isEvaluating}
                  />
                </div>
                <Button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !idea.trim()}
                  size="lg"
                  className="w-full"
                >
                  {isEvaluating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Evaluate Idea
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Loading Progress */}
            {isEvaluating && (
              <Card>
                <CardContent className="py-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm text-muted-foreground">
                        Analyzing your startup idea...
                      </span>
                    </div>
                    <Progress value={75} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Evaluation Results */}
            {evaluation && (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Overall Score</CardTitle>
                    <div className={`text-4xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                      {evaluation.overallScore}/100
                    </div>
                    <Badge variant="secondary" className="mx-auto">
                      {getScoreLabel(evaluation.overallScore)}
                    </Badge>
                  </CardHeader>
                </Card>

                {/* Detailed Scores */}
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-blue-500" />
                        <span>Innovation</span>
                      </CardTitle>
                      <div className={`text-2xl font-bold ${getScoreColor(evaluation.innovation.score)}`}>
                        {evaluation.innovation.score}/100
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.innovation.analysis}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span>Scalability</span>
                      </CardTitle>
                      <div className={`text-2xl font-bold ${getScoreColor(evaluation.scalability.score)}`}>
                        {evaluation.scalability.score}/100
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.scalability.analysis}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        <span>Viability</span>
                      </CardTitle>
                      <div className={`text-2xl font-bold ${getScoreColor(evaluation.viability.score)}`}>
                        {evaluation.viability.score}/100
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.viability.analysis}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Research Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Market Research Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {evaluation.researchSummary}
                    </p>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>
                      Actionable steps to improve your startup idea
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {evaluation.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIdea('');
                      setEvaluation(null);
                    }}
                  >
                    Evaluate Another Idea
                  </Button>
                  <Button>
                    Start Building
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
