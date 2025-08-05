import React from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { EmailFileSharing } from '@/components/EmailFileSharing';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <EmailFileSharing />
      </div>
    </div>
  );
};

export default Index;
