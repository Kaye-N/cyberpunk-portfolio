import { useState, useEffect } from "react";
import { Swords, Compass, Shield, Award, Edit3, Save, CheckCircle2 } from "lucide-react";

export default function FF14Panel() {
  const [isEditing, setIsEditing] = useState(false);
  const [characterName, setCharacterName] = useState("Neon Bandit");
  const [serverAddress, setServerAddress] = useState("Aether - Gilgamesh");
  const [mainJob, setMainJob] = useState("Pictomancer (Lvl 100)");
  const [freeCompany, setFreeCompany] = useState("Active Member of <GLITCH>");
  const [currentGoal, setCurrentGoal] = useState(
    "Farming Mounts & Finishing Savage Raids with the static group!"
  );

  // Load from local storage on mount
  useEffect(() => {
    const cached = localStorage.getItem("ff14_character_data_v1");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.characterName) setCharacterName(parsed.characterName);
        if (parsed.serverAddress) setServerAddress(parsed.serverAddress);
        if (parsed.mainJob) setMainJob(parsed.mainJob);
        if (parsed.freeCompany) setFreeCompany(parsed.freeCompany);
        if (parsed.currentGoal) setCurrentGoal(parsed.currentGoal);
      } catch (e) {
        console.error("Failed to parse FF14 storage data", e);
      }
    }
  }, []);

  const handleSave = () => {
    const data = {
      characterName,
      serverAddress,
      mainJob,
      freeCompany,
      currentGoal,
    };
    localStorage.setItem("ff14_character_data_v1", JSON.stringify(data));
    setIsEditing(false);
  };

  return (
    <div
      id="ffxiv-interactive-panel"
      className="border-4 border-cyan-400 bg-zinc-950 p-5 shadow-[0_0_15px_rgba(34,211,238,0.25)] relative rounded-sm flex flex-col gap-4"
    >
      {/* Meteor style indicator / design element */}
      <div className="absolute top-2 right-2 flex gap-1 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-cyan-400" />
        <div className="w-3 h-1.5 bg-cyan-400/50" />
        <div className="w-6 h-1.5 bg-pink-500" />
      </div>

      {/* Header section with Meteor badge */}
      <div className="border-b-2 border-dashed border-zinc-800 pb-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Custom CSS Stylized Meteor Crest */}
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 flex items-center justify-center border border-zinc-950/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]">
            <span className="text-[10px] font-title text-black font-extrabold select-none">XIV</span>
          </div>
          <div>
            <h3 className="font-title text-[11px] text-cyan-400 uppercase tracking-widest leading-none">
              FINAL FANTASY XIV
            </h3>
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-tighter">
              Aetherial Link Established
            </span>
          </div>
        </div>

        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="text-[9px] font-title px-2 py-1 rounded-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 border border-cyan-400/30 text-cyan-400 hover:text-white hover:border-cyan-400"
        >
          {isEditing ? (
            <>
              <Save className="w-3 h-3 text-pink-500 animate-pulse" /> [ Save Card ]
            </>
          ) : (
            <>
              <Edit3 className="w-3 h-3" /> [ Edit Info ]
            </>
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-3.5 bg-zinc-900/40 p-3.5 border border-zinc-800/80 rounded-sm">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
              Character Name / Alias
            </label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="px-2 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm"
              placeholder="e.g. Neon Bandit"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
              Datacenter & Server
            </label>
            <input
              type="text"
              value={serverAddress}
              onChange={(e) => setServerAddress(e.target.value)}
              className="px-2 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm"
              placeholder="e.g. Aether - Gilgamesh"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
              Main Job / Role
            </label>
            <input
              type="text"
              value={mainJob}
              onChange={(e) => setMainJob(e.target.value)}
              className="px-2 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm"
              placeholder="e.g. Pictomancer (Lvl 100)"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
              Free Company / Title
            </label>
            <input
              type="text"
              value={freeCompany}
              onChange={(e) => setFreeCompany(e.target.value)}
              className="px-2 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm"
              placeholder="e.g. Active Member of <GLITCH>"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
              Active Quest / Progression Goal
            </label>
            <textarea
              value={currentGoal}
              onChange={(e) => setCurrentGoal(e.target.value)}
              className="px-2 py-1.5 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm h-16 resize-none"
              placeholder="What are you currently working on in Eorzea?"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Character Main Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-pink-500/50 bg-zinc-900 flex items-center justify-center rounded-sm text-pink-500 shadow-[0_0_6px_rgba(236,72,153,0.15)] flex-shrink-0">
              <Shield className="w-5 h-5 text-glow-pink" />
            </div>
            <div className="min-w-0">
              <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">
                CHARACTER DESIGNATION
              </div>
              <h4 className="font-title text-sm text-white uppercase tracking-wide truncate">
                {characterName}
              </h4>
              <p className="text-[10px] text-cyan-400 font-mono leading-none mt-0.5">
                {serverAddress}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {/* Main Job */}
            <div className="border border-zinc-800/80 bg-zinc-900/30 p-2 rounded-sm flex items-center gap-3">
              <Swords className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[7px] font-mono text-zinc-500 uppercase block">Main Class</span>
                <span className="text-xs text-zinc-300 font-sans tracking-wide truncate block">{mainJob}</span>
              </div>
            </div>

            {/* FC info */}
            <div className="border border-zinc-800/80 bg-zinc-900/30 p-2 rounded-sm flex items-center gap-3">
              <Award className="w-4 h-4 text-pink-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[7px] font-mono text-zinc-500 uppercase block">Free Company</span>
                <span className="text-xs text-zinc-300 font-sans tracking-wide truncate block">{freeCompany}</span>
              </div>
            </div>

            {/* Current Focus */}
            <div className="border border-zinc-800/80 bg-zinc-900/30 p-2.5 rounded-sm relative">
              <span className="absolute top-1 right-2 text-[6px] font-mono text-cyan-400 uppercase animate-pulse">
                ACTIVE DUTY
              </span>
              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-[7px] font-mono text-zinc-500 uppercase block">Current Goal</span>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-0.5">
                    {currentGoal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic footer status */}
          <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-zinc-900 text-[8px] font-mono text-zinc-500">
            <span>REGION: NORTH AMERICA</span>
            <span className="flex items-center gap-1 text-emerald-500">
              <CheckCircle2 className="w-2.5 h-2.5" /> ONLINE
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
