"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  className?: string;
  startOnVisible?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  duration = 2000,
  className,
  startOnVisible = true,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current && startOnVisible) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    if (targetValue === 0) {
        setCount(0);
        return;
    }

    const increment = Math.max(1, Math.ceil(targetValue / (duration / 30)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [targetValue, duration, isVisible]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
};

export default AnimatedCounter;