"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const RunawayPanda = () => {
  const pandaRef = useRef<HTMLImageElement | null>(null);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  const moveToRandomPosition = () => {
    const x = Math.floor(Math.random() * 90);
    const y = Math.floor(Math.random() * 90);
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!pandaRef.current) return;

    const panda = pandaRef.current.getBoundingClientRect();
    const distance = Math.hypot(
      panda.x + panda.width / 2 - e.clientX,
      panda.y + panda.height / 2 - e.clientY
    );

    if (distance < 100) {
      moveToRandomPosition();
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <Image
        ref={pandaRef}
        src="/bubududu-panda.gif"
        alt="Panda"
        width={100}
        height={100}
        className="absolute transition-all duration-500"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};
