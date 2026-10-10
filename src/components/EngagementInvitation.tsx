import React, { useState } from 'react';
import { EngagementInvitationProps } from '../types';
import { MEDIA_CONFIG } from '../media';
import { IntroScreen } from './IntroScreen';
import { MainInvitation } from './MainInvitation';

export const EngagementInvitation: React.FC<EngagementInvitationProps> = (props) => {
  const [introVisible, setIntroVisible] = useState<boolean>(true);

  const coverUrl = props.coverUrl || MEDIA_CONFIG.cover;
  const introVideoUrl = props.introVideoUrl || MEDIA_CONFIG.introVideo;

  return (
    <div className="relative min-h-screen w-full bg-[#14030a] text-[#fcf9f4] font-sans antialiased overflow-x-hidden selection:bg-[#d8c29d]/30">
      {/* 
        MainInvitation is mounted underneath so background-motion.webm is immediately 
        preheated and running smoothly without any sudden darkness or harsh cut
      */}
      <MainInvitation
        props={props}
        onReplayIntro={() => setIntroVisible(true)}
      />

      {/* IntroScreen sits seamlessly on top and cross-fades out on completion */}
      {introVisible && (
        <IntroScreen
          coverUrl={coverUrl}
          introVideoUrl={introVideoUrl}
          isVisible={introVisible}
          onComplete={() => setIntroVisible(false)}
        />
      )}
    </div>
  );
};

export default EngagementInvitation;
