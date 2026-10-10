import React, { useState } from 'react';
import { Check, Heart, Send, Sparkles } from 'lucide-react';

interface RSVPFormProps {
  guestName?: string;
  rsvpMode?: string;
  onRsvpSubmit?: (submission: {
    guestName: string;
    attendance: 'attending' | 'declined';
    attendeeCount: number;
    wishes?: string;
  }) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({
  guestName: initialGuestName = '',
  rsvpMode = 'Tək və ya Müşayiətçi ilə',
  onRsvpSubmit,
}) => {
  const [guestName, setGuestName] = useState<string>(
    initialGuestName && initialGuestName !== 'Hörmətli Qonağımız' ? initialGuestName : ''
  );
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [attendeeCount, setAttendeeCount] = useState<number>(1);
  const [wishes, setWishes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Zəhmət olmasa, ad və soyadınızı qeyd edin.');
      return;
    }

    setErrorMsg('');
    const submission = {
      guestName: guestName.trim(),
      attendance,
      attendeeCount: attendance === 'attending' ? attendeeCount : 0,
      wishes: wishes.trim(),
    };

    if (onRsvpSubmit) {
      onRsvpSubmit(submission);
    }

    setIsSubmitted(true);
  };

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="p-8 sm:p-10 rounded-3xl ethereal-veil text-center border border-[#d8c29d]/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)] animate-in fade-in duration-500">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#d8c29d]/15 border border-[#d8c29d]/40 flex items-center justify-center text-[#f7ecd9]">
            {attendance === 'attending' ? <Sparkles className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
          </div>
          <h4 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-champagne-silk mb-2">
            Təşəkkür edirik
          </h4>
          <p className="text-sm sm:text-base text-[#ecdcd2] leading-relaxed mb-6 font-light">
            {attendance === 'attending'
              ? `Hörmətli ${guestName}, cavabınız qeydə alındı. Sizi bu unudulmaz gecədə aramızda görməyi səbirsizliklə gözləyirik!`
              : `Hörmətli ${guestName}, bildirişiniz qeydə alındı. Xoş arzularınız və diqqətiniz üçün minnətdarıq.`}
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs text-[#d8c29d] underline underline-offset-4 hover:text-[#fff] transition-colors cursor-pointer"
          >
            Məlumatları yenidən redaktə et
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-9 rounded-3xl ethereal-veil border border-[#d8c29d]/25 shadow-[0_15px_45px_rgba(0,0,0,0.35)] space-y-6"
        >
          <div className="text-center space-y-1.5 mb-2">
            <h4 className="font-cinzel text-base sm:text-lg tracking-[0.2em] text-champagne-gold uppercase">
              İştirak Təsdiqi
            </h4>
            <p className="text-xs text-[#d8c29d]/80 tracking-wide">
              {rsvpMode}
            </p>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-[#2e0917]/70 border border-rose-400/30 text-rose-200 text-xs text-center">
              {errorMsg}
            </div>
          )}

          {/* Attendance Choice */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setAttendance('attending')}
              className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer ${
                attendance === 'attending'
                  ? 'bg-[#fdfbf7]/15 border-[#d8c29d] text-[#fff] shadow-[0_0_20px_rgba(216,194,157,0.2)]'
                  : 'bg-black/25 border-white/10 text-[#bfb19f] hover:border-white/20'
              }`}
            >
              <Check className={`w-4 h-4 ${attendance === 'attending' ? 'text-[#ecd8bd]' : 'opacity-40'}`} />
              <span>İştirak edəcəyəm</span>
            </button>

            <button
              type="button"
              onClick={() => setAttendance('declined')}
              className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer ${
                attendance === 'declined'
                  ? 'bg-[#2b0817]/60 border-rose-400/40 text-[#fff] shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                  : 'bg-black/25 border-white/10 text-[#bfb19f] hover:border-white/20'
              }`}
            >
              <span>Gələ bilmirəm</span>
            </button>
          </div>

          {/* Guest Name Input */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-[#ecd6ce] tracking-wider uppercase">
              Ad və Soyadınız
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Məs: Cəmil Əliyev"
              className="w-full px-4 py-3 rounded-xl bg-black/35 border border-[#d8c29d]/25 text-[#fdfbf7] placeholder-white/30 text-sm focus:outline-none focus:border-[#d8c29d] focus:ring-1 focus:ring-[#d8c29d]/50 transition-all"
            />
          </div>

          {/* Number of Attendees (if attending) */}
          {attendance === 'attending' && (
            <div className="space-y-1.5 text-left animate-in fade-in duration-300">
              <label className="block text-xs font-medium text-[#ecd6ce] tracking-wider uppercase">
                Qonaq sayı (Sizinlə bərabər)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAttendeeCount(num)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                      attendeeCount === num
                        ? 'bg-[#d8c29d]/30 text-[#fff] border-[#d8c29d] shadow-sm'
                        : 'bg-black/25 border-white/10 text-[#cbb8a0] hover:border-white/20'
                    }`}
                  >
                    {num === 4 ? '4+ nəfər' : `${num} nəfər`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wishes / Congratulatory Note */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-[#ecd6ce] tracking-wider uppercase">
              Təbrik və arzularınız (İstəyə görə)
            </label>
            <textarea
              rows={2}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder="Xoş arzularınız..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/35 border border-[#d8c29d]/25 text-[#fdfbf7] placeholder-white/30 text-sm focus:outline-none focus:border-[#d8c29d] focus:ring-1 focus:ring-[#d8c29d]/50 transition-all resize-none"
            />
          </div>

          {/* Submit Button - Refined Champagne Silk, NOT bright yellow */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d8c29d] via-[#f2e6d3] to-[#c5a67c] text-[#1e0713] font-cinzel text-xs sm:text-sm font-bold tracking-[0.18em] uppercase hover:brightness-105 active:scale-[0.99] transition-all shadow-[0_4px_25px_rgba(216,194,157,0.22)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Təsdiq Göndər</span>
          </button>
        </form>
      )}
    </div>
  );
};
