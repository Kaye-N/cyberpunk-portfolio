import { useState } from "react";
import { Github, Flame, Heart, Sparkles, MapPin } from "lucide-react";

interface AboutPanelProps {
  githubUrl: string;
  artfightUrl: string;
  avatarUrl: string;
}

export default function AboutPanel({
  githubUrl,
  artfightUrl,
  avatarUrl,
}: AboutPanelProps) {
  const [mood, setMood] = useState<string>("hopeless");
  const [customBio, setCustomBio] = useState<string>(
    "Hi and welcome to my website! My name is NEONbandit, also known as NEONwithAzero in online spaces. I'm a non-binary digital artist / coder who tries their best to do a little bit of everything!"
  );
  const [isEditingBio, setIsEditingBio] = useState(false);

  const moods = [
    { id: "hopeless", icon: "💀", label: "hopeless", color: "text-zinc-400" },
    { id: "cozy", icon: "☕", label: "cozy", color: "text-amber-400" },
    { id: "hacking", icon: "⚡", label: "cyber-active", color: "text-cyan-400" },
    { id: "bartending", icon: "🍹", label: "bartending", color: "text-pink-500" },
  ];

  return (
    <div
      id="about-card-section"
      className="border-4 border-pink-500 bg-zinc-950 p-5 shadow-[0_0_15px_rgba(236,72,153,0.3)] relative rounded-sm flex flex-col gap-6"
    >
      {/* Decorative cyber stencils */}
      <div className="absolute top-2 right-2 flex gap-1 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-pink-500" />
        <div className="w-3 h-1.5 bg-pink-500/50" />
        <div className="w-6 h-1.5 bg-cyan-400" />
      </div>

      {/* Profile Header Block */}
      <div className="flex flex-col sm:flex-row items-center gap-5 border-b-2 border-dashed border-zinc-800 pb-5">
        <div className="relative w-28 h-28 border-4 border-cyan-400 group p-1 bg-zinc-900 rounded-sm">
          <div className="absolute -top-2.5 -left-2.5 w-4 h-4 border-t-4 border-l-4 border-pink-500 pointer-events-none" />
          <div className="absolute -bottom-2.5 -right-2.5 w-4 h-4 border-b-4 border-r-4 border-pink-500 pointer-events-none" />
          <img
            src={avatarUrl}
            alt="Cyber Avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-sm border border-zinc-950"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-title text-xl text-white text-glow-white tracking-wider flex items-center justify-center sm:justify-start gap-2">
            NEONbandit <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          </h2>
          <div className="mt-1 font-sans text-xs text-zinc-400 tracking-wider flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded-sm">
              Age: 29
            </span>
            <span className="bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded-sm">
              Pronouns: They/Them
            </span>
            <span className="bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded-sm">
              Status: Aromantic
            </span>
          </div>

          {/* Retro Flags Section */}
          <div className="mt-3 flex gap-2 justify-center sm:justify-start">
            {/* Pronoun/Pride Flag representation with pixel colors */}
            <div
              className="w-8 h-5 border border-zinc-800 flex flex-col"
              title="Aromantic Flag"
            >
              <div className="flex-1 bg-emerald-700" />
              <div className="flex-1 bg-emerald-400" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-zinc-500" />
              <div className="flex-1 bg-zinc-950" />
            </div>
            <div
              className="w-8 h-5 border border-zinc-800 flex flex-col"
              title="Trans Pride Flag"
            >
              <div className="flex-1 bg-sky-300" />
              <div className="flex-1 bg-pink-300" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-pink-300" />
              <div className="flex-1 bg-sky-300" />
            </div>
            <div
              className="w-8 h-5 border border-zinc-800 flex flex-col"
              title="Non-Binary Pride Flag"
            >
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-white" />
              <div className="flex-1 bg-purple-600" />
              <div className="flex-1 bg-zinc-950" />
            </div>
          </div>
        </div>
      </div>

      {/* Mood Picker */}
      <div className="border border-zinc-800 bg-zinc-900/60 p-3 rounded-sm">
        <div className="font-title text-[10px] text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5" /> Set Core Mood Matrix
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              className={`p-1.5 border-2 text-[10px] font-title uppercase flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200 rounded-sm ${
                mood === m.id
                  ? "bg-pink-500/20 border-pink-500 text-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.3)]"
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 text-xs text-zinc-300 tracking-wide font-medium">
          Current Mood:{" "}
          <span className="text-pink-400 uppercase font-title text-[10px]">
            {mood}
          </span>
        </div>
      </div>

      {/* Interactive Biography */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="font-title text-[10px] text-pink-500 uppercase tracking-widest">
            // PROFILE STATEMENT
          </div>
          <button
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="text-[10px] font-title uppercase text-cyan-400 hover:text-white border border-cyan-400/40 hover:border-cyan-400 px-1.5 py-0.5 cursor-pointer rounded-sm"
          >
            {isEditingBio ? "Done" : "Edit Bio"}
          </button>
        </div>

        {isEditingBio ? (
          <textarea
            value={customBio}
            onChange={(e) => setCustomBio(e.target.value)}
            className="w-full h-24 bg-zinc-950 border-2 border-pink-500 p-2 text-xs font-sans text-white focus:outline-none focus:border-cyan-400 box-glow-cyan"
          />
        ) : (
          <p className="text-sm text-zinc-300 leading-relaxed font-sans bg-zinc-900/30 p-3 border border-zinc-800 rounded-sm">
            {customBio}
          </p>
        )}
      </div>

      {/* Interactive Links Frame (ArtFight and GitHub) */}
      <div className="flex flex-col gap-2 border-t-2 border-dashed border-zinc-800 pt-5 mt-auto">
        <div className="font-title text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
          // ACCESS PORTAL CHANNELS
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* GitHub Portal */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-3 py-3 border-2 border-cyan-400 hover:border-pink-500 bg-zinc-950 text-white hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center gap-2 box-glow-cyan hover:box-glow-pink cursor-pointer rounded-sm"
          >
            <Github className="w-5 h-5 group-hover:scale-110 group-hover:text-pink-500 transition-all duration-300" />
            <span className="font-title text-[10px] tracking-wide uppercase group-hover:text-glow-pink">
              GITHUB
            </span>
          </a>

          {/* ArtFight Portal */}
          <a
            href={artfightUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-3 py-3 border-2 border-pink-500 hover:border-cyan-400 bg-zinc-950 text-white hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center gap-2 box-glow-pink hover:box-glow-cyan cursor-pointer rounded-sm"
          >
            <Heart className="w-5 h-5 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
            <span className="font-title text-[10px] tracking-wide uppercase group-hover:text-glow-cyan">
              ARTFIGHT
            </span>
          </a>
        </div>
      </div>

      {/* Additional widget: Location/Hometown badge */}
      <div className="text-[10px] font-title text-zinc-500 tracking-widest flex items-center justify-center gap-1.5 uppercase mt-1">
        <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Glitch City, Sector 23
      </div>
    </div>
  );
}
