import { useState } from "react";
import { ExternalLink, Github, Layers, Code, Palette, Play } from "lucide-react";
import { Project } from "../types";

interface PortfolioShowcaseProps {
  projects: Project[];
  onSelectProject: (proj: Project) => void;
}

export default function PortfolioShowcase({
  projects,
  onSelectProject,
}: PortfolioShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"all" | "coding" | "art" | "music">("all");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "coding":
        return <Code className="w-4.5 h-4.5 text-cyan-400" />;
      case "art":
        return <Palette className="w-4.5 h-4.5 text-pink-500" />;
      default:
        return <Layers className="w-4.5 h-4.5 text-yellow-400" />;
    }
  };

  return (
    <div
      id="retro-portfolio-showcase"
      className="border-4 border-cyan-400 bg-zinc-950 p-5 shadow-[0_0_15px_rgba(6,182,212,0.3)] relative rounded-sm flex flex-col gap-5"
    >
      {/* Absolute design accents */}
      <div className="absolute top-2 right-2 flex gap-1 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-cyan-400" />
        <div className="w-3 h-1.5 bg-cyan-400/50" />
        <div className="w-6 h-1.5 bg-pink-500" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-dashed border-zinc-800 pb-3 gap-3">
        <span className="font-title text-[10px] text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
          <Layers className="w-4.5 h-4.5" /> PROJECT SHOWCASE DATABASE
        </span>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5">
          {(["all", "coding", "art", "music"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-[9px] font-title uppercase tracking-wider cursor-pointer border transition-all duration-200 rounded-xs ${
                activeTab === tab
                  ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.25)]"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectProject(p)}
            className="group relative border-2 border-zinc-800 hover:border-pink-500 bg-zinc-900 p-3 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer rounded-sm"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-sm" />

            {/* Corner Bracket Highlights */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400 group-hover:border-pink-500 transition-colors pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400 group-hover:border-pink-500 transition-colors pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400 group-hover:border-pink-500 transition-colors pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400 group-hover:border-pink-500 transition-colors pointer-events-none" />

            <div>
              {/* Card visual wrapper */}
              <div className="relative aspect-video w-full overflow-hidden border border-zinc-950 bg-black rounded-sm mb-3">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Cyberpunk Category tag overlay on top left */}
                <span className="absolute top-2 left-2 bg-zinc-950/95 px-2 py-0.5 border border-zinc-800 rounded-sm text-[8px] font-title text-zinc-300 tracking-wider flex items-center gap-1">
                  {getCategoryIcon(p.category)}
                  {p.category.toUpperCase()}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-title text-sm tracking-widest text-white group-hover:text-pink-500 transition-colors duration-200">
                {p.title}
              </h3>
              <p className="text-xs font-sans text-zinc-400 mt-1 lines-clamp-2 leading-relaxed">
                {p.description}
              </p>
            </div>

            {/* Bottom Tech Stack list and links */}
            <div className="flex justify-between items-center border-t border-zinc-800 mt-4 pt-3 gap-2">
              <div className="flex gap-1.5 flex-wrap">
                {p.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[8px] font-title uppercase tracking-widest bg-zinc-950 border border-zinc-800 text-cyan-400 px-1.5 py-0.5 rounded-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action trigger button */}
              <span className="text-[9px] font-title uppercase text-zinc-500 group-hover:text-pink-400 transition-colors flex items-center gap-1 flex-shrink-0">
                VIEW DETAILS <Play className="w-2.5 h-2.5 fill-current" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
