/** Public marketing prices.
    A seat is per person. On that seat you recharge credits, bring your own keys,
    or use an existing Claude or ChatGPT subscription.
    Self install is a one-time lifetime purchase on a machine you own. */
export const PRICING_USD = {
  seatMonthly: 25,
  selfInstallLifetime: 149,
} as const;

export function formatUsd(amount: number) {
  return `$${amount}`;
}

export const SEAT_INCLUDES = [
  'Unlimited messaging and calls for your team and agents.',
  'Recharge credits, or bring your own keys.',
  'Use your existing Claude and ChatGPT subscription.',
  'Unlimited research: web search, scraping, and extraction.',
] as const;
