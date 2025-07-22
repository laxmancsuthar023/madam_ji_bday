// ===== CUSTOM HOOKS =====

import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseAudioReturn, UseTypingAnimationReturn } from '@/types';

// ===== Audio Hook =====
export const useAudio = (src: string, autoplay: boolean = false): UseAudioReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    if (autoplay) {
      // Handle autoplay restrictions
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('Autoplay prevented:', error);
        }
      };
      playAudio();
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [src, autoplay]);

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, [isMuted]);

  return {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    play,
    pause,
  };
};

// ===== Typing Animation Hook =====

export const useTypingAnimation = (
  fullText: string,
  speed: number = 50,
  startDelay: number = 0
): UseTypingAnimationReturn => {
  const [text, setText] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef<number>(0);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    // Reset state
    setText('');
    indexRef.current = 0;

    delayTimeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setText((prev) => {
          const nextChar = fullText.charAt(indexRef.current);
          indexRef.current++;

          if (indexRef.current >= fullText.length) {
            clearInterval(intervalRef.current!);
          }

          return prev + nextChar;
        });
      }, speed);
    }, startDelay);
  }, [fullText, speed, startDelay]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      stop(); // Cleanup on unmount
    };
  }, [stop]);

  return {
    text,
    start,
    stop,
  };
};

// ===== Confetti Hook =====
export const useConfetti = () => {
  const triggerConfetti = useCallback((options?: any) => {
    // Using canvas-confetti library
    if (typeof window !== 'undefined' && (window as any).confetti) {
      (window as any).confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD1DC', '#FFE5B4', '#FFE066'],
        ...options,
      });
    }
  }, []);

  const triggerFireworks = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#FFD1DC', '#FFE5B4', '#FFE066', '#FF91A4']
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      if (typeof window !== 'undefined' && (window as any).confetti) {
        (window as any).confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        (window as any).confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }
    }, 250);
  }, []);

  return {
    triggerConfetti,
    triggerFireworks,
  };
};

// ===== Window Size Hook =====
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// ===== Local Storage Hook =====
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};