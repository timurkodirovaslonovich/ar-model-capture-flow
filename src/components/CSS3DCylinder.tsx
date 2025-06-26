
import React from 'react';

interface CSS3DCylinderProps {
  scale: number;
}

export const CSS3DCylinder: React.FC<CSS3DCylinderProps> = ({ scale }) => {
  return (
    <div 
      className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate(-50%, -50%) scale(${scale * 0.6})`,
        transformStyle: 'preserve-3d',
        animation: 'spin 4s linear infinite'
      }}
    >
      <div 
        className="relative w-12 h-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Cylinder body */}
        <div 
          className="absolute w-12 h-16 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg"
          style={{
            background: 'linear-gradient(90deg, #10b981, #059669)',
            boxShadow: 'inset -4px 0 8px rgba(0, 0, 0, 0.2)'
          }}
        />
        {/* Top circle */}
        <div 
          className="absolute w-12 h-3 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-full"
          style={{
            top: '-6px',
            left: '0',
            transform: 'rotateX(90deg)',
            transformOrigin: 'center bottom'
          }}
        />
        {/* Bottom circle */}
        <div 
          className="absolute w-12 h-3 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full"
          style={{
            bottom: '-6px',
            left: '0',
            transform: 'rotateX(90deg)',
            transformOrigin: 'center top'
          }}
        />
      </div>
    </div>
  );
};
