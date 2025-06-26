
import React, { useState } from 'react';
import { Zap, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface WebhookTriggerProps {
  userEmail?: string;
}

export const WebhookTrigger: React.FC<WebhookTriggerProps> = ({ userEmail }) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast("Please enter your n8n webhook URL");
      return;
    }

    setIsLoading(true);
    console.log("Triggering n8n webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          user_email: userEmail || 'demo@example.com',
          event_type: 'photo_captured',
          app_name: 'AR Camera App',
          triggered_from: window.location.origin,
        }),
      });

      toast("n8n workflow triggered! Check your n8n dashboard for execution details.");
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast("Request sent to n8n. Please check your workflow execution.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-orange-500 to-yellow-600 text-white w-fit">
          <Zap size={24} />
        </div>
        <CardTitle className="text-orange-800">n8n Automation</CardTitle>
        <CardDescription className="text-orange-600">
          Connect your n8n workflows to automate backend processes
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleTrigger} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook" className="text-orange-800">n8n Webhook URL</Label>
            <Input
              id="webhook"
              type="url"
              placeholder="https://your-n8n.app/webhook/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="border-orange-300 focus:border-orange-500"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-semibold py-2 rounded-full transition-all duration-200"
          >
            {isLoading ? 'Triggering...' : <><Send className="mr-2" size={16} />Trigger Workflow</>}
          </Button>
        </form>
        
        <div className="mt-4 text-xs text-orange-600">
          <p>This will send user data and photo capture events to your n8n workflow for automated processing.</p>
        </div>
      </CardContent>
    </Card>
  );
};
