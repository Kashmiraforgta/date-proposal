/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Check, Send } from 'lucide-react';
import { DateProposalState } from '../types';

interface Step6RevealProps {
  state: DateProposalState;
  onReset: () => void;
}

interface HeartBurst {
  id: number;
  x: number;
  y: number;
  scale: number;
  delay: number;
  emoji: string;
}

export default function Step6Reveal({ state, onReset }: Step6RevealProps) {
  const [bursts, setBursts] = useState<HeartBurst[]>([]);
  const [kissCount, setKissCount] = useState(0);
  const [activeKisses, setActiveKisses] = useState<{ id: number; x: number; y: number }[]>([]);

  // Trigger massive floating hearts explosion on mount
  useEffect(() => {
    const emojis = ['💖', '💕', '💗', '❤️', '💘', '🌸', '💝', '💓', '🥰', '✨'];
    const newBursts = Array.from({ length: 65 }, (_, idx) => {
      const angle = Math.random() * Math.PI * 2; // Full circle distribution
      const speed = 60 + Math.random() * 180; // Distance spread
      return {
        id: idx,
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed - 100, // Disperse upwards slightly
        scale: 0.6 + Math.random() * 1.4,
        delay: Math.random() * 0.5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
    });
    setBursts(newBursts);
  }, []);

  const handleKissTap = (e: React.MouseEvent<HTMLButtonElement>) => {
    setKissCount((prev) => prev + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.random() * 100 - 50; // scatter horizontal
    const y = -80 - Math.random() * 80; // rise vertical
    const newKiss = { id: Date.now(), x, y };
    setActiveKisses((prev) => [...prev, newKiss]);
    
    // Clean up kiss emoji
    setTimeout(() => {
      setActiveKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 1500);
  };

  const getDayNameSuffix = (dayNumStr: string) => {
    const day = parseInt(dayNumStr, 10);
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formatProposalDate = (dateStr: string | null) => {
    if (!dateStr) return 'TBD date';
    const parts = dateStr.split('-');
    const m = parts[1] === '06' ? 'June' : 'July';
    const d = parts[2];
    const suffix = getDayNameSuffix(d);
    return `${m} ${parseInt(d, 10)}${suffix}, 2026`;
  };

  const getVenueText = (v: string | null) => {
    if (v === 'ROAMING') return 'Roaming Adventure 🚗';
    if (v === 'HOME') return 'Cozy Night in 🏠';
    return 'Food Date Feast 🍽️';
  };

  const isFoodRoute = state.selectedVenue === 'FOOD_DATE';
  const activities = isFoodRoute ? state.postFoodActivities : state.selectedActivities;

  return (
    <div id="step-6-reveal-view" className="flex flex-col items-center justify-between flex-1 py-1 relative">
      {/* Heart Burst confetti layer */}
      <div className="absolute inset-x-0 top-1/2 flex items-center justify-center pointer-events-none z-30">
        {bursts.map((b) => (
          <motion.span
            key={b.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: b.x,
              y: b.y,
              scale: b.scale,
              opacity: 0,
            }}
            transition={{
              duration: 1.8,
              delay: b.delay,
              ease: 'easeOut',
            }}
            className="absolute text-2xl filter drop-shadow-md select-none"
          >
            {b.emoji}
          </motion.span>
        ))}
      </div>

      {/* Invitation Header */}
      <div className="w-full text-center mb-5 z-10">
        <motion.div
          animate={{ rotate: [0, -4, 4, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-5xl mb-2.5 inline-block select-none filter drop-shadow-sm"
        >
          🎉💌
        </motion.div>
        
        <h2 className="text-4xl text-brand-deep font-bold font-cursive tracking-wide">
          It's a Date, Sharath! 💕
        </h2>
        
        <p className="text-md text-brand-pink font-semibold mt-1 italic font-cursive">
          I can't wait to be with you 💕
        </p>
      </div>

      {/* Styled Calligraphy Invitation Card block */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-full bg-[#FCFBE3] border-2 border-dashed border-brand-crimson/50 rounded-2xl p-5 sm:p-6 shadow-[0_8px_20px_rgba(139,0,0,0.1)] relative z-10 overflow-hidden"
      >
        {/* Background stamp accent */}
        <div className="absolute top-4 right-4 text-4xl opacity-15 rotate-12 select-none">
          💝
        </div>

        {/* Card watermark grids */}
        <div className="border border-brand-blush/30 rounded-xl p-4 flex flex-col gap-4 font-sans text-stone-700">
          <div className="text-center font-cursive text-brand-crimson text-2xl font-bold border-b border-brand-blush/40 pb-2 select-none">
            ~ Official Love Invitation ~
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm sm:text-base">
            <div className="flex items-start gap-2.5">
              <span className="text-lg shrink-0">📆</span>
              <div>
                <span className="font-semibold text-gray-400 text-xs block uppercase tracking-wider font-sans">Date</span>
                <span className="text-brand-deep font-bold font-sans">{formatProposalDate(state.selectedDate)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-lg shrink-0">⏰</span>
              <div>
                <span className="font-semibold text-gray-400 text-xs block uppercase tracking-wider font-sans">Time</span>
                <span className="text-brand-deep font-semibold font-sans">{state.selectedTime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="text-lg shrink-0">📍</span>
              <div>
                <span className="font-semibold text-gray-400 text-xs block uppercase tracking-wider font-sans">Venue atmosphere</span>
                <span className="text-brand-deep font-semibold font-sans">{getVenueText(state.selectedVenue)}</span>
              </div>
            </div>

            {isFoodRoute && state.selectedFood && (
              <div className="flex items-start gap-2.5">
                <span className="text-lg shrink-0">🍛</span>
                <div>
                  <span className="font-semibold text-gray-400 text-xs block uppercase tracking-wider font-sans">Desired Meal</span>
                  <span className="text-brand-deep font-bold font-sans">{state.selectedFood}</span>
                </div>
              </div>
            )}
          </div>

          {/* Activities List */}
          {activities.length > 0 && (
            <div className="border-t border-brand-blush/30 pt-3 flex flex-col gap-1.5">
              <span className="font-semibold text-gray-400 text-xs uppercase tracking-wider font-sans block">
                {isFoodRoute ? 'After-eating custom agenda:' : 'Our customized agenda:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {activities.map((act, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-brand-deep font-semibold">
                    <span className="text-brand-pink text-[10px]">❤️</span>
                    <span className="font-sans font-light text-stone-600">{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Romantic CTA kisses & restart */}
      <div className="w-full flex flex-col items-center gap-3.5 mt-5 z-20">
        {/* Kissing interactive CTA */}
        <div className="relative">
          {/* Animated floating kiss icons */}
          {activeKisses.map((k) => (
            <motion.span
              key={k.id}
              initial={{ x: 0, y: 0, scale: 0.5, opacity: 1, rotate: 0 }}
              animate={{
                x: k.x,
                y: k.y,
                scale: 1.5,
                opacity: 0,
                rotate: Math.random() * 40 - 20,
              }}
              className="absolute text-3xl font-bold select-none pointer-events-none"
              style={{ top: 0, left: '50%' }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
            >
              💋
            </motion.span>
          ))}

          <motion.button
            id="kiss-sender-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleKissTap}
            className="px-6 py-3 bg-pink-100 hover:bg-pink-150 border-2 border-brand-blush text-brand-crimson font-bold text-sm rounded-full cursor-pointer flex items-center gap-2 shadow-sm transition-all"
          >
            Send Kiss Back 💋
            {kissCount > 0 && (
              <span className="bg-brand-pink text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-sans tracking-tight animate-ping">
                {kissCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Small subtle button to clear or edit details */}
        <button
          id="invitation-restart-btn"
          onClick={onReset}
          className="text-xs text-brand-crimson/50 hover:text-brand-crimson/80 underline font-semibold transition-colors cursor-pointer block py-1.5"
        >
          Change Choices / Start Over 💞
        </button>
      </div>
    </div>
  );
}
