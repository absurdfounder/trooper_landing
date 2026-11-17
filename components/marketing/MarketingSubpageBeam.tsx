import OpenBotBeam from '@/components/desktop-hero/OpenBotBeam';

/** Keep the home hero's light beam present on every marketing subpage hero. */
export default function MarketingSubpageBeam() {
  return (
    <OpenBotBeam
      surfaceSelector=".marketing-subpage-demo"
      sourceSelector="header.site-header-landing [data-landing-header-download]"
    />
  );
}
