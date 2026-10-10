import React, { useMemo } from 'react';
import { EngagementInvitation } from './components/EngagementInvitation';
import { DEFAULT_ENGAGEMENT_PROPS } from './constants/defaults';
import { EngagementInvitationProps } from './types';

export default function App() {
  // Support optional URL ?guest= parameter for testing personalized invitations
  const data: EngagementInvitationProps = useMemo(() => {
    let guestName = DEFAULT_ENGAGEMENT_PROPS.guestName;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get('guest');
      if (guestParam && guestParam.trim()) {
        guestName = guestParam.trim();
      }
    } catch {
      // Safe fallback
    }

    return {
      ...DEFAULT_ENGAGEMENT_PROPS,
      guestName,
    };
  }, []);

  return <EngagementInvitation {...data} />;
}
