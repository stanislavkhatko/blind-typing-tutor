"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface SessionTimerProps {
  expiresAt: number;
}

function formatTime(ms: number): string {
  if (ms <= 0) return "00:00";
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function SessionTimer({ expiresAt }: SessionTimerProps) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(() => expiresAt - Date.now());
  const loggedOutRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const ms = expiresAt - Date.now();
      setRemaining(ms);

      if (ms <= 0 && !loggedOutRef.current) {
        loggedOutRef.current = true;
        void fetch("/api/auth/logout", { method: "POST" }).then(() => {
          router.push("/login");
        });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt, router]);

  const isExpired = remaining <= 0;

  return (
    <span
      className={`font-mono text-sm tabular-nums px-2 py-1 rounded ${
        isExpired
          ? "text-red-600 dark:text-red-400"
          : remaining < 60_000
            ? "text-orange-500 dark:text-orange-400"
            : "text-gray-700 dark:text-gray-300"
      }`}
    >
      ⏱ {formatTime(remaining)}
    </span>
  );
}
