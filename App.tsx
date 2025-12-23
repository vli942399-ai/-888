
import React, { useState, useCallback } from 'react';
import Scene from './components/Scene';
import HandTracker from './components/HandTracker';
import { HandData } from './types';

const App: React.FC = () => {
  const [isFormed, setIsFormed] = useState(true);
  const [handData, setHandData] = useState<HandData>({
    isOpen: false,
    position: { x: 0, y: 0 },
    isActive: false
  });

  const handleHandUpdate = useCallback((data: HandData) => {
    setHandData(data);
    
    // Logic Mapping: 
    // Hand Active + Open = Unleash (Chaos)
    // Hand Active + Fist = Re-form (Tree)
    if (data.isActive) {
      setIsFormed(!data.isOpen);
    }
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#01100a] text-[#D4AF37]">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene isFormed={isFormed} handData={handData} />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-12 z-10">
        <header className="flex justify-between items-start animate-fade-in">
          <div>
            <h1 className="text-6xl font-serif tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#8B4513]">
              Grand Luxury
            </h1>
            <p className="text-xl font-light tracking-[0.3em] uppercase opacity-80 pl-1 mt-2">
              Interactive Christmas Tree
            </p>
          </div>
          <div className="text-right mr-52"> {/* Offset for the tracker window */}
             <div className="px-4 py-2 border border-[#D4AF37]/30 bg-black/20 backdrop-blur-md rounded-full text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.1)]">
               Est. 2024 • Private Collection
             </div>
          </div>
        </header>

        <footer className="flex justify-between items-end">
          <div className="max-w-sm space-y-4">
            <div className="p-6 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2 text-[#FFD700]">
                <i className="fas fa-hand-sparkles"></i>
                AI Gesture Controls
              </h3>
              <div className="space-y-3 text-sm font-light leading-relaxed opacity-90">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <i className="fas fa-fist-raised"></i>
                  </span>
                  <span><span className="text-[#FFD700] font-medium">FIST</span>: Reform the Regal Tree</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <i className="fas fa-hand-paper"></i>
                  </span>
                  <span><span className="text-[#FFD700] font-medium">OPEN PALM</span>: Unleash Golden Chaos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-8 pointer-events-auto">
             <button 
                onClick={() => setIsFormed(!isFormed)}
                className="group relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#8B4513] rounded-full shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:scale-110 transition-all active:scale-95 border-4 border-[#01100a]"
             >
                <i className={`fas ${isFormed ? 'fa-bolt' : 'fa-tree'} text-3xl text-emerald-950`}></i>
                <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 whitespace-nowrap text-xs font-bold tracking-[0.2em] uppercase bg-black/80 backdrop-blur text-[#D4AF37] px-4 py-2 rounded-full border border-[#D4AF37]/30">
                  {isFormed ? 'UNLEASH CHAOS' : 'RESTORE ORDER'}
                </div>
             </button>
          </div>
        </footer>
      </div>

      {/* MediaPipe Camera Tracker Component */}
      <HandTracker onHandUpdate={handleHandUpdate} />

      {/* Decorative Gold Frame */}
      <div className="absolute inset-4 border border-[#D4AF37]/10 pointer-events-none z-0" />
      <div className="absolute inset-8 border border-[#D4AF37]/5 pointer-events-none z-0" />

      {/* Luxury Vignette Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(1,16,10,0.8)_100%)]" />
    </div>
  );
};

export default App;
