import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IdeaEvaluator } from "@/components/IdeaEvaluator";
import fLogo from "@/assets/f-character-logo.png";

const Index = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <IdeaEvaluator />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto text-center">
        <CardContent className="p-8">
          <div className="mb-8">
            <img 
              src={fLogo} 
              alt="F Character" 
              className="w-32 h-32 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Founder Feedback
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Get instant AI-powered feedback on your startup ideas
            </p>
          </div>
          
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Innovation Analysis:</strong> Discover how unique and groundbreaking your idea really is
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Scalability Assessment:</strong> Understand your idea's potential for growth and expansion
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Viability Check:</strong> Get insights on market demand and business feasibility
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Actionable Suggestions:</strong> Receive concrete next steps to improve your concept
              </p>
            </div>
          </div>

          <Button 
            onClick={() => setShowApp(true)}
            size="lg"
            className="w-full max-w-sm"
          >
            Start Evaluating Your Idea
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Powered by advanced AI • No signup required
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
