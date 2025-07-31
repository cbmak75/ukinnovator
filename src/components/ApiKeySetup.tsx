import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Key, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { GrokService } from "@/services/GrokService";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

export const ApiKeySetup = ({ onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleValidateAndSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Please enter your API key",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      const isValidKey = await GrokService.testApiKey(apiKey.trim());
      
      if (isValidKey) {
        GrokService.saveApiKey(apiKey.trim());
        setIsValid(true);
        toast({
          title: "API key validated successfully! 🎉",
          description: "You can now start evaluating ideas.",
        });
        onApiKeySet();
      } else {
        setIsValid(false);
        toast({
          title: "Invalid API key",
          description: "Please check your Grok API key and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Validation failed",
        description: "Unable to validate API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearKey = () => {
    GrokService.clearApiKey();
    setApiKey("");
    setIsValid(null);
    toast({
      title: "API key cleared",
      description: "You'll need to enter a new API key to continue.",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto border-border/50">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Key className="h-6 w-6 text-innovation" />
          <CardTitle>Setup Grok API Key</CardTitle>
        </div>
        <p className="text-muted-foreground">
          Connect your Grok API to start evaluating ideas with real AI analysis
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p><strong>For security:</strong> Consider connecting to Supabase for secure API key storage.</p>
              <p>Currently using localStorage (keys stay in your browser only).</p>
            </div>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="apiKey">Grok API Key</Label>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => window.open('https://console.x.ai/', '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Get API Key
              </Button>
            </div>
            <div className="relative">
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Grok API key..."
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsValid(null);
                }}
                className="pr-10"
              />
              {isValid !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValid ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleValidateAndSave}
              disabled={isValidating || !apiKey.trim()}
              variant="innovation"
              className="flex-1"
            >
              {isValidating ? "Validating..." : "Validate & Save"}
            </Button>
            
            {GrokService.getApiKey() && (
              <Button
                variant="outline"
                onClick={handleClearKey}
              >
                Clear Key
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">How to get your Grok API key:</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-6 h-6 text-xs p-0 flex items-center justify-center">1</Badge>
              <span>Visit <a href="https://console.x.ai/" target="_blank" rel="noopener noreferrer" className="text-innovation hover:underline">console.x.ai</a> and create an account</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-6 h-6 text-xs p-0 flex items-center justify-center">2</Badge>
              <span>Navigate to the API Keys section</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-6 h-6 text-xs p-0 flex items-center justify-center">3</Badge>
              <span>Create a new API key and copy it here</span>
            </div>
          </div>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            <strong>Note:</strong> This app stores your API key locally in your browser. 
            For production apps, consider using Supabase for secure server-side storage.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};