import React, { useRef, useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Globe2,
} from 'lucide-react';
import { PaymentsDataset, PaymentTicker } from '../../types/payments';

interface PaymentsBattlegroundHeroProps {
  data: PaymentsDataset;
  activeTicker: PaymentTicker;
  onSelectTicker: (t: PaymentTicker) => void;
}

export const PaymentsBattlegroundHero: React.FC<PaymentsBattlegroundHeroProps> = ({
  data,
  activeTicker,
  onSelectTicker,
}) => {
  const { companies, totalGdvRunRate } = data;
  const current = companies[activeTicker];

  // Glow Pulse on active price update
  const prevPriceRef = useRef<number>(current.currentPrice);
  const [glow, setGlow] = useState<'UP' | 'DOWN' | null>(null);

  useEffect(() => {
    if (prevPriceRef.current !== current.currentPrice && prevPriceRef.current > 0) {
      setGlow(current.currentPrice > prevPriceRef.current ? 'UP' : 'DOWN');
      const timer = setTimeout(() => setGlow(null), 1200);
      prevPriceRef.current = current.currentPrice;
      return () => clearTimeout(timer);
    }
    prevPriceRef.current = current.currentPrice;
  }, [current.currentPrice]);

  return (
    <div className="fintech-card p-4 sm:p-6 space-y-5">
      {/* 1. Header Banner: Oligopoly GDV Share Battle Bar */}
      <div className="space-y-2.5 pb-4 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Globe2 className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              글로벌 결제 3총사 연간 {totalGdvRunRate} GDV 영토 전쟁 (Market Share)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
            공식 10-Q 및 거래소 실적 종합
          </span>
        </div>

        {/* Proportional Dominance Bar */}
        <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-xs border border-slate-200/80 dark:border-zinc-800">
          {(['V', 'MA', 'AXP'] as PaymentTicker[]).map((ticker) => {
            const comp = companies[ticker];
            const isSelected = activeTicker === ticker;
            const bgClass =
              ticker === 'V'
                ? 'bg-[#0057B8]'
                : ticker === 'MA'
                ? 'bg-[#EB001B]'
                : 'bg-[#006FCF]';
            return (
              <button
                key={ticker}
                onClick={() => onSelectTicker(ticker)}
                style={{ width: `${comp.gdvSharePct}%` }}
                className={`h-full ${bgClass} transition-all relative flex items-center justify-center text-white text-[11px] font-black font-mono cursor-pointer ${
                  isSelected ? 'ring-2 ring-white dark:ring-zinc-900 z-10 scale-[1.01]' : 'opacity-90 hover:opacity-100'
                }`}
                title={`${comp.name}: ${comp.gdvSharePct}%`}
              >
                <span>{ticker} {comp.gdvSharePct}%</span>
              </button>
            );
          })}
        </div>

        {/* Legend Chips with quick metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {(['V', 'MA', 'AXP'] as PaymentTicker[]).map((ticker) => {
            const comp = companies[ticker];
            const isSelected = activeTicker === ticker;
            return (
              <button
                key={ticker}
                onClick={() => onSelectTicker(ticker)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-50 dark:bg-zinc-800/80 border-slate-400 dark:border-zinc-600 shadow-xs'
                    : 'bg-white dark:bg-zinc-900/40 border-slate-200/60 dark:border-zinc-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: comp.brandColor }}
                    />
                    <span>{comp.name}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700 dark:text-zinc-300">
                    {comp.gdvSharePct}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 mt-1 font-mono">
                  <span>연간 GDV {comp.gdvAnnualRunRate}</span>
                  <span>OPM {comp.operatingMargin}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Selected Ticker Live Hero Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Ticker, Name, Price, and Glow Pulse */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2.5 py-0.5 rounded-lg text-white font-mono font-black text-xs shadow-xs"
              style={{ backgroundColor: current.brandColor }}
            >
              {current.ticker}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {current.koreanName}
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${current.badgeBg}`}>
              {current.businessModel}
            </span>
          </div>

          {/* Price & Change with Glow Pulse */}
          <div
            className={`inline-flex items-baseline gap-3 p-1.5 -ml-1.5 rounded-xl transition-all duration-300 ${
              glow === 'UP'
                ? 'bg-emerald-500/15 ring-2 ring-emerald-500/50 shadow-md shadow-emerald-500/10'
                : glow === 'DOWN'
                ? 'bg-rose-500/15 ring-2 ring-rose-500/50 shadow-md shadow-rose-500/10'
                : ''
            }`}
          >
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
              ${current.currentPrice.toFixed(2)}
            </span>
            <div
              className={`flex items-center gap-1 font-mono text-sm sm:text-base font-bold ${
                current.change >= 0 ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {current.change >= 0 ? (
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <TrendingDown className="w-4 h-4 stroke-[2.5]" />
              )}
              <span>{current.change >= 0 ? '+' : ''}${Math.abs(current.change).toFixed(2)}</span>
              <span>({current.changePercent >= 0 ? '+' : ''}{current.changePercent.toFixed(2)}%)</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            {current.modelDescription}
          </p>
        </div>

        {/* Right: Key Quantitative Multiples Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">Trailing PER</span>
            <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
              {current.trailingPE}x
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">영업이익률</span>
            <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
              {current.operatingMargin}%
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">크로스보더 비중</span>
            <span className="text-sm font-black font-mono text-blue-600 dark:text-blue-400">
              {current.crossBorderRevenueShare}%
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 text-xs">
            <span className="text-[10.5px] text-slate-400 dark:text-zinc-500 block">컨센서스 목표가</span>
            <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
              +{current.targetUpside}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
