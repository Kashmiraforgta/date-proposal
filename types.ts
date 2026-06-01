/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VenueType = 'ROAMING' | 'HOME' | 'FOOD_DATE' | null;

export type TimeOfDayType = 'Morning ☀️' | 'Afternoon 🌤️' | 'Evening 🌇' | 'Night 🌙' | null;

export interface DateProposalState {
  currentStep: number;
  selectedDate: string | null; // e.g., "2026-06-15"
  selectedTime: TimeOfDayType;
  selectedVenue: VenueType;
  selectedActivities: string[]; // List of multi-selected activities
  selectedFood: '🥞 Dosa' | '☕ Cafe' | '🍷 Gourmet Restaurant' | null;
  postFoodActivities: string[]; // multi-selected after-food routines
}
