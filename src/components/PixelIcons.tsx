import React from "react";

// Standard indexable colors map matching cyber/neon color schemes
const COLOR_MAP: Record<string, string> = {
  ".": "transparent",
  "k": "#090510", // Extra dark outline
  "s": "#94a3b8", // Chrome/Silver grey
  "i": "#f1f5f9", // High glossy white/silver
  "c": "#22d3ee", // Vivid neon cyan
  "d": "#0891b2", // Cyber dark blue-cyan
  "w": "#ffffff", // Pure digital white
  "p": "#ec4899", // Neon hot pink
  "m": "#be185d", // Magenta shadow
  "g": "#10b981", // Emerald tech green
  "e": "#047857", // Deep emerald shadow
  "y": "#facc15", // Steaming noodle yellow
  "o": "#f97316", // Rusty copper / Chopsticks
  "v": "#a855f7", // Retro violet
  "u": "#7e22ce", // Synth dark purple
  "r": "#ef4444", // Crimson red
  "x": "#22c55e", // Active light grey-green
  "z": "#15803d", // Screen light green shadow
  "b": "#1e293b", // D-pad slate black
};

interface PixelItem {
  id: string;
  title: string;
  desc: string;
  grid: string[];
}

export const PIXEL_ITEMS: PixelItem[] = [
  {
    id: "hui_can",
    title: "V11 HUI ENERGY SODA",
    desc: "Carbonated Adelhyde syrup with a heavy kicker of synthetic ginger. Keeps terminal operators fully synced throughout the night shifts.",
    grid: [
      "..kkkkkkkkkk....",
      ".kisssssssik....",
      "kisssssssssik...",
      "kkkkkkkkkkkkkk..",
      "kcddwcccdwccdk..",
      "kcddwcccdwccdk..",
      "kcdwwwwwcdwwdk..",
      "kcdwwwwwcdwwdk..",
      "kcdwwpwpcdwwdk..",
      "kcdwwpwpcdwwdk..",
      "kcdwwwwwcdwwdk..",
      "kcddwcccdwccdk..",
      "kcddwcccdwccdk..",
      "kisssssssssik...",
      ".kkkkkkkkkkk....",
      "................"
    ]
  },
  {
    id: "takeout_noodles",
    title: "STREET SECTOR RAMEN",
    desc: "Smoky dashi broth, synthetic egg noodle, and rehydrated pork cutlet. Hot steam leaks through standard-issue biodegradable cardboard.",
    grid: [
      "....w...w.......",
      ".....w.w........",
      "....oo..oo......",
      "...ooko.o.......",
      "...oyyyyyy......",
      "..kyyyyyyyyyk...",
      "..kbbbbbbbbbk...",
      "..kbbbrrkbbbk...",
      "..kbbrrrrkbbk...",
      "..kbbbrrkbbbk...",
      "...kbbbbbbbk....",
      "...kdddddddk....",
      "....kkkkkkk.....",
      ".....yy.yy......",
      ".....y...y......",
      "................"
    ]
  },
  {
    id: "karmotrine_shot",
    title: "KARMOTRINE BLASTER",
    desc: "A concentrated, bright pink cocktail served in frosted high-tension boron glass. Optional neon green straw facilitates faster absorption.",
    grid: [
      ".......g........",
      "......g.........",
      "..kssgssssssk...",
      "..kspppppppsk...",
      "..kspppppppsk...",
      "...ksmmmmmsk....",
      "....kspppsk.....",
      ".....ksssk......",
      "......ksk.......",
      "......ksk.......",
      "......ksk.......",
      "......ksk.......",
      "....kkkskkk.....",
      "...ksssssssk....",
      "...kkkkkkkkk....",
      "................"
    ]
  },
  {
    id: "floppy_violet",
    title: "ENCRYPTED DATASLATE",
    desc: "An obsolete magnetic storage disk packed to the max with illegal Netrunner protocols and bootlegs of offline synthwave concerts.",
    grid: [
      "..kkkkkkkkkkkk..",
      ".kvvvvvvvvvvvk..",
      "kvvvvvvvvvvvuvk.",
      "kvsssvvvvvvvuuvk",
      "kvsssvvvvvvvuuvk",
      "kvvvvvvvvvvvuuvk",
      "kvvvvkkkkkvvuuvk",
      "kvvvvkwkkkvvuuvk",
      "kvvvvkwkkkvvuuvk",
      "kvvvvkwkkkvvuuvk",
      "kvvvvkwkkkvvuuvk",
      "kvvvvkwkkkvvuuvk",
      "kvvvvkkkkkvvuuvk",
      "kvvvvvvvvvvuuuk.",
      ".kkkkkkkkkkkk...",
      "................"
    ]
  },
  {
    id: "retro_gameboy",
    title: "CYBERBOY MICRO",
    desc: "8-bit micro console loaded with retro dungeon crawlers. Features a backlit screen utilizing radioactive green phosphor cells.",
    grid: [
      "..kkkkkkkkkkkk..",
      ".kgggggggggggk..",
      "kgggggggggggggk.",
      "kgkkkkkkkkkkkgk.",
      "kgksxxxxxxskgky.",
      "kgkszzzzzzskgky.",
      "kgksxxxxxxskgky.",
      "kgkkkkkkkkkkkgk.",
      "kggggbgggggggyk.",
      "kgggbbbgggggggk.",
      "kggggbgggrrgggk.",
      "kggggggggrrgggk.",
      "kgggggggggggggk.",
      ".kggbgbggbgbgk..",
      "..kkkkkkkkkk....",
      "................"
    ]
  },
  {
    id: "cyber_neko",
    title: "NEKOBANDIT HELMET",
    desc: "A custom titanium cyber-visor helmet designed for high-stress net diving. Outfitted with pink cooling ducts and active signal arrays.",
    grid: [
      "..kk........kk..",
      ".kppk......kppk.",
      "kwwppk....kwwppk",
      "kwwwwk....kwwwwk",
      "kwwwwwkkkkwwwwwk",
      "kwwwwwwwwwwwwwwk",
      "kwwwwwkkkkwwwwwk",
      "kwwwkcccccckwwwk",
      "kwwkcccccccckwwk",
      "kwwwkcccccckwwwk",
      "kwwwwkkkkkkwwwwk",
      "kwwwwwwwwwwwwwwk",
      "kwwwwwwwwwwwwwwk",
      ".kwwwwwwwwwwwwk.",
      "..kkkkkkkkkkkk..",
      "................"
    ]
  }
];

interface PixelIconProps {
  itemId: string;
  size?: number; // Size in CSS pixels
  className?: string;
}

export const PixelIcon: React.FC<PixelIconProps> = ({ itemId, size = 48, className = "" }) => {
  const item = PIXEL_ITEMS.find((x) => x.id === itemId) || PIXEL_ITEMS[0];
  const grid = item.grid;
  const gridHeight = grid.length;
  const gridWidth = grid[0]?.length || 16;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${gridWidth} ${gridHeight}`}
      className={className}
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    >
      {grid.map((row, rIdx) => {
        return row.split("").map((char, cIdx) => {
          const color = COLOR_MAP[char] || "transparent";
          if (color === "transparent") return null;
          return (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width={1.05} // Slightly larger overlap to avoid subpixel lines
              height={1.05}
              fill={color}
            />
          );
        });
      })}
    </svg>
  );
};
