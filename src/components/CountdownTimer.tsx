import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDateStr?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateStr = '2026-10-24T18:00:00' }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const units = [
    { label: 'GÜN', value: timeLeft.days },
    { label: 'SAAT', value: timeLeft.hours },
    { label: 'DƏQİQƏ', value: timeLeft.minutes },
    { label: 'SANİYƏ', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {units.map((unit, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl gold-glass border border-[#d4af37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient tracking-tight tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.18em] text-[#d6c4a5] font-light mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
