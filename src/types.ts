export type EngagementInvitationProps = {
  groomName: string;
  brideName: string;
  eventDate: string;
  startTime: string;
  invitationText: string;
  familyNames?: string;
  venueName: string;
  venueAddress?: string;
  mapUrl?: string;
  dressCode?: string;
  rsvpMode?: string;
  guestName?: string;
  // Optional callbacks or media overrides for integration
  coverUrl?: string;
  introVideoUrl?: string;
  backgroundVideoUrl?: string;
  onRsvpSubmit?: (submission: {
    guestName: string;
    attendance: 'attending' | 'declined';
    attendeeCount: number;
    wishes?: string;
  }) => void;
};
