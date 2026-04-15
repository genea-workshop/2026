import React, { useState } from 'react';

const EvaluationCriteria: React.FC = () => {
  const [isMotionRealismOpen, setIsMotionRealismOpen] = useState(false);
  const [isSpeechGestureAlignmentOpen, setIsSpeechGestureAlignmentOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Motion Realism Card */}
      <div className="bg-brand-surface p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-brand-text mb-4">Motion Realism</h3>
        <p className="text-brand-text-muted leading-relaxed">
          How realistic the hand- and body movements appear, without taking the character's speech into account.
        </p>

        <div className="border-t border-gray-200/80 mt-4 pt-4">
          <button
            onClick={() => setIsMotionRealismOpen(!isMotionRealismOpen)}
            className="flex justify-between items-center w-full text-left font-semibold text-brand-primary hover:text-blue-700 focus:outline-none"
            aria-expanded={isMotionRealismOpen}
            aria-controls="motion-realism-details"
          >
            <span>Learn More</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 transform ${
                isMotionRealismOpen ? 'rotate-180' : 'rotate-0'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <div
          id="motion-realism-details"
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isMotionRealismOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="space-y-4">
            <p className="text-brand-text-muted leading-relaxed">
              This is measured with{' '}
              <span className="font-semibold bg-blue-100 text-brand-primary px-2 py-0.5 rounded-md">
                Elo ratings
              </span>
              , which describe how often a model is preferred over others in pairwise comparisons.
            </p>
            <div>
              <h4 className="font-semibold text-brand-text text-sm uppercase tracking-wider">Example</h4>
              <p className="text-brand-text-muted leading-relaxed text-sm mt-1">
                An Elo difference of 200 means a model is preferred 76% of the time (on average, ignoring ties).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Speech-Gesture Alignment Card */}
      <div className="bg-brand-surface p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-brand-text mb-4">Speech-Gesture Alignment</h3>
        <p className="text-brand-text-muted leading-relaxed">
          How well the movements fit the speech, ignoring overall visual quality.
        </p>
        
        <div className="border-t border-gray-200/80 mt-4 pt-4">
          <button
            onClick={() => setIsSpeechGestureAlignmentOpen(!isSpeechGestureAlignmentOpen)}
            className="flex justify-between items-center w-full text-left font-semibold text-brand-primary hover:text-blue-700 focus:outline-none"
            aria-expanded={isSpeechGestureAlignmentOpen}
            aria-controls="speech-gesture-alignment-details"
          >
            <span>Learn More</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 transform ${
                isSpeechGestureAlignmentOpen ? 'rotate-180' : 'rotate-0'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <div
          id="speech-gesture-alignment-details"
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isSpeechGestureAlignmentOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="space-y-4">
            <p className="text-brand-text-muted leading-relaxed">
              This is measured with{' '}
              <span className="font-semibold bg-indigo-100 text-brand-secondary px-2 py-0.5 rounded-md">
                mismatching scores
              </span>
              , which describe how often evaluators can identify the correct speech for the character's movements, over a random alternative speech sample from the same speaker.
            </p>
            <div>
              <h4 className="font-semibold text-brand-text text-sm uppercase tracking-wider">Example</h4>
              <p className="text-brand-text-muted leading-relaxed text-sm mt-1">
              A score of 50% means the random speech sample is picked equally often as the correct speech.
              A score of 100% means the correct speech is always identified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationCriteria;