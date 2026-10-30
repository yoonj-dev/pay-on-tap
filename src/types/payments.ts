export type PaymentTicker = 'V' | 'MA' | 'AXP';

export interface CompanyMetrics {
  ticker: PaymentTicker;
  name: string;
  koreanName: string;
  brandColor: string;
  brandGradient: string;
  badgeBg: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap: string;
  trailingPE: number;
  forwardPE: number;
  pegRatio: number;
  dividendYield: number;
  targetPrice: number;
  targetUpside: number;
  
  // Payment specifics
  businessModel: 'Asset-Light Open Network' | 'Closed-Loop Card Issuer';
  modelDescription: string;
  gdvAnnualRunRate: string; // e.g. '$15.5T'
  gdvQuarterly: string; // e.g. '$3.9T'
  gdvSharePct: number; // e.g. 52.4%
  transactionCountAnnual: string; // e.g. '280B'
  cardsInCirculation: string; // e.g. '4.5B'
  operatingMargin: number; // % (e.g. 67.2%)
  crossBorderRevenueShare: number; // % (e.g. 32%)
  creditRiskLevel: 'Zero (No Credit Risk)' | 'Medium-High (Revolving Loans)';
  creditProvisionsRatio?: number; // % for AXP
}

export interface PairSpread {
  pair: string;
  ratio: number;
  peDifference: number;
  historicalMeanRatio: number;
  signal: 'NEUTRAL' | 'MA_PREMIUM_HIGH' | 'V_DISCOUNT_ATTRACTIVE' | 'AXP_VALUE_BUY';
  insight: string;
}

export interface PaymentsDataset {
  asOfDate: string;
  totalGdvRunRate: string;
  companies: Record<PaymentTicker, CompanyMetrics>;
  spreads: PairSpread[];
}
