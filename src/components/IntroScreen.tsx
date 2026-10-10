import React, { useState, useRef, useEffect } from 'react';
import { MEDIA_CONFIG } from '../media';

interface IntroScreenProps {
  coverUrl?: string;
  introVideoUrl?: string;
  isVisible: boolean;
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  coverUrl = MEDIA_CONFIG.cover,
  introVideoUrl = MEDIA_CONFIG.introVideo,
  isVisible,
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);

  // Preload video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [introVideoUrl]);

  // Reset state if made visible again
  useEffect(() => {
    if (isVisible) {
      setIsPlaying(false);
      setIsExiting(false);
    }
  }, [isVisible]);

  const handleStart = async () => {
    if (isExiting) return;

    if (videoRef.current && !hasVideoError) {
      try {
        setIsPlaying(true);
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch (err) {
        console.warn('Playback error fallback to poster:', err);
        triggerExit();
      }
    } else {
      triggerExit();
    }
  };

  const triggerExit = () => {
    setIsExiting(true);
    // Smooth cross-dissolve to avoid sudden darkness or harsh cut
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handleVideoEnded = () => {
    triggerExit();
  };

  const handleVideoError = () => {
    setHasVideoError(true);
  };

  if (!isVisible && !isExiting) return null;

  return (
    <div
      onClick={handleStart}
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden cursor-pointer select-none transition-opacity duration-1000 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 
        Rule 1 & 5: İlk ekran engagement-cover.webp posteri ilə açılsın.
        Video yüklənməsə və ya xəta versə, poster ekranda qalsın.
      */}
      <img
        src={coverUrl}
        alt="Nişan dəvətnaməsi posteri"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isPlaying && !hasVideoError ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Intro Opening Video: intro-opening.webm */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          src={introVideoUrl}
          poster={coverUrl}
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Very soft feather gradient at top and bottom - no hard edges */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[rgba(24,5,8,0.3)] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[rgba(24,5,8,0.4)] via-[rgba(24,5,8,0.15)] to-transparent pointer-events-none" />

      {/* Empty Top Area */}
      <div className="relative z-10 p-6" />

      {/* Bottom Hint - Unobtrusive, delicate touch prompt */}
      <div
        className={`relative z-10 px-6 pb-12 pt-4 flex flex-col items-center justify-end text-center transition-all duration-700 ${
          isPlaying ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2.5">
          {/* Subtle touch indicator circle */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[#d8c29d]/40 bg-[#240815]/50 backdrop-blur-md shadow-[0_0_15px_rgba(216,194,157,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#fdfbf7] animate-ping" />
            <span className="absolute w-2 h-2 rounded-full bg-[#d8c29d]" />
          </div>

          {/* Prompt text: “Dəvətnaməni açmaq üçün toxunun” */}
          <p className="font-serif-luxury italic text-sm sm:text-base tracking-[0.2em] text-[#faf3e8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Dəvətnaməni açmaq üçün toxunun
          </p>

          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent via-[#d8c29d]/40 to-transparent" />
        </div>
      </div>
    </div>
  );
};
