import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IdeaEvaluator } from "@/components/IdeaEvaluator";
import SiteHeader from "@/components/SiteHeader";


const Index = () => {
  const [showApp, setShowApp] = useState(false);
  const navigate = useNavigate();

  if (showApp) {
    return <IdeaEvaluator onBack={() => setShowApp(false)} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto text-center">
          <CardContent className="p-8">
            <p className="text-xl text-muted-foreground mb-6">
              Get instant AI‑powered feedback on your innovation, scalability, and viability.
            </p>

            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-innovation rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Innovation Analysis:</strong> Discover how unique and groundbreaking your idea really is
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-scalability rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Scalability Assessment:</strong> Understand your idea's potential for growth and expansion
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-viability rounded-full mt-2"></div>
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

            <div className="grid gap-3 sm:grid-cols-2">
              <Button onClick={() => setShowApp(true)} size="lg" className="w-full">
                Quick assessment
              </Button>
              <Button variant="outline" onClick={() => navigate('/detailed')} size="lg" className="w-full">
                Detailed assessment
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Powered by advanced AI • No signup required
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
