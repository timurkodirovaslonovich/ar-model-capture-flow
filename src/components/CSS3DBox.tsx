
import React from 'react';

interface CSS3DBoxProps {
  scale: number;
  rotation: number;
}

export const CSS3DBox: React.FC<CSS3DBoxProps> = ({ scale, rotation }) => {
  return (
    <div 
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate(-50%, -50%) scale(${scale}) rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d',
        animation: 'rotate3d 6s linear infinite'
      }}
    >
      <div 
        className="w-16 h-16 relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 border border-indigo-700" 
             style={{ transform: 'translateZ(32px)' }} />
        {/* Back face */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 border border-indigo-800" 
             style={{ transform: 'rotateY(180deg) translateZ(32px)' }} />
        {/* Right face */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-indigo-300 to-indigo-500 border border-indigo-600" 
             style={{ transform: 'rotateY(90deg) translateZ(32px)' }} />
        {/* Left face */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-800 border border-indigo-900" 
             style={{ transform: 'rotateY(-90deg) translateZ(32px)' }} />
        {/* Top face */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-indigo-200 to-indigo-400 border border-indigo-500" 
             style={{ transform: 'rotateX(90deg) translateZ(32px)' }} />
        {/* Bottom face */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-indigo-700 to-indigo-900 border border-indigo-900" 
             style={{ transform: 'rotateX(-90deg) translateZ(32px)' }} />
      </div>
    </div>
  );
};
