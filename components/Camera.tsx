import React, { useRef, useState, useEffect, useCallback } from 'react';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
  onCancel: () => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      console.error(err);
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Draw the video frame to canvas
        // Note: We are mirroring the preview with CSS, but we might want the captured image 
        // to be mirrored as well if the user expects a "mirror" selfie.
        // For processing, un-mirrored (true life) is usually better, but selfies are usually mirrored.
        // Let's draw it normally (true life) to avoid confusion for the AI.
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageSrc = canvas.toDataURL('image/jpeg', 0.9);
        stopCamera();
        onCapture(imageSrc);
      }
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {error ? (
         <div className="text-white text-center p-6">
           <p className="text-red-400 mb-4">{error}</p>
           <button onClick={onCancel} className="text-white underline">Go Back</button>
         </div>
      ) : (
        <div className="relative w-full h-full flex flex-col">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100" // Mirror the preview
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Overlays */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center">
            <button 
              onClick={() => { stopCamera(); onCancel(); }}
              className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <span className="text-white font-medium tracking-wider">ALIGN FACE</span>
            <div className="w-10"></div> {/* Spacer */}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent flex justify-center items-center pb-12">
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 rounded-full bg-white"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Camera;
