import { useState, useEffect, FormEvent } from "react";
import { Plus, Trash2, X, AlertTriangle, Hammer, Sparkles, FolderOpen, Heart, Github, ExternalLink } from "lucide-react";

// Components
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import SnowBackground from "./components/SnowBackground.tsx";
import ScrollingBanner from "./components/ScrollingBanner.tsx";
import AboutPanel from "./components/AboutPanel.tsx";
import MusicPlayer from "./components/MusicPlayer.tsx";
import Guestbook from "./components/Guestbook.tsx";
import PortfolioShowcase from "./components/PortfolioShowcase.tsx";
import { PixelIcon } from "./components/PixelIcons.tsx";

// Types
import { Project } from "./types.ts";

// Local image path definitions
const cyberpunkPixelCity = "/src/assets/images/cyberpunk_pixel_city_1781893269904.jpg";
const cyberNekoProfile = "/src/assets/images/cyber_neko_profile_1781893291698.jpg";
const cyberConsoleRetro = "/src/assets/images/cyber_console_retro_1781893303035.jpg";
const cyberFurryMascot = "/src/assets/images/cyber_furry_mascot_1781893314392.jpg";


interface IllustrationItem {
  id?: string;
  url: string;
  title: string;
  desc: string;
}

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Dynamic state for custom illustrations in the banners
  const [illustrations, setIllustrations] = useState<IllustrationItem[]>([]);

  // Active state for preview overlay modal
  const [selectedIllustration, setSelectedIllustration] = useState<IllustrationItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form states for adding custom illustrations
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [showConfig, setShowConfig] = useState(false);

  // Seed default illustrations on mount or load from local storage
  useEffect(() => {
    const cachedIllustrations = localStorage.getItem("cyber_illustrations_v2");
    if (cachedIllustrations) {
      try {
        setIllustrations(JSON.parse(cachedIllustrations));
      } catch (e) {
        console.error("Error parsing illustrations from storage", e);
      }
    } else {
      const defaults: IllustrationItem[] = [
        {
          url: cyberNekoProfile,
          title: "Cyber Neko Netrunner",
          desc: "A custom cybernetic profile illustration. Features rich 16-bit dithered shadows, glowing visors, and high contrast magenta outlines.",
        },
        {
          url: cyberConsoleRetro,
          title: "Retro Console Holograms",
          desc: "A handheld console beaming pixelated status widgets. Inspired by 1980s portable aesthetic.",
        },
        {
          url: cyberFurryMascot,
          title: "NeoBandit Cyber-Furry Emote",
          desc: "Our cozy digital mascot grinning inside a glitch grid frame, sporting retro blue goggles.",
        },
        {
          url: "https://picsum.photos/seed/cyberterminal/400/400",
          title: "Glitch City Server Deck",
          desc: "An illustrative isometric scene showing computer mainframes dithered in green phosphor.",
        },
        {
          url: "https://picsum.photos/seed/vaporcity/400/400",
          title: "Sunset over Sector 23",
          desc: "A warm neon vaporwave background depicting neon-drenched skylines of the outer sector.",
        },
      ];
      setIllustrations(defaults);
      localStorage.setItem("cyber_illustrations_v2", JSON.stringify(defaults));
    }
  }, []);

  const handleAddIllustration = (e: FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newTitle.trim()) return;

    const added: IllustrationItem = {
      url: newUrl.trim(),
      title: newTitle.trim(),
      desc: newDesc.trim() || "Custom user illustration.",
    };

    const updated = [...illustrations, added];
    setIllustrations(updated);
    localStorage.setItem("cyber_illustrations_v2", JSON.stringify(updated));

    // Clear form
    setNewUrl("");
    setNewTitle("");
    setNewDesc("");
  };

  const handleRemoveIllustration = (index: number) => {
    const updated = illustrations.filter((_, i) => i !== index);
    setIllustrations(updated);
    localStorage.setItem("cyber_illustrations_v2", JSON.stringify(updated));
  };

  // Seed default portfolio projects
  const initialProjects: Project[] = [
    {
      id: "p1",
      title: "DELTACABLE (AU) GRID SIMULATOR",
      description: "An interactive alternate universe project themed around high-voltage dark energy lines inside Deltarune. Designed with cozy CSS scanlines, interactive canvas overlays, and retro pixel typography.",
      techStack: ["React", "Vite", "Tailwind CSS"],
      imageUrl: cyberpunkPixelCity,
      githubUrl: "https://github.com/FippyChannel",
      liveUrl: "#",
      category: "coding",
    },
    {
      id: "p2",
      title: "BLOODPOP MEME LOOP",
      description: "A gorgeous 16-bit vector aesthetic frame looping digital art illustrations. Users can toggle CRT filters, adjust retro dithering palettes, and trigger synthetic sound hums directly from the dashboard.",
      techStack: ["TypeScript", "Canvas Engine", "SVG filters"],
      imageUrl: cyberNekoProfile,
      githubUrl: "https://github.com/FippyChannel",
      liveUrl: "#",
      category: "art",
    },
    {
      id: "p3",
      title: "GLITCH COCKTAIL BOT v0.9",
      description: "A fully responsive digital drink mixing dashboard mirroring VA-11 HALL-A's bar module. Mix Adelhyde, Bronson Ext, and Karmotrine to unlock funny narrative quotes and test mood reactions.",
      techStack: ["Vite", "Motion Engine", "React 19"],
      imageUrl: cyberConsoleRetro,
      githubUrl: "https://github.com/FippyChannel",
      liveUrl: "#",
      category: "coding",
    },
    {
      id: "p4",
      title: "NEONBANDIT MASCOT CORNERER",
      description: "A sprite collection containing highly vibrant emotes of cyan furry mascots with cool retro goggles. Crafted for use in streams, web portals, and comm packs.",
      techStack: ["Aseprite Layout", "Pixel Mapping"],
      imageUrl: cyberFurryMascot,
      githubUrl: "https://github.com/FippyChannel",
      liveUrl: "#",
      category: "art",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans scanlines relative overflow-x-hidden selection:bg-pink-500 selection:text-black">
      {/* 1. Canvas Snow Effect Background */}
      <SnowBackground />

      {/* 2. Opening Entrance Screen */}
      {!hasEntered && (
        <WelcomeScreen onEnter={() => setHasEntered(true)} />
      )}

      {/* 3. Main Dashboard Site content */}
      {hasEntered && (
        <div
          id="main-applet-homepage"
          className="relative min-h-screen w-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(13, 7, 20, 0.94), rgba(3, 1, 5, 0.96)), url(${cyberpunkPixelCity})`,
          }}
        >
          {/* Top header scrolling banner */}
          <ScrollingBanner
            id="top-marquee-banner"
            direction="left"
            onSelectImage={(img) => setSelectedIllustration(img)}
          />

          {/* Central Aesthetic Header Area */}
          <header id="site-hero-header" className="max-w-7xl mx-auto pt-8 pb-4 px-4 text-center flex flex-col items-center">
            {/* Soft white glowing site title */}
            <h1 className="font-title text-2xl sm:text-4xl text-white text-glow-white tracking-[0.2em] font-bold uppercase select-none mt-2">
              NEONBANDIT STREET
            </h1>
            <p className="mt-1 font-title text-[9px] text-zinc-500 tracking-widest uppercase">
              // Cyberpunk Bartender Showcase // Glitch Sector 23 //
            </p>

            {/* Glowing neon decorative breaker */}
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.8)] mt-3"></div>
          </header>

          {/* Bottom scrolling banner (opposite direction) */}
          <ScrollingBanner
            id="bottom-marquee-banner"
            direction="right"
            onSelectImage={(img) => setSelectedIllustration(img)}
          />

          {/* Core Interactive Desktop Dashboard */}
          <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            
            {/* Left Hand Sidebar Column - Profile and Audio */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* About Jay & Socials */}
              <AboutPanel
                githubUrl="https://github.com/FippyChannel"
                artfightUrl="https://artfight.net/~NEONbandit"
                avatarUrl={cyberNekoProfile}
              />

              {/* Jukebox Audio Player */}
              <MusicPlayer />

              {/* Interactive Construction Badge / Pride indicator */}
              <div className="border-4 border-dashed border-cyan-400 p-4 bg-zinc-950/90 rounded-sm relative shadow-[0_0_10px_rgba(6,182,212,0.15)] flex gap-3.5 items-start">
                <Hammer className="w-8 h-8 text-pink-500 animate-bounce flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-title text-[10px] text-pink-500 uppercase tracking-widest flex items-center justify-between">
                    <span>SYSTEM NOTIFICATION</span>
                    <span className="text-[8px] border border-pink-500 px-1 py-0.5 animate-pulse text-zinc-400">
                      WIP
                    </span>
                  </div>
                  <h4 className="font-title text-xs text-white uppercase tracking-wider mt-1.5">
                    UNDER CONSTRUCTION
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans mt-1 leading-snug">
                    This pixel zone is a work-in-progress. I am constantly coding newer custom widgets. Pop back soon!
                  </p>
                </div>
              </div>

            </div>

            {/* Right Hand Content Column - Banners, Showcase, Guestbook */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Core Notice Board Widget */}
              <section
                id="notice-board-announcements"
                className="border-4 border-zinc-800 bg-zinc-950/95 p-5 relative rounded-sm"
              >
                <div className="absolute top-2 right-2 flex gap-1 pointer-events-none">
                  <div className="w-1.5 h-1.5 bg-zinc-700" />
                  <div className="w-3 h-1.5 bg-zinc-700/50" />
                  <div className="w-6 h-1.5 bg-cyan-400" />
                </div>

                <div className="border-b border-zinc-800 pb-2 mb-3">
                  <h3 className="font-title text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" /> COMMISSION NOTICE BOARD
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 relative border-2 border-pink-500 bg-zinc-900 aspect-square rounded-sm overflow-hidden p-1">
                    <img
                      src={cyberFurryMascot}
                      alt="Notice Image"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xs"
                    />
                  </div>
                  
                  <div className="sm:col-span-8 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-500/15 border border-pink-500 text-pink-500 font-title text-[8px] px-1.5 py-0.5 uppercase tracking-widest animate-pulse">
                        COMMISSIONS: OPEN
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">
                        Updated 2 days ago
                      </span>
                    </div>
                    <blockquote className="border-l-2 border-cyan-400 pl-3 italic text-xs text-zinc-300">
                      "Commission queues are currently open via VGen or Discord! Working mostly on furry/human pixel icons and Custom Deltacable AU layouts."
                    </blockquote>
                    <div className="flex gap-2">
                      <a
                        href="https://vgen.co/NEONbandit"
                        target="_blank"
                        rel="noopener"
                        className="text-[9px] font-title text-cyan-400 hover:text-white border-b border-cyan-400 hover:border-white transition-colors uppercase tracking-wider block"
                      >
                        [ VIEW COMMS PRICE SHEET ]
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Dynamic Projects Showcase component */}
              <PortfolioShowcase
                projects={initialProjects}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />

              {/* Banners edit and customizer configuration module */}
              <section
                id="banner-editor-compartment"
                className="border-4 border-zinc-800 bg-zinc-950 p-5 rounded-sm relative"
              >
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5 mb-4">
                  <div className="font-title text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> BANNER SLOT CONTROLLER
                  </div>
                  <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="text-[9px] font-title border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 px-3 py-1 cursor-pointer transition-colors uppercase rounded-xs"
                  >
                    {showConfig ? "[ Close Editor ]" : "[ Edit Banner Illustrations ]"}
                  </button>
                </div>

                {showConfig ? (
                  <div className="space-y-5">
                    {/* Add form */}
                    <form onSubmit={handleAddIllustration} className="space-y-3 bg-zinc-900 p-4 border border-zinc-800 rounded-sm">
                      <div className="text-[9px] font-title text-pink-500 uppercase tracking-widest">
                        // ADD CUSTOM ILLUSTRATION TO SCROLLING MARQUEE
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
                            Illustration Title
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Glowing Neon Synth"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
                            Direct Image Link / URL or Picsum Seed
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. https://picsum.photos/seed/cybercat/300/300"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-title text-zinc-400 uppercase tracking-wider">
                          Description Log (shows when clicked in banner)
                        </label>
                        <textarea
                          placeholder="Provide a back-story, drawing software used, or design logs..."
                          rows={2}
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                          className="px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400 rounded-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 border border-cyan-400 font-title text-[9px] tracking-wider text-white uppercase flex items-center justify-center gap-1 cursor-pointer transition-all rounded-sm box-glow-cyan"
                      >
                        <Plus className="w-3.5 h-3.5" /> MOUNT ILLUSTRATION SLOT
                      </button>
                    </form>

                    {/* Current list manager */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-title text-zinc-400 uppercase tracking-widest">
                        // ACTIVE BANNER SLOTS ({illustrations.length})
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {illustrations.map((item, index) => (
                          <div
                            key={index}
                            className="p-2 border border-zinc-800 bg-zinc-900 flex items-center justify-between gap-3 rounded-sm"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={item.url}
                                alt={item.title}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 object-cover border border-zinc-950 flex-shrink-0 rounded-xs"
                              />
                              <div className="min-w-0">
                                <h4 className="font-title text-[10px] text-white truncate uppercase tracking-wider">
                                  {item.title}
                                </h4>
                                <p className="text-[9px] text-zinc-500 truncate font-mono">
                                  Index slot #{index + 1}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveIllustration(index)}
                              className="text-zinc-500 hover:text-pink-500 hover:scale-105 p-1 cursor-pointer transition-all"
                              title="Delete illustration slot"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    You can dynamically update and test the scrolling galleries directly in this applet! Click the customizer button above to add your own external illustration links, drawing art seeds, or remove active ones.
                  </p>
                )}
              </section>

              {/* Secure interactive Guestbook widget */}
              <Guestbook />

            </div>
          </main>

          {/* Core Footer Element */}
          <footer className="border-t-4 border-pink-500 bg-zinc-950 py-8 px-4 text-center mt-12 relative z-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-title text-[10px] text-zinc-500 uppercase tracking-widest">
                © {new Date().getFullYear()} NEONBANDIT • ALL GLITCH PROTOCOLS RESERVED
              </span>

              <div className="flex gap-4">
                <a
                  href="https://github.com/FippyChannel"
                  className="font-title text-[9px] text-zinc-400 hover:text-cyan-400 tracking-wider transition-colors uppercase"
                >
                  // Github
                </a>
                <a
                  href="https://artfight.net/~NEONbandit"
                  className="font-title text-[9px] text-zinc-400 hover:text-pink-500 tracking-wider transition-colors uppercase"
                >
                  // ArtFight
                </a>
              </div>
            </div>
          </footer>

          {/* 4. MODALS / DETAILS FLOATING DETAILS OVERLAYS */}
          
          {/* Illustration click details preview modal */}
          {selectedIllustration && (
            <div
              id="illustration-viewer-modal"
              className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 cursor-zoom-out select-none"
              onClick={() => setSelectedIllustration(null)}
            >
              <div
                className="max-w-lg w-full border-4 border-pink-500 bg-zinc-950 p-5 rounded-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] cursor-default relative text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedIllustration(null)}
                  className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  title="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="font-title text-[8px] text-pink-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <FolderOpen className="w-3.5 h-3.5" /> Illustration File viewer
                </div>

                <div className="relative aspect-square w-full overflow-hidden border-2 border-zinc-900 bg-black rounded-sm mb-4 flex items-center justify-center p-8">
                  {selectedIllustration.id ? (
                    <PixelIcon
                      itemId={selectedIllustration.id}
                      size={240}
                      className="animate-pulse filter drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                    />
                  ) : (
                    <img
                      src={selectedIllustration.url}
                      alt={selectedIllustration.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                <h3 className="font-title text-base text-white tracking-widest uppercase text-glow-white border-b border-zinc-800 pb-2">
                  {selectedIllustration.title}
                </h3>
                
                <p className="text-sm font-sans text-zinc-300 mt-2.5 leading-relaxed bg-zinc-900/40 p-3 border border-zinc-900 rounded-sm">
                  {selectedIllustration.desc}
                </p>

                <div className="mt-4 flex gap-2.5 justify-end">
                  <button
                    onClick={() => setSelectedIllustration(null)}
                    className="px-4 py-1.5 border-2 border-zinc-700 hover:border-pink-500 hover:text-glow-pink text-white font-title text-[9px] tracking-widest cursor-pointer hover:bg-zinc-900 transition-all uppercase rounded-sm"
                  >
                    DISMISS FILE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Project Details detailed modal info */}
          {selectedProject && (
            <div
              id="project-viewer-modal"
              className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 cursor-pointer"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="max-w-2xl w-full border-4 border-cyan-400 bg-zinc-950 p-6 rounded-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-default text-left relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  title="Close popup"
                >
                  <X className="w-5.5 h-5.5" />
                </button>

                <div className="font-title text-[8px] text-cyan-400 uppercase tracking-widest mb-2">
                  // PROJECT CORE SPECIFICATIONS
                </div>

                <div className="relative aspect-video w-full overflow-hidden border-2 border-zinc-900 bg-black rounded-sm mb-4">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-title text-base sm:text-lg text-white tracking-widest text-glow-white uppercase">
                  {selectedProject.title}
                </h3>

                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[8px] font-title uppercase tracking-widest bg-zinc-900 border border-zinc-800 text-cyan-400 px-2 py-0.5 rounded-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  <span className="text-[8px] font-title uppercase tracking-widest bg-pink-500/10 border border-pink-500/20 text-pink-400 px-2 py-0.5 rounded-xs">
                    STABLE VERSION v1.0
                  </span>
                </div>

                <p className="text-sm font-sans text-zinc-300 mt-4 leading-relaxed bg-zinc-900/30 p-4 border border-zinc-800 rounded-sm">
                  {selectedProject.description}
                </p>

                {/* Simulated action links */}
                <div className="mt-5 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                  <span className="text-[10px] font-mono text-zinc-500">
                    ID_NODE: {selectedProject.id.toUpperCase()}_GLITCH_CELL
                  </span>

                  <div className="flex gap-3">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener"
                      className="px-4 py-2 border border-zinc-800 hover:border-cyan-400 text-white bg-zinc-900/50 hover:bg-zinc-900 font-title text-[9px] uppercase tracking-wider flex items-center gap-1.5 rounded-sm shadow-[0_0_6px_rgba(255,255,255,0.05)] cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" /> GITHUB REPO
                    </a>
                    
                    <button
                      onClick={() => alert(`Launching deployment node for ${selectedProject.title}...`)}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 border border-cyan-400 text-white font-title text-[9px] uppercase tracking-wider flex items-center gap-1.5 rounded-sm shadow-[0_0_8px_rgba(6,182,212,0.3)] cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> LAUNCH DEPLOY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
