'use client';

import { useEffect, useRef, useState } from 'react';
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function CountUp({
  value,
  suffix = '',
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    motionValue.set(value);
  }, [inView, value, reduce, motionValue]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {reduce ? value : display}
      {suffix}
    </span>
  );
}
