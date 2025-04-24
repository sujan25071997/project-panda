"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type SlideOnEdgeProps = {
  src: string;
  direction?: "left" | "right";
  width?: number;
  height?: number;
  threshold?: number;
  duration?: number; // in milliseconds
};

const SlideOnEdge: React.FC<SlideOnEdgeProps> = ({
  src,
  direction = "right",
  width = 150,
  height = 150,
  threshold = 50,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isNearEdge =
        direction === "right"
          ? window.innerWidth - e.clientX < threshold
          : e.clientX < threshold;

      if (isNearEdge) {
        setVisible(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          setVisible(false);
        }, duration);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [direction, threshold, duration]);

  const positionClass = direction === "right" ? "right-0" : "left-0";
  const translateClass =
    direction === "right"
      ? visible
        ? "translate-x-0"
        : "translate-x-full"
      : visible
      ? "translate-x-0"
      : "-translate-x-full";

  const flipClass = direction === "left" ? "scale-x-[-1]" : "scale-x-[1]";

  return (
    <div
      className={`fixed top-1/2 ${positionClass} transform -translate-y-1/2 z-50`}
    >
      <div className={`transition-transform duration-500 ${translateClass}`}>
        <Image
          src={src}
          alt="Slide Image"
          width={width}
          height={height}
          className={`drop-shadow-xl ${flipClass}`}
        />
      </div>
    </div>
  );
};

export default SlideOnEdge;
