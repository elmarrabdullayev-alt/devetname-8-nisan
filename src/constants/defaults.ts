import { EngagementInvitationProps } from '../types';
import { MEDIA_CONFIG } from '../media';

export const DEFAULT_ENGAGEMENT_PROPS: EngagementInvitationProps = {
  groomName: 'Elnur',
  brideName: 'Nərmin',
  eventDate: '24 Oktyabr 2026',
  startTime: '18:00',
  invitationText:
    'Həyatımızın ən gözəl və unudulmaz addımında, sevgimizi və sədaqətimizi rəsmiləşdirdiyimiz bu özəl nişan mərasimimizdə siz əzizlərimizi aramızda görməkdən sonsuz şərəf və fərəh duyarıq.',
  familyNames: 'Abdullayevlər və Qasımovlar ailəsi',
  venueName: 'Buta Palace (Böyük Saray Zalı)',
  venueAddress: 'Bakı şəhəri, Suraxanı qəsəbəsi, Aeroport şosesi',
  mapUrl: 'https://maps.google.com/?q=Buta+Palace+Baku',
  dressCode: 'Black Tie & Elegant Cocktail (Bordo və Qızılı çalarlar)',
  rsvpMode: 'Tək və ya Müşayiətçi ilə',
  guestName: 'Hörmətli Qonağımız',
  coverUrl: MEDIA_CONFIG.cover,
  introVideoUrl: MEDIA_CONFIG.introVideo,
  backgroundVideoUrl: MEDIA_CONFIG.backgroundMotion,
};
