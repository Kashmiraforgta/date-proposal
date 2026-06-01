/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StepLayoutProps {
  currentStep: number;
  totalSteps?: number;
  children: ReactNode;
}

export default function StepLayout({ currentStep, totalSteps = 5, children }: StepLayoutProps) {
  // Map our actual Step 1-6 model to the 5 visual milestones:
  // Step 1 -> index 1 (Ask)
  // Step 2 -> index 2 (Date & Time)
  // Step 3 -> index 3 (Venue)
  // Step 4 / 5 -> index 4 (Activities or Food)
  // Step 6 -> index 5 (Invitation Card)
  const getVisualStep = (step: number): number => {
    if (step <= 3) return step;
    if (step === 4 || step === 5) return 4;
    return 5;
  };

  const activeMilestone = getVisualStep(currentStep);

  const stepLabels = [
    'The Ask ✨',
    'Schedule 🗓️',
    'Venue 🗺️',
    'Creative Plans ✨',
    'My Invitation 💌',
  ];

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col justify-between items-center relative z-10 w-full max-w-lg mx-auto">
      {/* Decorative Top Progress Header */}
      {currentStep < 6 && (
        <div className="w-full text-center flex flex-col items-center gap-2 mt-2">
          {/* Heart milestones */}
          <div className="flex gap-3 justify-center items-center drop-shadow-md">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const stepIndex = idx + 1;
              const isCompleted = stepIndex < activeMilestone;
              const isActive = stepIndex === activeMilestone;

              return (
                <motion.span
                  key={idx}
                  id={`heart-step-${stepIndex}`}
                  className={`text-xl transition-all duration-300 ${
                    isCompleted
                      ? 'text-brand-crimson scale-100'
                      : isActive
                      ? 'text-brand-pink scale-125 drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]'
                      : 'text-gray-300'
                  }`}
                  animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                >
                  {isCompleted || isActive ? '❤️' : '♡'}
                </motion.span>
              );
            })}
          </div>

          {/* Scented label for the step */}
          <span className="text-xs tracking-wider uppercase text-brand-crimson font-medium block h-4">
            {stepLabels[activeMilestone - 1] || ''}
          </span>

          {/* Smooth progress bar */}
          <div className="w-48 h-1.5 bg-brand-blush/40 rounded-full overflow-hidden mt-1 max-w-full">
            <motion.div
              className="h-full bg-linear-to-r from-brand-pink to-brand-crimson"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeMilestone / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      {/* Main card viewport with stable heights and elegant pink dropshadows */}
      <div className="flex-1 w-full flex items-center justify-center my-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            id="proposal-card-container"
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-3 border-brand-blush shadow-[0_10px_30px_rgba(139,0,0,0.08)] relative overflow-hidden flex flex-col justify-between"
          >
            {/* Corner Accents */}
            <div className="absolute top-2 left-2 text-md opacity-25 select-none font-sans">💖</div>
            <div className="absolute top-2 right-2 text-md opacity-25 select-none font-sans">✨</div>
            <div className="absolute bottom-2 left-2 text-md opacity-25 select-none font-sans">✨</div>
            <div className="absolute bottom-2 right-2 text-md opacity-25 select-none font-sans">💖</div>

            {/* Inner frame */}
            <div className="relative z-10 w-full flex flex-col flex-1">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer sign-off */}
      <div className="text-center text-xs text-brand-crimson/60 font-medium select-none z-10">
        Made with love for Sharath 💖
      </div>
    </div>
  );
}
