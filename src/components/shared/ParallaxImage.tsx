"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
  fill = false,
  width,
  height,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30 * speed, 30 * speed]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }}>
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={className}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
          />
        )}
      </motion.div>
    </div>
  );
}
