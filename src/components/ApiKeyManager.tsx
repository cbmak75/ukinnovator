import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { GrokService } from '@/services/GrokService';
import { CheckCircle, XCircle, Settings, ExternalLink } from 'lucide-react';

interface ApiKeyManagerProps {
  onApiKeyUpdate?: () => void;
}

const ApiKeyManager = ({ onApiKeyUpdate }: ApiKeyManagerProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkExistingApiKey();
  }, []);

  const checkExistingApiKey = async () => {
    try {
      const existingKey = await GrokService.getApiKey();
      setHasApiKey(!!existingKey);
      if (existingKey) {
        setApiKey('••••••••••••••••••••');
        setIsValid(true);
      }
    } catch (error) {
      console.error('Error checking API key:', error);
    }
  };

  const handleValidateAndSave = async () => {
    if (!apiKey.trim()) return;

    setIsValidating(true);
    try {
      const isValidKey = await GrokService.testApiKey(apiKey);
      
      if (isValidKey) {
        await GrokService.saveApiKey(apiKey);
        setIsValid(true);
        setHasApiKey(true);
        setApiKey('••••••••••••••••••••');
        toast({
          title: "Success!",
          description: "Your Grok API key has been saved successfully.",
        });
        onApiKeyUpdate?.();
      } else {
        setIsValid(false);
        toast({
          title: "Invalid API Key",
          description: "The API key you entered is not valid. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsValid(false);
      toast({
        title: "Error",
        description: "Failed to validate API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleClearKey = async () => {
    try {
      await GrokService.clearApiKey();
      setApiKey('');
      setIsValid(null);
      setHasApiKey(false);
      toast({
        title: "API Key Cleared",
        description: "Your Grok API key has been removed.",
      });
      onApiKeyUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditKey = () => {
    setApiKey('');
    setIsValid(null);
    setHasApiKey(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <div>
            <CardTitle className="text-lg">API Key Settings</CardTitle>
            <CardDescription>
              Configure your Grok API key to enable idea evaluation
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasApiKey ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="api-key">Grok API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Grok API key"
                  className="flex-1"
                />
                <Button 
                  onClick={handleValidateAndSave}
                  disabled={!apiKey.trim() || isValidating}
                  className="shrink-0"
                >
                  {isValidating ? "Validating..." : "Save"}
                </Button>
              </div>
              {isValid === false && (
                <div className="flex items-center space-x-2 text-destructive">
                  <XCircle className="w-4 h-4" />
                  <span className="text-sm">Invalid API key</span>
                </div>
              )}
            </div>
            
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">How to get your Grok API key:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Visit the X.AI Console</li>
                    <li>Sign in or create an account</li>
                    <li>Navigate to the API Keys section</li>
                    <li>Generate a new API key</li>
                    <li>Copy and paste it above</li>
                  </ol>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open X.AI Console
                    </a>
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">API Key Configured</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleEditKey}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearKey}>
                  Remove
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your Grok API key is securely stored and ready to use for evaluating startup ideas.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;