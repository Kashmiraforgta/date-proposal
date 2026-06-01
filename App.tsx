/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import StepLayout from './components/StepLayout';
import Step1Ask from './components/Step1Ask';
import Step2DateTime from './components/Step2DateTime';
import Step3Venue from './components/Step3Venue';
import Step4Activities from './components/Step4Activities';
import Step5FoodMenu from './components/Step5FoodMenu';
import Step6Reveal from './components/Step6Reveal';
import { DateProposalState, VenueType, TimeOfDayType } from './types';

const INITIAL_STATE: DateProposalState = {
  currentStep: 1,
  selectedDate: null,
  selectedTime: null,
  selectedVenue: null,
  selectedActivities: [],
  selectedFood: null,
  postFoodActivities: [],
};

export default function App() {
  const [state, setState] = useState<DateProposalState>(INITIAL_STATE);

  const resetState = () => {
    setState(INITIAL_STATE);
  };

  const handleStepTransition = (nextStep: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: nextStep,
    }));
  };

  const handleDateTimeSelect = (date: string, time: TimeOfDayType) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date === '' ? prev.selectedDate : date,
      selectedTime: time,
    }));
  };

  const handleVenueSelect = (venue: VenueType) => {
    setState((prev) => {
      // If switching venue types, clear downstream sub-selection data to prevent spillover
      const needsClear = prev.selectedVenue !== venue;
      return {
        ...prev,
        selectedVenue: venue,
        selectedActivities: needsClear ? [] : prev.selectedActivities,
        selectedFood: needsClear ? null : prev.selectedFood,
        postFoodActivities: needsClear ? [] : prev.postFoodActivities,
      };
    });
  };

  const handleToggleActivity = (activity: string) => {
    setState((prev) => {
      const isSelected = prev.selectedActivities.includes(activity);
      const updated = isSelected
        ? prev.selectedActivities.filter((act) => act !== activity)
        : [...prev.selectedActivities, activity];
      return {
        ...prev,
        selectedActivities: updated,
      };
    });
  };

  const handleSelectFood = (food: '🥞 Dosa' | '☕ Cafe' | '🍷 Gourmet Restaurant') => {
    setState((prev) => ({
      ...prev,
      selectedFood: food,
    }));
  };

  const handleTogglePostFoodActivity = (activity: string) => {
    setState((prev) => {
      const isSelected = prev.postFoodActivities.includes(activity);
      const updated = isSelected
        ? prev.postFoodActivities.filter((act) => act !== activity)
        : [...prev.postFoodActivities, activity];
      return {
        ...prev,
        postFoodActivities: updated,
      };
    });
  };

  const handleVenueNext = () => {
    if (state.selectedVenue === 'FOOD_DATE') {
      // If FOOD DATE skip Step 4 (Activities) and jump straight to Step 5 (Eat Menu)
      handleStepTransition(5);
    } else {
      handleStepTransition(4);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-brand-blush selection:text-brand-crimson">
      {/* 20% overlay blush gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/25 via-pink-100/10 to-transparent pointer-events-none z-0" />

      {/* Persistent floating ambient background hearts */}
      <FloatingHearts />

      {/* Step Layout core frame */}
      <StepLayout currentStep={state.currentStep}>
        {state.currentStep === 1 && (
          <Step1Ask onYes={() => handleStepTransition(2)} />
        )}

        {state.currentStep === 2 && (
          <Step2DateTime
            selectedDate={state.selectedDate}
            selectedTime={state.selectedTime}
            onSelect={handleDateTimeSelect}
            onNext={() => handleStepTransition(3)}
          />
        )}

        {state.currentStep === 3 && (
          <Step3Venue
            selectedVenue={state.selectedVenue}
            onSelect={handleVenueSelect}
            onNext={handleVenueNext}
          />
        )}

        {state.currentStep === 4 && (
          <Step4Activities
            selectedVenue={state.selectedVenue}
            selectedActivities={state.selectedActivities}
            onToggleActivity={handleToggleActivity}
            onNext={() => handleStepTransition(6)}
          />
        )}

        {state.currentStep === 5 && (
          <Step5FoodMenu
            selectedFood={state.selectedFood}
            postFoodActivities={state.postFoodActivities}
            onSelectFood={handleSelectFood}
            onTogglePostFoodActivity={handleTogglePostFoodActivity}
            onNext={() => handleStepTransition(6)}
          />
        )}

        {state.currentStep === 6 && (
          <Step6Reveal state={state} onReset={resetState} />
        )}
      </StepLayout>
    </div>
  );
}
