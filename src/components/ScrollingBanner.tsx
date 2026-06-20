import React from "react";
import { PIXEL_ITEMS, PixelIcon } from "./PixelIcons";

interface ScrollingBannerProps {
  id: string;
  direction: "left" | "right";
  onSelectImage: (img: { id: string; url: string; title: string; desc: string }) => void;
}

export default function ScrollingBanner({
  id,
  direction,
  onSelectImage,
}: ScrollingBannerProps) {
  const tripleItems = [...PIXEL_ITEMS, ...PIXEL_ITEMS, ...PIXEL_ITEMS];

  return (
    <div
      id={id}
      className="relative w-full overflow-hidden bg-zinc-950/95 border-t border-b border-pink-500/80 py-2 shadow-[0_0_12px_rgba(236,72,153,0.1)] select-none"
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-500 opacity-80"></div>

      <div
        className={
          direction === "left"
            ? "animate-scroll-left flex gap-10 sm:gap-20 pr-10 sm:pr-20"
            : "animate-scroll-right flex gap-10 sm:gap-20 pr-10 sm:pr-20"
        }
      >
        {tripleItems.map((item, index) => {
          const adaptedItem = {
            id: item.id,
            url: item.id,
            title: item.title,
            desc: item.desc,
          };

          return (
            <div
              key={`${item.id}-${index}`}
              onClick={() => onSelectImage(adaptedItem)}
              className="group relative flex-shrink-0 cursor-pointer overflow-hidden border border-cyan-400/50 bg-zinc-950 p-0.5 w-7 h-7 sm:w-8 sm:h-8 hover:border-pink-500 hover:scale-105 active:scale-95 transition-all duration-300 rounded-sm flex items-center justify-center shadow-[0_0_4px_rgba(34,211,238,0.15)]"
              title={item.title}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400"></div>
              <div className="absolute top-0 right-0 w-1 h-1 bg-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-400"></div>

              <PixelIcon
                itemId={item.id}
                size={18}
                className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute bottom-[1px] right-[2px] bg-zinc-950/90 px-0.5 text-[10px] font-mono tracking-tight text-zinc-500 scale-90 origin-bottom-right">
                {(index % PIXEL_ITEMS.length + 1).toString().padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}