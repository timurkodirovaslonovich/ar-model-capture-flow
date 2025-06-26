
import React, { useRef, useState, useCallback } from 'react';
import { Camera, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CameraCaptureProps {
  onPhotoCapture: (imageData: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onPhotoCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setHasPermission(true);
        toast("Camera ready! Tap capture to take a photo");
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasPermission(false);
      toast("Camera access denied. Please enable camera permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        onPhotoCapture(imageData);
        stopCamera();
        toast("Photo captured! AR model loading...");
      }
    }
  }, [onPhotoCapture, stopCamera]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
        {!isStreaming ? (
          <div className="aspect-video flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
              <Camera size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Capture?</h3>
            <p className="text-gray-300 mb-6">Start your camera to capture photos for AR experience</p>
            <Button 
              onClick={startCamera}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              <Camera className="mr-2" size={20} />
              Start Camera
            </Button>
            {hasPermission === false && (
              <p className="text-red-400 text-sm mt-4">
                Camera permission required. Please enable in your browser settings.
              </p>
            )}
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button
                onClick={stopCamera}
                variant="secondary"
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 rounded-full"
              >
                <RotateCcw size={20} />
              </Button>
              
              <Button
                onClick={capturePhoto}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Camera className="mr-2" size={20} />
                Capture
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
