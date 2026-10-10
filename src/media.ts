/**
 * Real media assets for Engagement Invitation
 * 1. engagement-cover.webp — açılış videosu yüklənənədək poster/fallback şəkli
 * 2. intro-opening.webm — ilk açılış animasiyası
 * 3. background-motion.webm — bütün əsas məzmun hissələrində sabit arxa fon videosu
 */
export const MEDIA_CONFIG = {
  cover: '/engagement-cover.webp',
  introVideo: '/intro-opening.webm',
  backgroundMotion: '/background-motion.webm',
} as const;

export type MediaConfig = typeof MEDIA_CONFIG;
