import { useState, useEffect, FormEvent } from "react";
import { Send, FileSignature, MessageSquare, Trash2 } from "lucide-react";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  stickerId: string;
}

const STICKERS = [
  { id: "heart", char: "💖", label: "Heart" },
  { id: "sparkle", char: "✨", label: "Sparkle" },
  { id: "star", char: "⭐", label: "Star" },
  { id: "cat", char: "🐱", label: "Cat Neko" },
  { id: "beer", char: "🍹", label: "Synth Drnk" },
  { id: "disk", char: "💾", label: "Floppy Disk" },
  { id: "champagne", char: "🥂", label: "Champagne" },
  { id: "bottlepop", char: "🍾", label: "Bottle Pop" },
  { id: "dice", char: "🎲", label: "Dice" },

];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSticker, setSelectedSticker] = useState("heart");

  useEffect(() => {
    // Load existing messages
    const cached = localStorage.getItem("cyber_guestbook_items");
    if (cached) {
      try {
        setEntries(JSON.parse(cached));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed with some cute retro mock items
      const seeds: GuestbookEntry[] = [
        {
          id: "seed-1",
          name: "Jill_Stingray",
          message: "Welcome to the showcase! Best place to grab a cold drink after a long day in Glitch City.",
          timestamp: "2026-06-18 20:14",
          stickerId: "beer",
        },
        {
          id: "seed-2",
          name: "Gabi",
          message: "omg those custom illustrations in the banner are so extremely cute!! Keep drawing! 💗",
          timestamp: "2026-06-19 09:41",
          stickerId: "heart",
        },
      ];
      setEntries(seeds);
      localStorage.setItem("cyber_guestbook_items", JSON.stringify(seeds));
    }
  }, []);

  const handleSign = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `sign-${Date.now()}`,
      name: name.trim().slice(0, 20),
      message: message.trim().slice(0, 160),
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
      stickerId: selectedSticker,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("cyber_guestbook_items", JSON.stringify(updated));

    // Clear input
    setName("");
    setMessage("");
  };

  const handleDelete = (id: string) => {
    const filtered = entries.filter((item) => item.id !== id);
    setEntries(filtered);
    localStorage.setItem("cyber_guestbook_items", JSON.stringify(filtered));
  };

  return (
    <div
      id="retro-guestbook-section"
      className="border-4 border-pink-500 bg-zinc-950 p-5 shadow-[0_0_15px_rgba(236,72,153,0.3)] relative rounded-sm flex flex-col gap-4"
    >
      <div className="absolute top-2 right-2 flex gap-1 pointer-events-none">
        <div className="w-1.5 h-1.5 bg-pink-500" />
        <div className="w-3 h-1.5 bg-pink-500/50" />
        <div className="w-6 h-1.5 bg-cyan-400" />
      </div>

      <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-800 pb-2">
        <span className="font-title text-sm text-pink-500 uppercase tracking-widest flex items-center gap-1.5">
          <FileSignature className="w-3.5 h-3.5" /> SIGN THE GUESTBOOK
        </span>
        <span className="font-title text-sm text-zinc-600">
          SECURE_BBS_V2
        </span>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSign} className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-title text-sm text-zinc-400 uppercase tracking-wider">
              Codename / Signature
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hacker_Neko"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 bg-zinc-900 border-2 border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500 focus:box-glow-pink rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-title text-sm text-zinc-400 uppercase tracking-wider">
              Attach Sticker Stamp
            </label>
            <div className="flex gap-1.5 justify-between py-1 bg-zinc-900/40 px-2 border border-zinc-800 rounded-sm">
              {STICKERS.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSelectedSticker(s.id)}
                  title={s.label}
                  className={`w-7 h-7 flex items-center justify-center text-sm cursor-pointer border hover:border-pink-500/50 hover:bg-zinc-900 transition-all rounded-xs ${
                    selectedSticker === s.id
                      ? "border-pink-500 bg-pink-500/10 scale-110"
                      : "border-zinc-800 bg-black/40"
                  }`}
                >
                  {s.char}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-title text-sm text-zinc-400 uppercase tracking-wider">
            Secure Message Transmission
          </label>
          <textarea
            required
            rows={2}
            placeholder="Type your message of support or hello..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border-2 border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500 focus:box-glow-pink rounded-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-title text-center text-sm tracking-widest cursor-pointer flex items-center justify-center gap-2 border-2 border-pink-400 select-none box-glow-pink transition-all duration-300 rounded-sm"
        >
          <Send className="w-3.5 h-3.5 animate-pulse" /> TRANSMIT TO BULLETIN
        </button>
      </form>

      {/* Message Bulletin List (Scrollable) */}
      <div className="border border-zinc-800 bg-zinc-950/80 rounded-sm mt-2 max-h-60 overflow-y-auto">
        <div className="bg-zinc-900 border-b border-zinc-800 px-3 py-1.5 flex justify-between items-center text-sm font-title">
          <span className="text-cyan-400 uppercase tracking-wide flex items-center gap-1">
            <MessageSquare className="w-3 h-3" /> BBS WALL POSTS
          </span>
          <span className="text-zinc-500">{entries.length} POSTS</span>
        </div>

        {entries.length === 0 ? (
          <div className="p-4 text-center font-sans text-sm text-zinc-500">
            No entries found. Be the first to append to the system logs!
          </div>
        ) : (
          <div className="divide-y divide-zinc-900">
            {entries.map((item) => (
              <div
                key={item.id}
                className="p-3 hover:bg-zinc-900/30 transition-colors flex gap-2 items-start"
              >
                {/* Stamp visual */}
                <div className="w-9 h-9 border border-pink-500/20 bg-zinc-900/80 rounded-sm flex items-center justify-center text-lg flex-shrink-0">
                  {STICKERS.find((s) => s.id === item.stickerId)?.char || "✨"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-title text-sm text-cyan-400 tracking-wide truncate">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-zinc-600">
                        {item.timestamp}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-zinc-600 hover:text-red-500 transition-colors cursor-pointer p-0.5 rounded-sm"
                        title="Delete log"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-sans text-zinc-300 mt-1 break-words sm:text-base">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
