/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';

interface HeartConfig {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  emoji: string;
}

export default function FloatingHearts() {
  const heartEmojis = ['💖', '💕', '💗', '❤️', '💘', '🌸', '💝', '💓'];

  const hearts: HeartConfig[] = useMemo(() => {
    return Array.from({ length: 18 }, (_, idx) => {
      const leftVal = (idx * 5.5 + Math.random() * 4).toFixed(1); // Spread across the viewport
      const delayVal = (Math.random() * 12).toFixed(1);
      const durationVal = (10 + Math.random() * 10).toFixed(1);
      const sizeVal = (1 + Math.random() * 1.5).toFixed(1); // Size in rem: 1rem to 2.5rem
      const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      return {
        id: idx,
        left: `${leftVal}%`,
        delay: `${delayVal}s`,
        duration: `${durationVal}s`,
        size: `${sizeVal}rem`,
        emoji: randomEmoji,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
