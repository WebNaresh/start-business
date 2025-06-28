"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ReadingProgressProps {
  target?: string; // CSS selector for the content container
  className?: string;
}

export default function ReadingProgress({
  target = "article",
  className = "",
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const targetElement = document.querySelector(target);
      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const documentHeight = targetElement.scrollHeight;

      // Calculate how much of the article has been scrolled through
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = (targetElement as HTMLElement).offsetTop;
      const elementHeight = (targetElement as HTMLElement).offsetHeight;

      // Start progress when article comes into view
      const startProgress = elementTop - windowHeight;
      const endProgress = elementTop + elementHeight - windowHeight;

      if (scrollTop < startProgress) {
        setProgress(0);
        setIsVisible(false);
      } else if (scrollTop > endProgress) {
        setProgress(100);
        setIsVisible(true);
      } else {
        const currentProgress =
          ((scrollTop - startProgress) / (endProgress - startProgress)) * 100;
        setProgress(Math.min(Math.max(currentProgress, 0), 100));
        setIsVisible(true);
      }

      // Show scroll to top button when user has scrolled down significantly
      setShowScrollTop(scrollTop > windowHeight);
    };

    const throttledUpdateProgress = throttle(updateProgress, 16); // ~60fps

    window.addEventListener("scroll", throttledUpdateProgress);
    window.addEventListener("resize", throttledUpdateProgress);

    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener("scroll", throttledUpdateProgress);
      window.removeEventListener("resize", throttledUpdateProgress);
    };
  }, [target]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getReadingTime = () => {
    const targetElement = document.querySelector(target);
    if (!targetElement) return "5 min";

    const text = targetElement.textContent || "";
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);

    return `${readingTime} min`;
  };

  const getEstimatedTimeLeft = () => {
    const totalTime = parseInt(getReadingTime());
    const timeLeft = Math.ceil((totalTime * (100 - progress)) / 100);
    return timeLeft > 0 ? `${timeLeft} min left` : "Almost done!";
  };

  return (
    <>
      {/* Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
        <div className="h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Reading Progress Indicator */}
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-4 min-w-[200px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                Reading Progress
              </span>
              <span className="text-sm text-blue-600 font-semibold">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress Circle */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <svg
                  className="w-12 h-12 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${progress}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-xs text-gray-600">
                  {getEstimatedTimeLeft()}
                </p>
                <p className="text-xs text-gray-500">
                  Total: {getReadingTime()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Mobile Progress Indicator */}
      {isVisible && (
        <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden max-w-sm mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 truncate">
                Reading Progress
              </span>
              <span className="text-sm text-blue-600 font-semibold ml-2">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1 truncate">
              {getEstimatedTimeLeft()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Throttle function to limit how often the scroll handler runs
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
