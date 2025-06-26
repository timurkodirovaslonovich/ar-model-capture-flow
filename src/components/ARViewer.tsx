
import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ARViewerProps {
  capturedImage: string;
  onNewPhoto: () => void;
}

export const ARViewer: React.FC<ARViewerProps> = ({ capturedImage, onNewPhoto }) => {
  const sceneRef = useRef<HTMLElement>(null);
  const [modelScale, setModelScale] = useState(1);
  const [modelRotation, setModelRotation] = useState(0);

  useEffect(() => {
    // Load A-Frame scripts dynamically
    const loadAFrame = () => {
      if (!(window as any).AFRAME) {
        const script = document.createElement('script');
        script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
        script.onload = () => {
          console.log('A-Frame loaded successfully');
        };
        document.head.appendChild(script);
      }
    };

    loadAFrame();
  }, []);

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
          
          {/* A-Frame AR Scene Overlay */}
          <div className="absolute inset-0">
            <a-scene
              ref={sceneRef}
              embedded
              style={{ 
                width: '100%', 
                height: '100%',
                background: 'transparent'
              }}
              vr-mode-ui="enabled: false"
              device-orientation-permission-ui="enabled: false"
            >
              <a-camera 
                position="0 0 3" 
                look-controls="enabled: false"
                wasd-controls="enabled: false"
              />
              
              {/* 3D AR Model */}
              <a-box
                position="0 0 0"
                rotation={`0 ${modelRotation} 0`}
                scale={`${modelScale} ${modelScale} ${modelScale}`}
                color="#4F46E5"
                animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
                shadow="cast: true"
              />
              
              {/* Alternative models - can be switched */}
              <a-sphere
                position="2 0 0"
                radius="0.5"
                scale={`${modelScale * 0.8} ${modelScale * 0.8} ${modelScale * 0.8}`}
                color="#EC4899"
                animation="property: position; to: 2 1 0; dir: alternate; dur: 2000; loop: true"
              />
              
              <a-cylinder
                position="-2 0 0"
                radius="0.5"
                height="1"
                scale={`${modelScale * 0.6} ${modelScale * 0.6} ${modelScale * 0.6}`}
                color="#10B981"
                animation="property: rotation; to: 360 0 0; loop: true; dur: 3000"
              />
              
              {/* Lighting */}
              <a-light type="ambient" color="#404040" />
              <a-light type="point" position="2 4 4" />
            </a-scene>
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
    </div>
  );
};
