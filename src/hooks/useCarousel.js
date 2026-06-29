import { useState, useEffect, useCallback, useRef } from 'react';

export default function useCarousel(length, intervalTime = 5000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % length);
  }, [length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + length) % length);
  }, [length]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    resetTimeout();
    if (length > 0) {
      timeoutRef.current = setTimeout(nextSlide, intervalTime);
    }
    return () => {
      resetTimeout();
    };
  }, [activeIndex, length, intervalTime, nextSlide]);

  return {
    activeIndex,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
