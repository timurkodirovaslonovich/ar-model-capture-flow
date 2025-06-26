
import React, { useState } from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { ARViewer } from '@/components/ARViewer';
import { AuthSection } from '@/components/AuthSection';
import { WebhookTrigger } from '@/components/WebhookTrigger';

const Index = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePhotoCapture = (imageData: string) => {
    setCapturedImage(imageData);
  };

  const handleNewPhoto = () => {
    setCapturedImage(null);
  };

  const handleAuthChange = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
              AR Camera Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Capture photos and bring them to life with interactive 3D AR models. 
              Experience the future of photography with real-time augmented reality.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Authentication Section */}
          <section className="flex justify-center">
            <AuthSection 
              isAuthenticated={isAuthenticated}
              onAuthChange={handleAuthChange}
            />
          </section>

          {/* Camera/AR Section */}
          {isAuthenticated && (
            <section className="flex justify-center">
              {!capturedImage ? (
                <CameraCapture onPhotoCapture={handlePhotoCapture} />
              ) : (
                <ARViewer 
                  capturedImage={capturedImage} 
                  onNewPhoto={handleNewPhoto}
                />
              )}
            </section>
          )}

          {/* Webhook Integration Section */}
          {isAuthenticated && (
            <section className="flex justify-center">
              <WebhookTrigger userEmail="demo@example.com" />
            </section>
          )}

          {/* Features Section */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white w-fit mx-auto">
                📷
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Camera</h3>
              <p className="text-gray-300">
                High-quality photo capture with optimized settings for AR overlay compatibility.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white w-fit mx-auto">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive AR</h3>
              <p className="text-gray-300">
                Real-time 3D model rendering with scale, rotation, and animation controls.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="mb-4 p-3 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white w-fit mx-auto">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Auto Workflows</h3>
              <p className="text-gray-300">
                Seamless n8n integration for automated backend processing and notifications.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            Built with React, A-Frame, AR.js, Supabase, and n8n automation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
