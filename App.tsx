import React, { useState, useRef } from 'react';
import { Scene, AppState } from './types';
import { SCENES } from './constants';
import { generateTimeTravelImage } from './services/geminiService';
import Camera from './components/Camera';
import SceneCard from './components/SceneCard';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('start');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleStart = () => setAppState('start');

  const handleCapture = (imageSrc: string) => {
    setUserImage(imageSrc);
    setAppState('preview');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setAppState('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const generateImage = async () => {
    if (!userImage || !selectedScene) return;

    setAppState('processing');
    setError(null);

    try {
      const generatedImg = await generateTimeTravelImage(userImage, selectedScene.promptModifier);
      setResultImage(generatedImg);
      setAppState('result');
    } catch (err) {
      console.error(err);
      setError("The time machine malfunctioned! Please try again.");
      setAppState('preview');
    }
  };

  const reset = () => {
    setUserImage(null);
    setSelectedScene(null);
    setResultImage(null);
    setAppState('start');
  };

  // --- Renders ---

  if (appState === 'camera') {
    return (
      <Camera 
        onCapture={handleCapture} 
        onCancel={() => setAppState('start')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="p-6 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-[#0f172a]/80 sticky top-0 z-40">
        <div className="flex items-center space-x-2" onClick={reset} role="button">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl">
            C
          </div>
          <h1 className="text-xl font-bold tracking-tight">Chrono<span className="text-purple-400">Snap</span></h1>
        </div>
        {appState !== 'start' && (
          <button onClick={reset} className="text-sm text-slate-400 hover:text-white">
            Reset
          </button>
        )}
      </header>

      <main className="max-w-4xl mx-auto p-6 pb-32">
        
        {/* Step 1: Landing / Start */}
        {appState === 'start' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-fade-in">
            <div className="text-center space-y-4 max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                Time Travel <br /> Photo Booth
              </h2>
              <p className="text-slate-400 text-lg md:text-xl">
                Take a selfie, choose an era, and let Gemini AI transport you through history.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-8">
              <button
                onClick={() => setAppState('camera')}
                className="flex-1 bg-white text-black font-bold py-4 px-6 rounded-full hover:bg-slate-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Take Photo
              </button>
              <button
                onClick={triggerFileUpload}
                className="flex-1 bg-slate-800 text-white font-bold py-4 px-6 rounded-full hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Upload
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            {/* Quick Gallery Preview */}
            <div className="grid grid-cols-3 gap-4 w-full opacity-50 pt-12">
               <div className="aspect-[3/4] rounded-lg bg-slate-800 overflow-hidden relative">
                  <img src="https://picsum.photos/400/600?grayscale" alt="Example" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay"></div>
               </div>
               <div className="aspect-[3/4] rounded-lg bg-slate-800 overflow-hidden relative mt-8">
                  <img src="https://picsum.photos/401/600?grayscale" alt="Example" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-yellow-500/20 mix-blend-overlay"></div>
               </div>
               <div className="aspect-[3/4] rounded-lg bg-slate-800 overflow-hidden relative">
                  <img src="https://picsum.photos/402/600?grayscale" alt="Example" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
               </div>
            </div>
          </div>
        )}

        {/* Step 2: Configure (Scene Selection) */}
        {appState === 'preview' && userImage && (
          <div className="space-y-8 animate-fade-in">
             <div className="flex flex-col md:flex-row gap-8 items-start">
               {/* Image Preview */}
               <div className="w-full md:w-1/3 shrink-0">
                 <div className="bg-slate-800 rounded-2xl p-2 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                    <img src={userImage} alt="Your selfie" className="w-full rounded-xl" />
                 </div>
                 <button onClick={() => setAppState('start')} className="w-full mt-4 text-slate-400 hover:text-white text-sm py-2">
                   Retake / Change Photo
                 </button>
               </div>

               {/* Scene Selection */}
               <div className="flex-1 w-full">
                 <h2 className="text-2xl font-bold mb-2">Where to?</h2>
                 <p className="text-slate-400 mb-6">Choose your destination era.</p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SCENES.map(scene => (
                      <SceneCard 
                        key={scene.id}
                        scene={scene}
                        isSelected={selectedScene?.id === scene.id}
                        onSelect={setSelectedScene}
                      />
                    ))}
                 </div>
               </div>
             </div>

             {/* Action Bar */}
             <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0f172a] to-transparent z-30">
                <div className="max-w-4xl mx-auto flex justify-end">
                  <button
                    disabled={!selectedScene}
                    onClick={generateImage}
                    className={`
                      py-4 px-8 rounded-full font-bold text-lg shadow-lg flex items-center gap-3 transition-all
                      ${selectedScene 
                        ? 'bg-white text-black hover:scale-105 hover:shadow-purple-500/50' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }
                    `}
                  >
                    <span>Activate Time Machine</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </button>
                </div>
             </div>
             
             {error && (
               <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg mt-4">
                 {error}
               </div>
             )}
          </div>
        )}

        {/* Step 3: Processing */}
        {appState === 'processing' && (
          <div className="h-[60vh] flex flex-col items-center justify-center">
             <Loader text={`Constructing ${selectedScene?.title} environment...`} />
          </div>
        )}

        {/* Step 4: Result */}
        {appState === 'result' && resultImage && (
          <div className="flex flex-col items-center space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-center">Arrival Confirmed</h2>
            
            <div className="relative group max-w-lg w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-black rounded-xl p-2 ring-1 ring-white/10">
                <img src={resultImage} alt="Time Travel Result" className="w-full rounded-lg shadow-2xl" />
              </div>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 max-w-lg w-full text-center">
              <h3 className="text-xl font-bold mb-1">{selectedScene?.title}</h3>
              <p className="text-slate-400 text-sm mb-6">{selectedScene?.description}</p>
              
              <div className="flex gap-4 justify-center">
                <a 
                  href={resultImage} 
                  download={`chronosnap-${selectedScene?.id}-${Date.now()}.jpg`}
                  className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </a>
                <button 
                  onClick={() => setAppState('preview')} 
                  className="bg-slate-700 text-white font-bold py-3 px-6 rounded-full hover:bg-slate-600 transition-colors"
                >
                  Try Another Era
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
