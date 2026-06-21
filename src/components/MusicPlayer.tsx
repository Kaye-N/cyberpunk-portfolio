import { useState, useEffect, useRef, ChangeEvent, SyntheticEvent } from "react";
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, Upload } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  tempo: string;
  src?: string;
}

const TRACKS: Track[] = [
  { id: "synth-01", title: "KIRIRIN LIGHT", artist: "Garoad", genre: "Synthwave / Cyberpunk", duration: "03:15", tempo: "110 BPM" },
  { id: "synth-02", title: "EVERY DAY IS NIGHT", artist: "Garoad", genre: "Chillwave / Electro", duration: "04:02", tempo: "125 BPM" },
  { id: "synth-03", title: "NEONBANDIT CHILL", artist: "Jay & The Glitches", genre: "Vaporwave / Lo-Fi", duration: "02:45", tempo: "84 BPM" },
  { id: "synth-04", title: "GLITCH CITY TAXI", artist: "Dorothy's Drive", genre: "16-bit Arcade / Funk", duration: "03:30", tempo: "115 BPM" },
  { id: "synth-05", title: "AROMANTIC DREAMS", artist: "Silent Binary", genre: "Dream Pop / Ambient", duration: "05:12", tempo: "90 BPM" },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Start at 30% for aesthetic visual
  const [trackSeconds, setTrackSeconds] = useState(58); // Time tracking simulation or audio playback
  const [volume, setVolume] = useState(80);
  const [eqHeights, setEqHeights] = useState<number[]>([15, 45, 20, 35, 60, 25, 40, 50, 15, 30, 42, 24]);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [customTrackTitle, setCustomTrackTitle] = useState("Local MP3");
  const [customTrackArtist, setCustomTrackArtist] = useState("Imported File");
  const [customTrackDuration, setCustomTrackDuration] = useState("00:00");
  const [loadError, setLoadError] = useState<string | null>(null);

  const isCustomTrack = Boolean(customAudioUrl);
  const currentTrack = isCustomTrack
    ? {
        id: "custom-mp3",
        title: customTrackTitle,
        artist: customTrackArtist,
        genre: "Imported MP3",
        duration: customTrackDuration,
        tempo: "--",
        src: customAudioUrl,
      }
    : TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && customAudioUrl) {
      audioRef.current
        .play()
        .catch(() => {
          /* ignore autoplay failures */
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, customAudioUrl]);

  // Equalizer visualizer oscillation simulation
  useEffect(() => {
    let eqInterval: number;
    if (isPlaying) {
      eqInterval = window.setInterval(() => {
        setEqHeights(
          Array.from({ length: 12 }, () => Math.floor(Math.random() * 70) + 10)
        );
        if (!isCustomTrack) {
          setProgress((prev) => {
            if (prev >= 100) {
              handleNext();
              return 0;
            }
            return prev + 0.4;
          });
          setTrackSeconds((prev) => prev + 1);
        }
      }, 400);
    } else {
      setEqHeights([5, 12, 8, 15, 10, 8, 12, 10, 5, 8, 6, 4]);
    }

    return () => clearInterval(eqInterval);
  }, [isPlaying, currentTrackIndex, isCustomTrack]);

  const loadLocalMp3 = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setLoadError("No file selected. Please choose an .mp3 file.");
      return;
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".mp3")) {
      setLoadError("Incompatible file type. Please upload an .mp3 file.");
      return;
    }

    const url = URL.createObjectURL(file);
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
    }

    setLoadError(null);
    setCustomAudioUrl(url);
    setCustomTrackTitle(file.name.replace(/\.mp3$/i, ""));
    setCustomTrackArtist("Local MP3");
    setCustomTrackDuration("00:00");
    setProgress(0);
    setTrackSeconds(0);
    setIsPlaying(true);
  };

  const handleAudioTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    const audio = event.currentTarget;
    if (!audio.duration || Number.isNaN(audio.duration)) return;

    setProgress((audio.currentTime / audio.duration) * 100);
    setTrackSeconds(audio.currentTime);
  };

  const handleLoadedMetadata = (event: SyntheticEvent<HTMLAudioElement>) => {
    const audio = event.currentTarget;
    if (!audio.duration || Number.isNaN(audio.duration)) return;

    setCustomTrackDuration(formatTime(audio.duration));
    if (isPlaying) {
      audio.play().catch(() => {
        /* ignore autoplay failures */
      });
    }
  };

  const handleAudioEnded = () => {
    if (isCustomTrack) {
      setIsPlaying(false);
      setProgress(100);
    } else {
      handleNext();
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
      setCustomAudioUrl(null);
    }

    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
    setTrackSeconds(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
      setCustomAudioUrl(null);
    }

    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
    setTrackSeconds(0);
    setIsPlaying(true);
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
      <audio
        ref={audioRef}
        src={currentTrack.src ?? undefined}
        preload="metadata"
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Decorative cyber crosshairs */}
      <div className="absolute top-2 left-2 flex gap-1 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-cyan-400" />
        <div className="w-3 h-1.5 bg-cyan-400/50" />
        <div className="w-6 h-1.5 bg-pink-500" />
      </div>

      <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-800 pb-2">
        <span className="font-title text-sm text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Music className="w-3.5 h-3.5" /> VA-11 JUKEBOX ENGINE
        </span>
        <span className="font-press-start text-sm text-zinc-600 animate-pulse">
          STATUS: ONLINE
        </span>
      </div>

      {/* Screen/Display */}
      <div className="border border-zinc-800 bg-zinc-900/80 p-4 rounded-sm relative overflow-hidden flex flex-col gap-3">
        {/* Glowing glass reflections */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <span className="text-sm font-title text-pink-500 block uppercase tracking-widest mb-1">
              Now Playing //
            </span>
            <h3 className="font-title text-base sm:text-lg text-white text-glow-white tracking-widest leading-none">
              {currentTrack.title}
            </h3>
            <span className="text-sm text-zinc-400 font-sans mt-1 block">
              Composer: {currentTrack.artist}
            </span>
            <span className="text-sm text-zinc-500 font-sans block mt-0.5">
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
          <div className="flex justify-between font-sans text-sm text-zinc-500">
            <span>{formatTime(trackSeconds)}</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>
      </div>

      {/* Playlist Selector (Scrollable) */}
      <div className="border border-zinc-800 bg-zinc-950 rounded-sm overflow-hidden">
        <div className="bg-zinc-900 border-b border-zinc-800 px-3 py-1.5 flex justify-between items-center">
          <span className="font-title text-sm text-pink-500 uppercase tracking-wider">
            Tape Queue Selector
          </span>
          <span className="text-sm text-zinc-500 font-sans font-bold">
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
              className={`w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer flex justify-between items-center ${
                currentTrackIndex === index
                  ? "bg-cyan-500/10 text-cyan-400 font-bold border-l-4 border-cyan-400"
                  : "text-zinc-400 hover:bg-zinc-900/60 hover:text-white"
              }`}
            >
              <div className="truncate flex items-center gap-2">
                <span className="font-mono text-sm text-zinc-600 block w-6">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="truncate">{t.title}</span>
              </div>
              <span className="text-sm font-mono text-zinc-500 flex-shrink-0">
                {t.duration}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border border-zinc-800 bg-zinc-900/80 rounded-sm p-3">
        <label className="flex items-center justify-between gap-2 text-sm text-zinc-200 cursor-pointer">
          <span className="font-title uppercase tracking-widest text-cyan-400 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Load .MP3
          </span>
          <input
            type="file"
            accept="audio/mpeg,.mp3"
            onChange={loadLocalMp3}
            className="sr-only"
          />
        </label>
        <p className="mt-2 text-xs text-zinc-500">
          Select any .mp3 file to start playing real music.
        </p>
        {customAudioUrl && !loadError && (
          <p className="mt-2 text-xs text-cyan-300 truncate">
            Loaded: {customTrackTitle}
          </p>
        )}
        {loadError ? (
          <p className="mt-2 text-xs text-rose-400 font-bold">
            {loadError}
          </p>
        ) : !customAudioUrl ? (
          <p className="mt-2 text-xs text-zinc-400">
            No MP3 loaded. Use the button above to upload an .mp3.
          </p>
        ) : null}
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
          <span className="font-mono text-xs text-zinc-400 w-6 text-right font-bold">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
}
