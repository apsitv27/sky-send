import React from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { EmailFileSharing } from '@/components/EmailFileSharing';

const Index = () => {
  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-4">
        <EmailFileSharing />
      </div>
    </div>
  );
};

export default Index;
