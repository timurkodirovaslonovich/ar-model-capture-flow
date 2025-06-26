
import React, { useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CSS3DBox } from './CSS3DBox';
import { CSS3DSphere } from './CSS3DSphere';
import { CSS3DCylinder } from './CSS3DCylinder';

interface ARViewerProps {
  capturedImage: string;
  onNewPhoto: () => void;
}

export const ARViewer: React.FC<ARViewerProps> = ({ capturedImage, onNewPhoto }) => {
  const [modelScale, setModelScale] = useState(1);
  const [modelRotation, setModelRotation] = useState(0);

  const handleScaleUp = () => {
    setModelScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleScaleDown = () => {
    setModelScale(prev => Math.max(prev - 0.2, 0.2));
  };

  const handleRotate = () => {
    setModelRotation(prev => prev + 45);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
        <div className="relative aspect-video">
          {/* Background captured image */}
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
          
          {/* CSS 3D AR Scene Overlay */}
          <div className="absolute inset-0 perspective-1000" style={{ perspective: '1000px' }}>
            <CSS3DBox scale={modelScale} rotation={modelRotation} />
            <CSS3DSphere scale={modelScale} />
            <CSS3DCylinder scale={modelScale} />
          </div>
          
          {/* AR Controls Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              onClick={handleScaleUp}
              size="sm"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-full w-10 h-10 p-0"
            >
              <ZoomIn size={16} />
            </Button>
            
            <Button
              onClick={handleScaleDown}
              size="sm"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-full w-10 h-10 p-0"
            >
              <ZoomOut size={16} />
            </Button>
            
            <Button
              onClick={handleRotate}
              size="sm"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-full w-10 h-10 p-0"
            >
              <RotateCcw size={16} />
            </Button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-white mb-1">AR Experience Active</h3>
              <p className="text-gray-300 text-sm">
                Use the controls to interact with your 3D models. Scale: {modelScale.toFixed(1)}x
              </p>
            </div>
            
            <Button
              onClick={onNewPhoto}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              <Camera className="mr-2" size={18} />
              New Photo
            </Button>
          </div>
        </div>
      </Card>
      
      <style jsx>{`
        @keyframes rotate3d {
          0% { transform: translate(-50%, -50%) scale(var(--scale)) rotateX(0deg) rotateY(var(--rotation)) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) scale(var(--scale)) rotateX(360deg) rotateY(calc(var(--rotation) + 360deg)) rotateZ(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) scale(var(--scale)) translateY(0px); }
          50% { transform: translate(-50%, -50%) scale(var(--scale)) translateY(-20px); }
        }
        
        @keyframes spin {
          0% { transform: translate(-50%, -50%) scale(var(--scale)) rotateX(0deg); }
          100% { transform: translate(-50%, -50%) scale(var(--scale)) rotateX(360deg); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};
