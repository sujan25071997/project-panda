"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const RunawayPanda = () => {
  const pandaRef = useRef<HTMLImageElement | null>(null);
  const [positionX, setPositionX] = useState("50%");
  const [isMoving, setIsMoving] = useState(false);

  const moveToRandomX = () => {
    const x = Math.floor(Math.random() * 90);
    setPositionX(`${x}%`);
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 1000); // slightly longer for smoother reset
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!pandaRef.current) return;

    const panda = pandaRef.current.getBoundingClientRect();
    const distance = Math.hypot(panda.x + panda.width / 2 - e.clientX);

    if (distance < 100) {
      moveToRandomX();
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 bottom-14 pointer-events-none z-20">
      {/* Shadow */}
      <div
        className="absolute w-[60px] h-[10px] bg-black/30 rounded-full blur-sm"
        style={{
          left: positionX,
          bottom: "5px",
          transform: "translateX(-50%)",
        }}
      />

      {/* Panda wrapper */}
      <div
        className={`absolute transition-[left] ${
          isMoving ? "duration-700" : "duration-1000"
        } ease-in-out`}
        style={{
          left: positionX,
          bottom: "10px",
          transform: "translateX(-50%)",
        }}
      >
        <Image
          ref={pandaRef}
          src="/bubududu-panda.gif"
          alt="Panda"
          width={100}
          height={100}
          className="panda-bounce"
          style={{
            filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.7)) contrast(1.2)",
          }}
        />
      </div>
    </div>
  );
};
