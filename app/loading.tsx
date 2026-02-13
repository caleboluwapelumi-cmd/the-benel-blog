import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] bg-white flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <span className="font-display text-4xl font-bold text-text select-none">
            BenEl
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-accent rounded-full loading-underline" />
        </div>

        {/* Spinner */}
        <Loader2 size={24} className="animate-spin text-accent" />
      </div>

      <style>{`
                .loading-underline {
                    animation: pulseUnderline 1.5s ease-in-out infinite;
                }
                @keyframes pulseUnderline {
                    0%, 100% { opacity: 0.4; transform: scaleX(0.6); }
                    50% { opacity: 1; transform: scaleX(1); }
                }
            `}</style>
    </div>
  );
}
