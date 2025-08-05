import React from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { EmailFileSharing } from '@/components/EmailFileSharing';

const Index = () => {
  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center p-2">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm mx-auto scale-80">
        <EmailFileSharing />
      </div>
    </div>
  );
};

export default Index;
