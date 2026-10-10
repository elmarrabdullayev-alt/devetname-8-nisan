import React, { useState, useEffect, useRef } from 'react';
import { EngagementInvitationProps } from '../types';
import { MEDIA_CONFIG } from '../media';
import { RSVPForm } from './RSVPForm';
import {
  MapPin,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

interface MainInvitationProps {
  props: EngagementInvitationProps;
  onReplayIntro: () => void;
}

export const MainInvitation: React.FC<MainInvitationProps> = ({
  props,
  onReplayIntro,
}) => {
  const {
    groomName,
    brideName,
    eventDate,
    startTime,
    invitationText,
    familyNames,
    venueName,
    venueAddress,
    mapUrl,
    dressCode,
    rsvpMode,
    guestName,
    coverUrl = MEDIA_CONFIG.cover,
    backgroundVideoUrl = MEDIA_CONFIG.backgroundMotion,
    onRsvpSubmit,
  } = props;

  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [backgroundVideoError, setBackgroundVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Address copy action
  const handleCopyAddress = () => {
    if (!venueAddress) return;
    navigator.clipboard.writeText(`${venueName}, ${venueAddress}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Background motion auto-play handled:', err);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#fcf9f4]">
      {/* =========================================================================
          1. FIXED BACKGROUND VIDEO & POSTER PROTECTION
          - background-motion.webm sabit arxa fon kimi qalır; yalnız məzmun scroll olunur
          - Video xətası olarsa, engagement-cover.webp posteri ekranda qalır (qara ekran yoxdur)
      ========================================================================= */}
      
      {/* Poster Fallback Layer (always rendered fixed underneath) */}
      <img
        src={coverUrl}
        alt="Arxa fon posteri"
        referrerPolicy="no-referrer"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />

      {/* Fixed Continuous Motion Video Layer */}
      {!backgroundVideoError && (
        <video
          ref={videoRef}
          src={backgroundVideoUrl}
          poster={coverUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setBackgroundVideoError(true)}
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none transition-opacity duration-1000"
        />
      )}

      {/* 
        Refined Ambient Scrim:
        Təbii ivory, şampan-qızılı, yumşaq blush və yüngül tünd bordo tonları ilə 
        videonun çiçək və şam koridorunun parlaqlığını boğmadan mətn oxunaqlığını təmin edir
      */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#14030a]/65 via-[#18040d]/45 to-[#120208]/75 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-radial from-transparent via-black/25 to-black/60 pointer-events-none" />

      {/* 
        120px Soft Ivory, Blush & Champagne-Gold Gradient Transition Veil:
        Giriş səhnəsi ilə əsas məzmun arasında 120px yumşaq keçid
      */}
      <div className="fixed top-0 inset-x-0 transition-veil-120 z-[1] pointer-events-none" />

      {/* Top Floating Replay Bar */}
      <div className="fixed top-0 inset-x-0 z-40 px-4 py-3 flex items-center justify-start pointer-events-auto">
        <button
          onClick={onReplayIntro}
          title="Açılış videosuna yenidən bax"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ethereal-subtle text-[#ecdcd2] hover:text-[#fff] text-xs font-serif-luxury tracking-wider border border-[#d8c29d]/25 hover:border-[#d8c29d]/50 active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#d8c29d]" />
          <span>Girişə bax</span>
        </button>
      </div>

      {/* =========================================================================
          2. SCROLLABLE INVITATION CONTENT
          Hər bölmə üçün rahat şaquli boşluq (spacious vertical rhythm)
      ========================================================================= */}
      <main className="relative z-10 flex flex-col items-center justify-start min-h-screen px-5 max-w-xl mx-auto">
        
        {/* =====================================================================
            BÖLMƏ 1: İLK MƏZMUN HİSSƏSİ (HERO & DƏVƏT MƏTNİ)
            Yalnız kiçik “Nişan dəvətnaməsi” başlığı, adlar, tarix, saat və qısa dəvət mətni
        ===================================================================== */}
        <section className="min-h-[92vh] w-full flex flex-col justify-between items-center text-center pt-20 pb-12 sm:pt-24 sm:pb-16 animate-in fade-in duration-1000">
          
          {/* Top Delicate Monogram / Knot */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#d8c29d]/30 ethereal-subtle shadow-[0_0_25px_rgba(216,194,157,0.15)]">
              <span className="font-cinzel text-lg sm:text-xl font-bold text-champagne-silk tracking-widest pl-0.5">
                {groomName.charAt(0)} & {brideName.charAt(0)}
              </span>
            </div>

            {/* Kiçik “Nişan dəvətnaməsi” başlığı */}
            <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#ecd6ce] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Nişan Dəvətnaməsi
            </span>
          </div>

          {/* Center: Adlar, Tarix, Saat və Qısa Dəvət Mətni */}
          <div className="space-y-6 max-w-md mx-auto my-auto py-6">
            
            {/* Dynamic Personalized Guest Greeting (if passed) */}
            {guestName && (
              <div className="inline-block px-4 py-1.5 rounded-full ethereal-subtle text-xs sm:text-sm font-serif-luxury italic text-[#f7ecd9] tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                {guestName}
              </div>
            )}

            {/* Adlar - Böyük, aydın və rahat oxunaqlı */}
            <div className="space-y-1">
              <h1 className="font-serif-luxury text-5xl sm:text-7xl font-normal tracking-wide text-champagne-silk leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                {groomName}
              </h1>
              <div className="font-serif-luxury italic text-2xl sm:text-3xl text-[#d8c29d]/80 my-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                &
              </div>
              <h1 className="font-serif-luxury text-5xl sm:text-7xl font-normal tracking-wide text-champagne-silk leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                {brideName}
              </h1>
            </div>

            {/* Tarix və Saat */}
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base text-[#fdfbf7] font-cinzel tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              <span>{eventDate}</span>
              <span className="text-[#d8c29d]">·</span>
              <span>Saat {startTime}</span>
            </div>

            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d8c29d]/40 to-transparent mx-auto" />

            {/* Qısa Dəvət Mətni */}
            <p className="font-serif-luxury text-lg sm:text-xl text-[#f7efe5] leading-relaxed italic font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-3">
              “{invitationText}”
            </p>

            {/* Ailələrin Adları (əgər varsa) */}
            {familyNames && (
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-[#d8c29d]">
                  Hörmətlə
                </span>
                <p className="font-serif-luxury text-base sm:text-lg text-[#fdfbf7] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {familyNames}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="flex flex-col items-center gap-1.5 text-[#ecd6ce]/80 pt-4 animate-delicate-float">
            <span className="text-[10px] font-cinzel tracking-[0.2em] uppercase">Aşağı sürüşdürün</span>
            <ChevronDown className="w-4 h-4 text-[#d8c29d]" />
          </div>
        </section>


        {/* =====================================================================
            BÖLMƏ 2: MƏKAN VƏ ÜNVAN (AYRI SCROLL BÖLMƏSİ)
            Böyük, sərt qara blok yoxdur; rahat şaquli boşluq və zərif düymələr
        ===================================================================== */}
        <section className="min-h-[70vh] w-full flex flex-col justify-center items-center text-center py-24 sm:py-32">
          <div className="w-full max-w-md mx-auto space-y-6">
            
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[#d8c29d]" />
              <span className="font-cinzel text-xs tracking-[0.25em] text-[#d8c29d] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                Məkan və Ünvan
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#fdfbf7] drop-shadow-[0_3px_15px_rgba(0,0,0,0.9)]">
                {venueName}
              </h2>
              {venueAddress && (
                <p className="text-sm sm:text-base text-[#e8dbcc] max-w-sm mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-light">
                  {venueAddress}
                </p>
              )}
            </div>

            {/* Action Buttons - Refined Champagne & Ivory, NO bright yellow */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3 rounded-full ethereal-veil text-[#fcf9f4] hover:text-white border border-[#d8c29d]/35 hover:border-[#d8c29d]/60 font-cinzel text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#d8c29d]" />
                  <span>Xəritədə Aç</span>
                </a>
              )}

              {venueAddress && (
                <button
                  onClick={handleCopyAddress}
                  className="w-full sm:w-auto px-6 py-3 rounded-full ethereal-subtle text-[#ecdcd2] hover:text-white border border-[#d8c29d]/20 hover:border-[#d8c29d]/40 text-xs font-medium flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ünvan Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#d8c29d]" />
                      <span>Ünvanı Kopyala</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>


        {/* =====================================================================
            BÖLMƏ 3: GEYİM QAYDASI (DRESS CODE - AYRI SCROLL BÖLMƏSİ)
        ===================================================================== */}
        {(dressCode || rsvpMode) && (
          <section className="min-h-[50vh] w-full flex flex-col justify-center items-center text-center py-20 sm:py-28">
            <div className="w-full max-w-md mx-auto space-y-4">
              {dressCode && (
                <>
                  <span className="font-cinzel text-xs tracking-[0.25em] text-[#d8c29d] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    Geyim Qaydası (Dress Code)
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-champagne-silk drop-shadow-[0_3px_15px_rgba(0,0,0,0.9)]">
                    {dressCode}
                  </h3>
                </>
              )}
              {dressCode && rsvpMode && (
                <div className="w-16 h-[1px] bg-[#d8c29d]/30 mx-auto my-2" />
              )}
              {rsvpMode && (
                <p className="text-xs sm:text-sm text-[#ecd6ce]/90 tracking-wide font-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  Mərasim Formatı: <span className="text-white font-medium">{rsvpMode}</span>
                </p>
              )}
            </div>
          </section>
        )}


        {/* =====================================================================
            BÖLMƏ 4: RSVP (İŞTİRAK TƏSDİQİ - AYRI SCROLL BÖLMƏSİ)
        ===================================================================== */}
        <section className="min-h-[85vh] w-full flex flex-col justify-center items-center py-24 sm:py-32">
          <div className="w-full max-w-md mx-auto">
            <RSVPForm
              guestName={guestName}
              rsvpMode={rsvpMode}
              onRsvpSubmit={onRsvpSubmit}
            />
          </div>
        </section>


        {/* =====================================================================
            BÖLMƏ 5: XATİRƏ VƏ BAĞLANIŞ
        ===================================================================== */}
        <footer className="w-full text-center space-y-4 py-16 sm:py-20">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d8c29d]/50 to-transparent mx-auto" />

          <p className="font-serif-luxury text-xl sm:text-2xl italic text-[#f7efe5] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            “Sizlərlə birgə bu sevinci bölüşməkdən məmnun olarıq.”
          </p>

          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#d8c29d]/80">
            {groomName} & {brideName}
          </p>
        </footer>
      </main>
    </div>
  );
};
