import React from "react";
import { Facebook, Instagram, Youtube, Twitter, Music2 } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

const ICONS = { Facebook, Instagram, X: Twitter, YouTube: Youtube, TikTok: Music2 };

export default function SocialLinks({ compact = false }) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      {SOCIAL_LINKS.map(({ name, url, color }) => {
        const Icon = ICONS[name];
        return (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            className={`flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all hover:scale-110 hover:text-white ${
              compact ? "h-9 w-9" : "h-10 w-10"
            }`}
            style={{ "--tw-shadow-color": color }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = color;
              e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#e5e5e5";
            }}
          >
            <Icon className={compact ? "h-4 w-4" : "h-[18px] w-[18px]"} />
          </a>
        );
      })}
    </div>
  );
}