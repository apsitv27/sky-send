import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { EmailChips } from './EmailChips';
import { FileDropZone } from './FileDropZone';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  file: File;
  id: string;
}

export const EmailFileSharing: React.FC = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const canSend = emails.length > 0 && files.length > 0;

  const handleSend = async () => {
    if (!canSend) return;

    setIsLoading(true);
    
    try {
      // Simulate email sending process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Files sent successfully! ✅",
        description: `Sent to ${emails.length} recipient(s) with ${files.length} file(s)`,
      });

      // Reset form
      setEmails([]);
      setMessage('');
      setFiles([]);
    } catch (error) {
      toast({
        title: "Failed to send files",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Email File Sharing
        </h1>
        <div className="flex items-center justify-center gap-2 text-glass-highlight">
          <h2 className="text-xl font-medium">Share Files via Email</h2>
        </div>
        <p className="text-muted-foreground mt-2">Fast and secure file delivery</p>
      </div>

      {/* Main card */}
      <div className="glass-card rounded-3xl p-8 space-y-6">
        {/* Email recipients */}
        <EmailChips 
          emails={emails} 
          onEmailsChange={setEmails}
          maxEmails={5}
        />

        {/* Message field */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Message (Optional)
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message... (optional)"
            className="glass border-glass-border focus:border-gradient-start focus:ring-gradient-start/20 resize-none"
            rows={3}
          />
        </div>

        {/* File upload */}
        <FileDropZone 
          files={files}
          onFilesChange={setFiles}
        />

        {/* Send button */}
        <Button
          onClick={handleSend}
          disabled={!canSend || isLoading}
          className="w-full gradient-button text-white font-semibold py-3 rounded-xl text-lg"
          size="lg"
        >
          <Send className="mr-2 h-5 w-5" />
          {isLoading ? 'Sending Files...' : 'Send Files'}
        </Button>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-glass-border">
          <p className="text-xs text-muted-foreground">
            © 2025 Email File Sharing • Elegant UI Design
          </p>
        </div>
      </div>
    </div>
  );
};