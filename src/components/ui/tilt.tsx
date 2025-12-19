import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  rotationFactor?: number;
  perspective?: number;
}

export function Tilt({
  children,
  className,
  rotationFactor = 15,
  perspective = 1500,
  ...props
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage from center (-1 to 1)
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      // Calculate rotation
      // RotateY depends on X position (left/right)
      // RotateX depends on Y position (up/down) - needs to be inverted for natural feel
      const rotateY = xPct * rotationFactor;
      const rotateX = -yPct * rotationFactor;

      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setRotation({ x: 0, y: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, rotationFactor]);

  return (
    <div
      ref={ref}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ perspective: `${perspective}px` }}
      {...props}
    >
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}









