/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Check } from 'lucide-react';
import { VenueType } from '../types';

interface Step4ActivitiesProps {
  selectedVenue: VenueType;
  selectedActivities: string[];
  onToggleActivity: (activity: string) => void;
  onNext: () => void;
}

export default function Step4Activities({
  selectedVenue,
  selectedActivities,
  onToggleActivity,
  onNext,
}: Step4ActivitiesProps) {
  // Config arrays for each venue path
  const roamingActivities = [
    {
      id: '🛍️ Shopping',
      title: 'Shopping 🛍️',
      desc: 'Let’s go retail therapy together! Pick out cute outfits for each other.',
    },
    {
      id: '🚘 Car Ride',
      title: 'Car Ride 🚘',
      desc: 'Just drive, sing our favorite tracks at top volume, and vibe with sunset/night views.',
    },
    {
      id: '🎳 Bowling',
      title: 'Bowling 🎳',
      desc: 'A little competitive fun! Winner gets a sweet forehead kiss.',
    },
    {
      id: '☕ Cafe Hopping',
      title: 'Cafe Hopping ☕',
      desc: 'Explore gorgeous aesthetics, sip hot matcha, and take lovely photos.',
    },
  ];

  const homeActivities = [
    {
      id: '🎬 Movie Night',
      title: 'Movie Night 🎬',
      desc: '', // Empty
    },
    {
      id: '🎮 Game Night',
      title: 'Game Night 🎮',
      desc: '', // Empty
    },
  ];

  const activitiesList = selectedVenue === 'ROAMING' ? roamingActivities : homeActivities;

  return (
    <div id="step-4-activities-view" className="flex flex-col items-center justify-between flex-1 py-1">
      <div className="w-full text-center mb-4">
        <h2 className="text-3xl font-cursive text-brand-deep font-semibold">
          What shall we do, Sharath? ✨ 💕
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-sans">
          Pick one or multiple activities! We will do all of them!
        </p>
      </div>

      {/* Grid of activities */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
        {activitiesList.map((activity) => {
          const isSelected = selectedActivities.includes(activity.id);

          return (
            <motion.button
              key={activity.id}
              id={`activity-option-${activity.id.split(' ')[1]?.toLowerCase() || 'item'}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onToggleActivity(activity.id)}
              className={`text-left rounded-2xl py-3.5 px-4 border-2 transition-all duration-300 relative select-none cursor-pointer flex items-center min-h-[58px] ${
                isSelected
                  ? 'border-brand-pink bg-rose-50/70 shadow-[0_0_12px_rgba(255,105,180,0.35)] scale-[1.01]'
                  : 'border-brand-blush/30 bg-white/70 hover:border-brand-pink/50'
              }`}
            >
              {/* Heart tick badge */}
              <div className="absolute right-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-brand-pink border-brand-pink text-white scale-110'
                      : 'border-gray-300 text-transparent'
                  }`}
                >
                  <Check size={11} strokeWidth={3} />
                </div>
              </div>

              <div className="pr-8">
                <h3 className="font-bold text-gray-800 text-md leading-none select-none">
                  {activity.title}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Slide-in Next button */}
      <div className="w-full mt-5 flex flex-col items-center gap-2">
        <AnimatePresence>
          {selectedActivities.length > 0 ? (
            <motion.button
              id="activities-next-btn"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(255, 105, 180, 0.6)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onNext}
              className="px-10 py-3.5 bg-gradient-to-r from-brand-pink to-brand-crimson text-white font-bold text-md rounded-full shadow-md cursor-pointer flex items-center gap-1"
            >
              Next 💕
            </motion.button>
          ) : (
            <span className="text-xs text-brand-crimson/50 italic h-[46px] flex items-center">
              Please choose at least one activity...
            </span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
