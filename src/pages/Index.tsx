import React from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { EmailFileSharing } from '@/components/EmailFileSharing';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Header */}
      <header className="relative z-10 text-center py-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Email File Sharing
        </h1>
        <p className="text-muted-foreground mt-2">Fast and secure file delivery</p>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <EmailFileSharing />
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 border-t border-glass-border/20">
        <p className="text-xs text-muted-foreground">
          © 2025 Email File Sharing • Elegant UI Design
        </p>
      </footer>
    </div>
  );
};

export default Index;
