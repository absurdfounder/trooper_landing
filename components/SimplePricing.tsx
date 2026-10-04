import SeatStage from '@/components/pricing/SeatStage';

type SimplePricingProps = {
  /** Link through to the full pricing page. Used on the homepage and marketing tails. */
  showFullPricingLink?: boolean;
};

export default function SimplePricing({ showFullPricingLink = true }: SimplePricingProps) {
  return <SeatStage scene showFullPricingLink={showFullPricingLink} titleAs="h2" />;
}
