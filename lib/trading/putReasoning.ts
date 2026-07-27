export type PutInputs = {
  symbol: string;
  price: number;
  openingRangeLow: number;
  openingRangeHigh: number;
  volumeStrength: 'low' | 'normal' | 'high' | 'capitulation';
  trend: 'below-vwap' | 'at-vwap' | 'above-vwap';
  retest: 'failed' | 'holding' | 'not-tested';
  fearScore: number;
  minutesBelowRange: number;
};

export type PutReasoning = {
  verdict: 'NO TRADE' | 'WATCH' | 'PUT SETUP';
  confidence: number;
  reasons: string[];
  risks: string[];
  invalidation: string;
  permissionRequired: true;
};

export function reasonAboutPut(input: PutInputs): PutReasoning {
  let score = 0;
  const reasons: string[] = [];
  const risks: string[] = [];

  if (input.price < input.openingRangeLow) {
    score += 24;
    reasons.push('Price is below the opening-range low, so sellers currently control the range.');
  } else {
    risks.push('Price has not confirmed a break below the opening-range low.');
  }

  if (input.trend === 'below-vwap') {
    score += 18;
    reasons.push('Price is below VWAP, supporting a bearish intraday structure.');
  } else if (input.trend === 'above-vwap') {
    score -= 20;
    risks.push('Price is above VWAP, which conflicts with a put thesis.');
  }

  if (input.retest === 'failed') {
    score += 22;
    reasons.push('The broken support level was retested and rejected, reducing the chance of chasing a false breakdown.');
  } else if (input.retest === 'not-tested') {
    score -= 10;
    risks.push('No retest has occurred yet; entering now may mean chasing the move.');
  } else {
    score -= 14;
    risks.push('The retest is holding, so former support may not have become resistance.');
  }

  if (input.volumeStrength === 'high') {
    score += 14;
    reasons.push('High selling volume confirms participation behind the breakdown.');
  } else if (input.volumeStrength === 'capitulation') {
    score += 4;
    risks.push('Capitulation volume can confirm fear, but it can also mark exhaustion and a sharp reversal.');
  } else if (input.volumeStrength === 'low') {
    score -= 12;
    risks.push('Low volume makes the breakdown less trustworthy.');
  }

  if (input.minutesBelowRange >= 30) {
    score += 12;
    reasons.push(`Price has remained below the opening range for ${input.minutesBelowRange} minutes, showing acceptance below support.`);
  } else {
    risks.push('The move has not spent 30 minutes below the range, so acceptance is not established.');
  }

  if (input.fearScore >= 70) {
    score += 8;
    risks.push('Fear is elevated; use smaller size because panic can create both acceleration and violent snapback rallies.');
  } else if (input.fearScore < 35) {
    score -= 8;
    risks.push('Fear is weak, so downside follow-through may be limited.');
  }

  const confidence = Math.max(0, Math.min(100, 50 + score));
  const verdict = confidence >= 76 ? 'PUT SETUP' : confidence >= 55 ? 'WATCH' : 'NO TRADE';
  const invalidation = `Invalidate the bearish thesis if price reclaims and holds above ${input.openingRangeLow.toFixed(2)}; stronger invalidation is a reclaim of VWAP or ${input.openingRangeHigh.toFixed(2)}.`;

  return { verdict, confidence, reasons, risks, invalidation, permissionRequired: true };
}
