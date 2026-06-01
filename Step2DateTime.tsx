/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { TimeOfDayType } from '../types';

interface Step2DateTimeProps {
  selectedDate: string | null;
  selectedTime: TimeOfDayType;
  onSelect: (date: string, time: TimeOfDayType) => void;
  onNext: () => void;
}

export default function Step2DateTime({
  selectedDate,
  selectedTime,
  onSelect,
  onNext,
}: Step2DateTimeProps) {
  const [activeMonth, setActiveMonth] = useState<'June' | 'July'>('June');

  // Days configuration for Sunday-start grid
  // June 2026 starts Monday (index 1), so 1 empty cell at start of Sunday grid
  const juneDaysCount = 30;
  const juneEmptyCells = 1;

  // July 2026 starts Wednesday (index 3), so 3 empty cells at start of Sunday grid
  const julyDaysCount = 31;
  const julyEmptyCells = 3;

  const handleDayClick = (dayNum: number) => {
    const monthNum = activeMonth === 'June' ? '06' : '07';
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const dateStr = `2026-${monthNum}-${formattedDay}`;
    onSelect(dateStr, selectedTime);
  };

  const handleTimeClick = (time: TimeOfDayType) => {
    if (selectedDate) {
      onSelect(selectedDate, time);
    } else {
      // Prompt selection of date first
      onSelect('', time);
    }
  };

  const isCurrentSelected = (dayNum: number): boolean => {
    if (!selectedDate) return false;
    const monthNum = activeMonth === 'June' ? '06' : '07';
    const formattedDay = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    return selectedDate === `2026-${monthNum}-${formattedDay}`;
  };

  // Human readable label for selected date
  const getReadableDate = () => {
    if (!selectedDate) return '';
    const parts = selectedDate.split('-');
    const m = parts[1] === '06' ? 'June' : 'July';
    const d = parseInt(parts[2], 10);
    return `${m} ${d}, 2026`;
  };

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthName = activeMonth === 'June' ? 'June 2026' : 'July 2026';
  const totalDays = activeMonth === 'June' ? juneDaysCount : julyDaysCount;
  const emptyCells = activeMonth === 'June' ? juneEmptyCells : julyEmptyCells;

  const timeOptions: TimeOfDayType[] = [
    'Morning ☀️',
    'Afternoon 🌤️',
    'Evening 🌇',
    'Night 🌙',
  ];

  return (
    <div id="step-2-datetime-view" className="flex flex-col items-center justify-between flex-1 py-2">
      <div className="w-full text-center mb-4">
        <h2 className="text-3xl font-cursive text-brand-deep font-semibold">
          When shall we go, Sharath? 🗓️ 💕
        </h2>
        <p className="text-xs text-gray-500 mt-1 font-sans">
          Pick a date and a comfortable time of day!
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Calendar Box */}
        <div className="bg-white border-2 border-brand-blush/60 rounded-2xl p-4 shadow-[0_5px_15px_rgba(255,105,180,0.04)] flex flex-col items-center">
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between w-full mb-3 px-1">
            <button
              id="calendar-prev-month"
              onClick={() => setActiveMonth('June')}
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                activeMonth === 'June'
                  ? 'text-gray-300 pointer-events-none'
                  : 'text-brand-crimson hover:bg-pink-100'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-semibold text-brand-deep text-sm flex items-center gap-1">
              <Calendar size={14} className="text-brand-pink" />
              {monthName}
            </span>
            <button
              id="calendar-next-month"
              onClick={() => setActiveMonth('July')}
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${
                activeMonth === 'July'
                  ? 'text-gray-300 pointer-events-none'
                  : 'text-brand-crimson hover:bg-pink-100'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Grid Layout of Calendar */}
          <div className="w-full grid grid-cols-7 gap-1.5 text-center text-xs">
            {/* Weekdays */}
            {daysOfWeek.map((day, idx) => (
              <span key={idx} className="font-bold text-gray-400 py-1 font-sans select-none">
                {day}
              </span>
            ))}

            {/* Empty cells */}
            {Array.from({ length: emptyCells }).map((_, idx) => (
              <span key={`empty-${idx}`} className="py-2" />
            ))}

            {/* Practical active days */}
            {Array.from({ length: totalDays }).map((_, idx) => {
              const dayNum = idx + 1;
              const isSelected = isCurrentSelected(dayNum);

              return (
                <motion.button
                  key={`day-${dayNum}`}
                  id={`calendar-day-${activeMonth}-${dayNum}`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDayClick(dayNum)}
                  className={`py-2 rounded-xl text-center relative font-medium transition-all duration-300 select-none cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-brand-pink to-brand-crimson text-white font-bold shadow-[0_3px_10px_rgba(255,105,180,0.5)] scale-105 z-10'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-brand-crimson border border-transparent hover:border-brand-blush/40'
                  }`}
                >
                  {dayNum}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 text-[8px] animate-bounce select-none">
                      ❤️
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Time Period picker */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-brand-crimson uppercase tracking-wider flex items-center gap-1 font-sans">
            <Clock size={12} /> Time of Day
          </label>

          <div className="grid grid-cols-2 gap-2.5">
            {timeOptions.map((time) => {
              const isActive = selectedTime === time;

              return (
                <motion.button
                  key={time}
                  id={`time-option-${time.split(' ')[0].toLowerCase()}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTimeClick(time)}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between h-20 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-brand-pink bg-pink-50/70 text-brand-deep rounded-xl shadow-[0_0_12px_rgba(255,105,180,0.4)] ring-1 ring-brand-pink scale-[1.02]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-brand-blush/70 hover:bg-pink-50/20'
                  }`}
                >
                  <span className="text-sm font-semibold block">{time.split(' ')[0]}</span>
                  <span className="text-xl leading-none">{time.substring(time.indexOf(' ') + 1)}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Quick Recap Badge for Date + Time chosen */}
          <div className="mt-2 min-h-12 bg-rose-50/50 border border-brand-blush/30 rounded-xl p-2 px-3 text-center flex items-center justify-center">
            {selectedDate || selectedTime ? (
              <p className="text-xs font-medium text-brand-crimson">
                {selectedDate ? (
                  <span>📅 {getReadableDate()}</span>
                ) : (
                  <span>Select a date...</span>
                )}
                {selectedTime && (
                  <span> at {selectedTime.split(' ')[0]} {selectedTime.substring(selectedTime.indexOf(' ') + 1)}</span>
                )}
              </p>
            ) : (
              <p className="text-xs text-gray-400 italic">Please select date and time above</p>
            )}
          </div>
        </div>
      </div>

      {/* Slide-in Next Button once both are set */}
      <div className="w-full mt-6 flex justify-center">
        <AnimatePresence>
          {selectedDate && selectedTime && (
            <motion.button
              id="datetime-next-btn"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(255, 105, 180, 0.6)' }}
              whileTap={{ scale: 0.96 }}
              onClick={onNext}
              className="px-10 py-3.5 bg-gradient-to-r from-brand-pink to-brand-crimson text-white font-bold text-md rounded-full shadow-md cursor-pointer flex items-center gap-1"
            >
              Next 💖
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
