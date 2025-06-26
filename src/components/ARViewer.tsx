
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RotateCcw, ZoomIn, ZoomOut, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import * as THREE from 'three';

interface ARViewerProps {
  capturedImage: string;
  onNewPhoto: () => void;
}

// 3D Box Component
const AnimatedBox = ({ scale, rotation }: { scale: number; rotation: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={scale} rotation={[0, rotation * Math.PI / 180, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4F46E5" />
    </mesh>
  );
};

// 3D Sphere Component
const AnimatedSphere = ({ scale }: { scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]} scale={scale * 0.8}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#EC4899" />
    </mesh>
  );
};

// 3D Cylinder Component
const AnimatedCylinder = ({ scale }: { scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 0, 0]} scale={scale * 0.6}>
      <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      <meshStandardMaterial color="#10B981" />
    </mesh>
  );
};

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
          
          {/* 3D AR Scene Overlay */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <AnimatedBox scale={modelScale} rotation={modelRotation} />
                <AnimatedSphere scale={modelScale} />
                <AnimatedCylinder scale={modelScale} />
              </Suspense>
            </Canvas>
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
