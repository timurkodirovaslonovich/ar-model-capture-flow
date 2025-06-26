
import React from 'react';

interface CSS3DSphereProps {
  scale: number;
}

export const CSS3DSphere: React.FC<CSS3DSphereProps> = ({ scale }) => {
  return (
    <div 
      className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate(-50%, -50%) scale(${scale * 0.8})`,
        animation: 'float 3s ease-in-out infinite'
      }}
    >
      <div 
        className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ec4899, #be185d)',
          boxShadow: '0 8px 32px rgba(236, 72, 153, 0.3), inset -8px -8px 16px rgba(0, 0, 0, 0.2)'
        }}
      />
    </div>
  );
};
