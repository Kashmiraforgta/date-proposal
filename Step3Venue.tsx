/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Compass, Home as HomeIcon, UtensilsCrossed } from 'lucide-react';
import { VenueType } from '../types';

interface Step3VenueProps {
  selectedVenue: VenueType;
  onSelect: (venue: VenueType) => void;
  onNext: () => void;
}

export default function Step3Venue({ selectedVenue, onSelect, onNext }: Step3VenueProps) {
  const venues = [
    {
      id: 'ROAMING' as VenueType,
      title: 'Roaming 🚗',
      desc: "Out & about exploring. Drives, walks, and fun vibes under open skies. Let's chase views! ✨",
      icon: Compass,
      bgColor: 'hover:bg-amber-50/40',
      activeBorder: 'border-brand-pink',
      badge: '🗺️ Spontaneous Adventure',
    },
    {
      id: 'HOME' as VenueType,
      title: 'Home 🏠',
      desc: 'A cozy, quiet night in. Snuggly hoodies, warm blankets, and our favorite movies. Just us! 🛋️',
      icon: HomeIcon,
      bgColor: 'hover:bg-rose-50/40',
      activeBorder: 'border-brand-pink',
      badge: '☕ Cute Cozy Vibe',
    },
    {
      id: 'FOOD_DATE' as VenueType,
      title: 'Food Date 🍽️',
      desc: "Treating our tummies! Sharing laughter and rich flavors over candlelight. Let's feed our souls! 🥞🤤",
      icon: UtensilsCrossed,
      bgColor: 'hover:bg-emerald-50/40',
      activeBorder: 'border-brand-pink',
      badge: '🍷 Gourmet Delights',
    },
  ];

  return (
    <div id="step-3-venue-view" className="flex flex-col items-center justify-between flex-1 py-2">
      <div className="w-full text-center mb-6">
        <h2 className="text-3xl font-cursive text-brand-deep font-semibold">
          Where are we headed, Sharath? 🗺️ 💕
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-sans">
          Choose the atmosphere that fits your romantic mood!
        </p>
      </div>

      {/* Grid of venue option cards */}
      <div className="w-full flex flex-col gap-4">
        {venues.map((venue) => {
          const isSelected = selectedVenue === venue.id;
          const IconComponent = venue.icon;

          return (
            <motion.button
              key={venue.id}
              id={`venue-option-${venue.id?.toLowerCase()}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(venue.id)}
              className={`w-full text-left rounded-2xl p-4 border-2 flex gap-4 items-center transition-all duration-300 relative overflow-hidden cursor-pointer bg-white/60 ${
                isSelected
                  ? 'border-brand-pink bg-rose-50/60 card-pulse-active scale-[1.01]'
                  : `border-brand-blush/40 hover:border-brand-pink/55 ${venue.bgColor}`
              }`}
            >
              {/* Highlight ribbon indicator */}
              <span className="text-xs absolute top-2 right-3 font-semibold text-brand-crimson/80 bg-brand-blush/30 px-2.5 py-0.5 rounded-full select-none">
                {venue.badge}
              </span>

              {/* Icon Container */}
              <div
                className={`p-3 rounded-2xl flex items-center justify-center ${
                  isSelected
                    ? 'bg-brand-pink text-white shadow-md'
                    : 'bg-brand-blush/20 text-brand-crimson'
                }`}
              >
                <IconComponent size={24} />
              </div>

              {/* Text Blocks */}
              <div className="flex-1 pr-6">
                <h3 className="font-bold text-gray-800 text-lg select-none leading-none">
                  {venue.title}
                </h3>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Glowing Next button once set */}
      <div className="w-full mt-6 flex justify-center">
        <AnimatePresence>
          {selectedVenue && (
            <motion.button
              id="venue-next-btn"
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
