import React from 'react';
import { BASE_PATH } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative rounded-xl overflow-hidden shadow-md">
          <img
            src={`${BASE_PATH}assets/challenge_banner.png`}
            alt="GENEA Gesture-Generation Challenge banner"
            className="w-full object-cover"
          />
          <div
            className="absolute top-0 left-0 right-0 flex flex-col justify-between px-4 pt-4 pb-2 sm:px-6 sm:pt-10 sm:pb-4 space-y-1 sm:space-y-4 md:space-y-5"
            style={{ height: '100%', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-snug sm:leading-relaxed">
              The 4th GENEA
            </h1>
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-snug sm:leading-relaxed">
              Gesture-Generation
            </h1>
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-snug sm:leading-relaxed">
              Challenge
            </h1>
            <p className="w-fit text-xs sm:text-sm md:text-base font-semibold text-white bg-red-600/90 px-3 py-1 rounded-full leading-tight sm:leading-normal">
              Submission deadline: June 28th
            </p>
            <div>
              <hr className="mb-2 sm:mb-3 border-white/40 w-24 sm:w-48" />
              <p className="text-xs sm:text-sm md:text-xl lg:text-2xl font-semibold text-white/90 leading-normal sm:leading-relaxed">
                Interactive Social Agents Workshop
              </p>
              <p className="text-xs sm:text-sm md:text-xl lg:text-2xl font-semibold text-white/90 leading-normal sm:leading-relaxed">
                September 8-9, 2026
              </p>
              <p className="text-xs sm:text-sm md:text-xl lg:text-2xl font-semibold text-white/90 leading-normal sm:leading-relaxed">
                ECCV 2026 in Malmö, Sweden
              </p>
            </div>
            <div>
              <a
                href="https://forms.gle/MhorH9X3PmLsbQ5e8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 sm:px-8 sm:py-3 bg-white text-brand-primary font-bold text-sm sm:text-lg rounded-full shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-200"
              >
                Register now to receive updates!
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;