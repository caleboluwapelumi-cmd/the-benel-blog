"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            if (totalHeight > 0) {
                setProgress((window.scrollY / totalHeight) * 100);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-[3px] bg-[#FF6B35] transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%`, zIndex: 9999 }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
        />
    );
}
