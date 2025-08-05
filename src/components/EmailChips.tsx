import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface EmailChipsProps {
  emails: string[];
  onEmailsChange: (emails: string[]) => void;
  maxEmails?: number;
}

export const EmailChips: React.FC<EmailChipsProps> = ({ 
  emails, 
  onEmailsChange, 
  maxEmails = 5 
}) => {
  const [inputValue, setInputValue] = useState('');

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmail = () => {
    const trimmedEmail = inputValue.trim();
    if (
      trimmedEmail &&
      isValidEmail(trimmedEmail) &&
      !emails.includes(trimmedEmail) &&
      emails.length < maxEmails
    ) {
      onEmailsChange([...emails, trimmedEmail]);
      setInputValue('');
    }
  };

  const removeEmail = (emailToRemove: string) => {
    onEmailsChange(emails.filter(email => email !== emailToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        📧 Recipient Email(s)
        <span className="text-xs text-muted-foreground">
          ({emails.length}/{maxEmails})
        </span>
      </label>
      
      {/* Email chips display */}
      {emails.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {emails.map((email, index) => (
            <div key={index} className="email-chip">
              <span className="text-glass-highlight">{email}</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 hover:bg-destructive/20"
                onClick={() => removeEmail(email)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Email input */}
      <div className="flex gap-2">
        <Input
          type="email"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            emails.length >= maxEmails 
              ? `Maximum ${maxEmails} emails reached` 
              : "Enter email address..."
          }
          disabled={emails.length >= maxEmails}
          className="glass border-glass-border focus:border-gradient-start focus:ring-gradient-start/20"
        />
        <Button
          type="button"
          size="sm"
          onClick={addEmail}
          disabled={!inputValue.trim() || !isValidEmail(inputValue.trim()) || emails.length >= maxEmails}
          className="gradient-button px-3"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Enter up to {maxEmails} email addresses. Press Enter or click + to add.
      </p>
    </div>
  );
};