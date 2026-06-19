import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  tempo: string;
}

const TRACKS: Track[] = [
  { id: "synth-01", title: "KIRIRIN LIGHT", artist: "Garoad", genre: "Synthwave / Cyberpunk", duration: "03:15", tempo: "110 BPM" },
  { id: "synth-02", title: "EVERY DAY IS NIGHT", artist: "Garoad", genre: "Chillwave / Electro", duration: "04:02", tempo: "125 BPM" },
  { id: "synth-03", title: "NEONBANDIT CHILL", artist: "Jay & The Glitches", genre: "Vaporwave / Lo-Fi", duration: "02:45", tempo: "84 BPM" },
  { id: "synth-04", title: "GLITCH CITY TAXI", artist: "Dorothy's Drive", genre: "16-bit Arcade / Funk", duration: "03:30", tempo: "115 BPM" },
  { id: "synth-05", title: "AROMANTIC DREAMS", artist: "Silent Binary", genre: "Dream Pop / Ambient", duration: "05:12", tempo: "90 BPM" },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Start at 30% for aesthetic visual
  const [trackSeconds, setTrackSeconds] = useState(58); // Time tracking simulation
  const [volume, setVolume] = useState(80);
  const [eqHeights, setEqHeights] = useState<number[]>([15, 45, 20, 35, 60, 25, 40, 50, 15, 30, 42, 24]);

  const currentTrack = TRACKS[currentTrackIndex];

  // Equalizer visualizer oscillation simulation
  useEffect(() => {
    let eqInterval: number;
    if (isPlaying) {
      eqInterval = window.setInterval(() => {
        setEqHeights(
          Array.from({ length: 12 }, () => Math.floor(Math.random() * 70) + 10)
        );
        // Slowly update simulated progress
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.4;
        });
        setTrackSeconds((prev) => prev + 1);
      }, 400);
    } else {
      // Resting equalizer
      setEqHeights([5, 12, 8, 15, 10, 8, 12, 10, 5, 8, 6, 4]);
    }

    return () => clearInterval(eqInterval);
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
    setTrackSeconds(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
    setTrackSeconds(0);
  };

  const formatTime = (totalSecs: number) => {
    const min = Math.floor(totalSecs / 60);
    const sec = Math.floor(totalSecs % 60);
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      id="retro-jukebox-module"
      className="border-4 border-cyan-400 bg-zinc-950 p-5 shadow-[0_0_15px_rgba(6,182,212,0.3)] relative rounded-sm flex flex-col gap-4"
    >
      {/* Decorative cyber crosshairs */}
      <div className="absolute top-2 left-2 flex gap-1 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-cyan-400" />
        <div className="w-3 h-1.5 bg-cyan-400/50" />
        <div className="w-6 h-1.5 bg-pink-500" />
      </div>

      <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-800 pb-2">
        <span className="font-title text-[10px] text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5" /> VA-11 JUKEBOX ENGINE
        </span>
        <span className="font-press-start text-[8px] text-zinc-600 animate-pulse">
          STATUS: ONLINE
        </span>
      </div>

      {/* Screen/Display */}
      <div className="border border-zinc-800 bg-zinc-900/80 p-4 rounded-sm relative overflow-hidden flex flex-col gap-3">
        {/* Glowing glass reflections */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <span className="text-[9px] font-title text-pink-500 block uppercase tracking-widest mb-1">
              Now Playing //
            </span>
            <h3 className="font-title text-base sm:text-lg text-white text-glow-white tracking-widest leading-none">
              {currentTrack.title}
            </h3>
            <span className="text-xs text-zinc-400 font-sans mt-1 block">
              Composer: {currentTrack.artist}
            </span>
            <span className="text-[10px] text-zinc-500 font-sans block mt-0.5">
              Genre: {currentTrack.genre} • {currentTrack.tempo}
            </span>
          </div>

          {/* Simulated Rotating CD/Vinyl Disc */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <div
              className={`w-full h-full rounded-full border-4 border-dashed border-cyan-400 flex items-center justify-center p-2 bg-zinc-950 shadow-[0_0_8px_rgba(6,182,212,0.4)] ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "12s" }}
            >
              <div className="w-4 h-4 bg-pink-500 rounded-full border border-zinc-950 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Audio Equalizer visual simulation */}
        <div className="h-10 border-t border-b border-zinc-800/80 flex items-end justify-between px-1 bg-zinc-950/40 py-1.5 gap-0.5">
          {eqHeights.map((h, i) => (
            <div
              key={i}
              className="w-full bg-cyan-400/80 rounded-t-xs hover:bg-pink-500/80 transition-colors duration-200"
              style={{
                height: `${h}%`,
                boxShadow: `0 0 6px ${i % 2 === 0 ? "#06b6d4" : "#ec4899"}`,
              }}
            />
          ))}
        </div>

        {/* Progress scrub bar */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="w-full h-2 bg-zinc-900 border border-zinc-800 p-0.5 rounded-sm overflow-hidden cursor-pointer relative">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-cyan-400 shadow-[0_0_6px_rgba(236,72,153,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between font-sans text-[10px] text-zinc-500">
            <span>{formatTime(trackSeconds)}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>
      </div>

      {/* Playlist Selector (Scrollable) */}
      <div className="border border-zinc-800 bg-zinc-950 rounded-sm overflow-hidden">
        <div className="bg-zinc-900 border-b border-zinc-800 px-3 py-1.5 flex justify-between items-center">
          <span className="font-title text-[9px] text-pink-500 uppercase tracking-wider">
            Tape Queue Selector
          </span>
          <span className="text-[10px] text-zinc-500 font-sans font-bold">
            {TRACKS.length} JAMS
          </span>
        </div>
        <div className="max-h-36 overflow-y-auto divide-y divide-zinc-900">
          {TRACKS.map((t, index) => (
            <button
              key={t.id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setProgress(0);
                setTrackSeconds(0);
                setIsPlaying(true);
              }}
              className={`w-full px-3 py-2 text-left text-xs transition-colors cursor-pointer flex justify-between items-center ${
                currentTrackIndex === index
                  ? "bg-cyan-500/10 text-cyan-400 font-bold border-l-4 border-cyan-400"
                  : "text-zinc-400 hover:bg-zinc-900/60 hover:text-white"
              }`}
            >
              <div className="truncate flex items-center gap-2">
                <span className="font-mono text-[9px] text-zinc-600 block w-4">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="truncate">{t.title}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 flex-shrink-0">
                {t.duration}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Controls Container (Volume + Buttons) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-1">
        {/* Player Buttons */}
        <div className="flex gap-2.5 items-center">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border-2 border-zinc-800 hover:border-cyan-400 hover:text-cyan-400 text-white flex items-center justify-center bg-zinc-950 hover:bg-zinc-900 active:scale-90 transition-all cursor-pointer rounded-sm"
            title="Previous track"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 border-4 border-pink-500 hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 active:scale-95 text-white flex items-center justify-center bg-zinc-950 hover:bg-zinc-900 transition-all cursor-pointer rounded-sm shadow-[0_0_8px_rgba(236,72,153,0.2)] hover:shadow-[0_0_8px_rgba(6,182,212,0.4)]"
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-glow-cyan" />
            ) : (
              <Play className="w-5 h-5 text-glow-pink fill-white" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="w-10 h-10 border-2 border-zinc-800 hover:border-cyan-400 hover:text-cyan-400 text-white flex items-center justify-center bg-zinc-950 hover:bg-zinc-900 active:scale-90 transition-all cursor-pointer rounded-sm"
            title="Next track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2 bg-zinc-900/60 p-2 border border-zinc-800 rounded-sm w-full sm:w-auto">
          <Volume2 className="w-4 h-4 text-zinc-500" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full sm:w-20 accent-cyan-400 bg-zinc-950 cursor-pointer h-1.5 rounded-lg border border-zinc-800"
          />
          <span className="font-mono text-[9px] text-zinc-400 w-5 text-right font-bold">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
}
