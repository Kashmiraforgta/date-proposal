/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Step1AskProps {
  onYes: () => void;
}

export default function Step1Ask({ onYes }: Step1AskProps) {
  const [noCount, setNoCount] = useState(0);
  const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  
  // High-contrast, playful pleading prompts as Sharath keeps chasing "No"
  const pleadingMessages = [
    '', // Initial state
    'Are you sure? 🥺',
    'Please say Yes? 🎀',
    'My heart is breaking... 💔',
    'But I adore you so much! 💕',
    'I bought your favorite treats! 🥞🤤',
    'No is physically impossible! 😉',
    'I will wait here forever... ⏳💕',
    'Resistance is adorable, but futile! 😜',
  ];

  const getPleadingMessage = () => {
    if (noCount === 0) return '';
    return pleadingMessages[Math.min(noCount, pleadingMessages.length - 1)];
  };

  const teleportNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    // Pick random percentage coordinates relative to the internal relative container
    const randomX = Math.floor(Math.random() * 60) + 15; // 15% to 75%
    const randomY = Math.floor(Math.random() * 60) + 15; // 15% to 75%
    
    setNoStyle({
      position: 'absolute',
      left: `${randomX}%`,
      top: `${randomY}%`,
      zIndex: 100,
      transition: 'left 0.2s ease-out, top 0.2s ease-out',
    });
    
    setNoCount((prev) => prev + 1);
  };

  return (
    <div id="step-1-ask-view" className="flex flex-col items-center justify-center text-center py-6 flex-1 min-h-[350px] relative w-full overflow-visible">
      {/* Heart visual crown */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="text-6xl mb-6 select-none"
      >
        💖
      </motion.div>

      {/* Main question headings */}
      <h1 className="text-4xl sm:text-5xl font-bold font-cursive text-brand-deep tracking-wide leading-relaxed px-2">
        Sharath… 
      </h1>
      
      <p className="text-xl sm:text-2xl font-medium mt-4 text-brand-crimson/90 leading-relaxed max-w-sm mx-auto">
        Will you go on a date with me? 💕
      </p>

      {/* Dynamic pleading message with smooth bounce entry */}
      {noCount > 0 && (
        <motion.div
          key={noCount}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mt-6 text-brand-pink font-semibold text-lg flex items-center gap-1.5 justify-center"
        >
          <span>{getPleadingMessage()}</span>
        </motion.div>
      )}

      {/* Primary Interaction Buttons (Yes and Teleport No) */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-xs mx-auto relative min-h-[140px] sm:min-h-0 sm:h-20">
        {/* Yes Button - styled with intense premium blush/crimson gradients */}
        <motion.button
          id="proposal-yes-btn"
          whileHover={{ scale: 1.10, boxShadow: '0 0 15px rgba(255, 105, 180, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-pink via-brand-crimson to-brand-deep text-white font-bold text-lg rounded-full cursor-pointer shadow-[0_4px_15px_rgba(139,0,0,0.25)] transition-all z-20"
        >
          Yes!! 🥰
        </motion.button>

        {/* No Button - floating or inline depending on chasing count */}
        <motion.button
          id="proposal-no-btn"
          style={noStyle}
          onMouseEnter={teleportNoButton}
          onTouchStart={teleportNoButton}
          onClick={teleportNoButton}
          className={`w-full sm:w-auto px-6 py-3 bg-white border-2 border-brand-blush text-brand-crimson font-semibold rounded-full shadow-md z-1 opacity-90 cursor-pointer ${
            noCount === 0 ? 'relative' : 'shadow-lg bg-pink-50'
          }`}
        >
          No 😢
        </motion.button>
      </div>
    </div>
  );
}
