/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Check, Coffee, Utensils, Compass } from 'lucide-react';

interface Step5FoodMenuProps {
  selectedFood: '🥞 Dosa' | '☕ Cafe' | '🍷 Gourmet Restaurant' | null;
  postFoodActivities: string[];
  onSelectFood: (food: '🥞 Dosa' | '☕ Cafe' | '🍷 Gourmet Restaurant') => void;
  onTogglePostFoodActivity: (activity: string) => void;
  onNext: () => void;
}

export default function Step5FoodMenu({
  selectedFood,
  postFoodActivities,
  onSelectFood,
  onTogglePostFoodActivity,
  onNext,
}: Step5FoodMenuProps) {
  const foodOptions = [
    {
      id: '🥞 Dosa' as const,
      title: 'Dosa 🥞',
      desc: 'His absolute favourite comfort food! Golden-crispy and delicious inside 🤤',
      tag: '🔥 Sharath’s Fave',
    },
    {
      id: '☕ Cafe' as const,
      title: 'Cafe Vibe ☕',
      desc: 'Light, dainty bites, fresh sweet treats, pastries, and cute matching matcha.',
      tag: '☕ Chill & Aesthetic',
    },
    {
      id: '🍷 Gourmet Restaurant' as const,
      title: 'Luxury Dining 🍷',
      desc: 'Fine table linens, aromatic candlelights, and a gorgeous fancy dressing code.',
      tag: '✨ Romantic Fine-Dine',
    },
  ];

  const followUpActivities = [
    {
      id: '🚘 Car Ride',
      title: 'Car Ride 🚘',
      desc: 'Wind in our hair, quiet roads, and driving late into the night.',
    },
    {
      id: '🎳 Bowling',
      title: 'Bowling 🎳',
      desc: 'Work off those heavy meals! Competitive banter guaranteed.',
    },
    {
      id: '🌙 Stargazing',
      title: 'Stargazing 🌙',
      desc: 'Laying out blankets on a rooftop/hill and searching for glowing stars.',
    },
  ];

  const isFormComplete = selectedFood && postFoodActivities.length > 0;

  return (
    <div id="step-5-food-view" className="flex flex-col items-center justify-between flex-1 py-1 max-h-[72vh] overflow-y-auto pr-1">
      <div className="w-full text-center mb-4">
        <h2 className="text-3xl font-cursive text-brand-deep font-semibold">
          What shall we eat? 🥞🤤
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-sans">
          Select a culinary adventure that satisfies your cravings!
        </p>
      </div>

      {/* Food Cards Grid */}
      <div className="w-full grid grid-cols-1 gap-3.5">
        {foodOptions.map((item) => {
          const isSelected = selectedFood === item.id;

          return (
            <motion.button
              key={item.id}
              id={`food-option-${item.id.split(' ')[1]?.toLowerCase() || 'item'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectFood(item.id)}
              className={`text-left rounded-2xl p-4 border-2 flex justify-between items-center transition-all duration-300 relative select-none cursor-pointer bg-white/60 ${
                isSelected
                  ? 'border-brand-pink bg-rose-50/60 shadow-[0_4px_12px_rgba(255,105,180,0.25)] scale-[1.01]'
                  : 'border-brand-blush/35 hover:border-brand-pink/50'
              }`}
            >
              <div className="flex-1 pr-4">
                <span className="text-[10px] uppercase font-bold text-brand-crimson bg-pink-100/60 px-2 py-0.5 rounded-full select-none mb-1 inline-block">
                  {item.tag}
                </span>
                <h3 className="font-bold text-gray-800 text-md leading-none mb-1 mt-0.5 select-none">
                  {item.title}
                </h3>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-brand-pink bg-brand-pink text-white' : 'border-gray-300'
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Slide-in Follow-up segment after choosing food */}
      <AnimatePresence>
        {selectedFood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full mt-6 pt-5 border-t border-brand-blush/40 text-center flex flex-col items-center"
          >
            <h3 className="text-2xl font-cursive text-brand-deep font-semibold mb-1">
              And after eating… what shall we do? 💕
            </h3>
            <p className="text-xs text-gray-500 mb-4 font-sans">
              Choose one or multiple cozy post-dining plans!
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {followUpActivities.map((act) => {
                const isChecked = postFoodActivities.includes(act.id);

                return (
                  <motion.button
                    key={act.id}
                    id={`postfood-${act.id.split(' ')[1]?.toLowerCase() || 'item'}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onTogglePostFoodActivity(act.id)}
                    className={`p-2.5 rounded-xl border text-center flex flex-col justify-center items-center h-[72px] gap-1 transition-all duration-300 cursor-pointer ${
                      isChecked
                        ? 'border-brand-pink bg-rose-50/70 shadow-[0_0_8px_rgba(255,105,180,0.3)] ring-1 ring-brand-pink'
                        : 'border-gray-200 bg-white hover:border-brand-blush/60'
                    }`}
                  >
                    <span className="text-xl leading-none">{act.id.split(' ')[0]}</span>
                    <span className="text-xs font-semibold text-gray-800 leading-tight block select-none">
                      {act.title.substring(act.title.indexOf(' ') + 1)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button validation */}
      <div className="w-full mt-6 flex justify-center h-12 flex-shrink-0">
        <AnimatePresence>
          {isFormComplete && (
            <motion.button
              id="food-next-btn"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(255, 105, 180, 0.6)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onNext}
              className="px-10 py-3 bg-gradient-to-r from-brand-pink to-brand-crimson text-white font-bold text-md rounded-full shadow-md cursor-pointer flex items-center gap-1"
            >
              Next 💕
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
