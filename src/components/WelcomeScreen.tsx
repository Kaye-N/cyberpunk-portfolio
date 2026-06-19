import { useState } from "react";
import { motion } from "motion/react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [isBooting, setIsBooting] = useState(false);

  const handleEnterClick = () => {
    setIsBooting(true);
    // Simulate terminal boot sound trigger / loading delay
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <div
      id="welcome-terminal-screen"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#050308",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        overflow: "hidden",
      }}
      className="scanlines cursor-crosshair select-none"
    >
      {/* Retro scanline flickers */}
      <div className="absolute inset-0 bg-zinc-950/20 pointer-events-none crt-flicker z-10" />

      {/* Pure aesthetic layout: Centered button */}
      <div className="z-20 flex flex-col items-center justify-center p-8 max-w-md w-full text-center">
        {!isBooting ? (
          <div className="flex flex-col items-center gap-6 w-full">
            <button
              id="boot-access-btn"
              onClick={handleEnterClick}
              className="group px-8 py-5 border-4 border-white bg-black text-white hover:text-black hover:bg-white font-title text-base sm:text-lg tracking-[0.25em] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer box-glow-white rounded-sm select-none"
              aria-label="Enter Showcase"
            >
              <span className="relative flex items-center justify-center gap-3">
                <span className="text-glow-white">[ CONNECTING... ]</span>
                <span className="inline-block animate-pulse w-2.5 h-2.5 bg-white rounded-full"></span>
              </span>
            </button>

            {/* Footnote matching VA-11 HALL-A terminal vibe - positioned directly under the button */}
            <span className="font-title text-[9px] sm:text-[10px] text-zinc-400 tracking-[0.2em] uppercase bg-black/90 px-4 py-2 border border-zinc-800 rounded-sm text-glow-white-soft mt-2">
              GLITCH_CITY // NET-PROTOCOLS // v1.1.0
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Loading / Boot progress simulation */}
            <div className="font-press-start text-[10px] text-zinc-400 tracking-widest animate-pulse">
              LOADING SYSTEM...
            </div>
            <div className="w-48 h-2 bg-zinc-900 border border-zinc-700 p-0.5 rounded-sm overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              />
            </div>
            <div className="font-sans text-xs text-cyan-400 font-bold uppercase tracking-widest animate-pulse">
              SUCCESSFUL HANDSHAKE
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
