import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0F1117] flex items-center justify-center overflow-hidden px-6">
      {/* Animated background circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="not-found-circle not-found-circle-orange" />
        <div className="not-found-circle not-found-circle-blue" />
        <div className="not-found-circle not-found-circle-purple" />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <h1 className="font-display text-[10rem] sm:text-[14rem] font-bold leading-none text-accent select-none">
          404
        </h1>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white -mt-4">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
          Looks like this page took a wrong turn. Let&apos;s get you back on
          track.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-accent px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>
          <Link
            href="/blog"
            className="rounded-md border-2 border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/40 cursor-pointer inline-flex items-center gap-2"
          >
            <BookOpen size={16} />
            Browse Blog
          </Link>
        </div>
      </div>

      <style>{`
                .not-found-circle {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                }
                .not-found-circle-orange {
                    width: 500px;
                    height: 500px;
                    background: #FF6B35;
                    opacity: 0.07;
                    top: 10%;
                    left: -8%;
                    animation: float1 8s ease-in-out infinite;
                }
                .not-found-circle-blue {
                    width: 400px;
                    height: 400px;
                    background: #3B82F6;
                    opacity: 0.05;
                    bottom: 5%;
                    right: -5%;
                    animation: float2 7s ease-in-out infinite;
                }
                .not-found-circle-purple {
                    width: 350px;
                    height: 350px;
                    background: #8B5CF6;
                    opacity: 0.06;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: float3 6s ease-in-out infinite;
                }
                @keyframes float1 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-40px) translateX(20px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(30px) translateX(-25px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.15); }
                }
            `}</style>
    </div>
  );
}
