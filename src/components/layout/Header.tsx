import React, { useState } from 'react';
import {
  MoreVertical,
  ExternalLink,
  Beer,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { Theme } from '../../lib/theme';
import { PaymentTicker, CompanyMetrics } from '../../types/payments';

interface HeaderProps {
  currentTheme: Theme;
  onThemeChanged: (theme: Theme) => void;
  companies: Record<PaymentTicker, CompanyMetrics>;
  activeTicker: PaymentTicker;
  onSelectTicker: (t: PaymentTicker) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onThemeChanged,
  companies,
  activeTicker,
  onSelectTicker,
  isRefreshing,
  onRefresh,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDonate = () => {
    if (typeof window !== 'undefined' && (window as any).BrandUI?.openDonate) {
      (window as any).BrandUI.openDonate();
    } else {
      window.open('https://brand-ui.on-tap.xyz/donate', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#09090b]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-15 flex items-center justify-between gap-3">
        {/* Left: Brand Identity with 3-Dot Trio Symbol */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-zinc-800 p-1 flex items-center justify-center border border-slate-200 dark:border-zinc-700 shadow-xs">
              <div className="flex items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-[#0057B8]" title="Visa" />
                <span className="w-2 h-2 rounded-full bg-[#EB001B]" title="Mastercard" />
                <span className="w-2 h-2 rounded-full bg-[#006FCF]" title="Amex" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                  Payments on Tap
                </span>
                <span className="px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-mono text-[10px] font-bold border border-blue-500/20">
                  V · MA · AXP
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                글로벌 결제 3총사 과점 인텔리전스
              </p>
            </div>
          </a>
        </div>

        {/* Center: Live 3-Ticker Quick Chips */}
        <div className="hidden md:flex items-center gap-2">
          {(['V', 'MA', 'AXP'] as PaymentTicker[]).map((ticker) => {
            const comp = companies[ticker];
            const isPos = comp.change >= 0;
            const isSelected = activeTicker === ticker;
            return (
              <button
                key={ticker}
                onClick={() => onSelectTicker(ticker)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 border-transparent shadow-xs'
                    : 'bg-slate-100/80 dark:bg-zinc-900/80 text-slate-700 dark:text-zinc-300 border-slate-200/60 dark:border-zinc-800 hover:border-blue-400'
                }`}
              >
                <span>{ticker}</span>
                <span className="font-extrabold">${comp.currentPrice.toFixed(2)}</span>
                <span className={`text-[10.5px] ${isPos ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isPos ? '+' : ''}{comp.changePercent.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Controls & Standard 3-Dot (⋯) Context Menu */}
        <div className="flex items-center gap-1.5">
          {/* Stock on Tap Direct Hub Link */}
          <a
            href={activeTicker ? `https://stock.on-tap.xyz/?symbol=${activeTicker}` : "https://stock.on-tap.xyz"}
            target="_blank"
            rel="noopener noreferrer"
            title="Stock on Tap 전체 주식 퀀트 플랫폼으로 이동"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-blue-200/80 dark:border-blue-900/40 bg-blue-50/70 hover:bg-blue-100/80 dark:bg-blue-950/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all shrink-0 shadow-2xs"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-[11.5px] sm:text-xs font-bold whitespace-nowrap">Stock on Tap</span>
            <ExternalLink className="w-3 h-3 opacity-60 hidden sm:inline shrink-0" />
          </a>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="실시간 시세 새로고침"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
          </button>

          {/* 3-Dot Trigger */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-brand-context-menu="true"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="더보기 메뉴"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl p-2 z-50 text-xs space-y-2">
                  {/* Theme Mode Segmented */}
                  <div className="p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => onThemeChanged('auto')}
                      className={`flex-1 py-1 rounded-lg text-center font-bold transition-all ${
                        currentTheme === 'auto'
                          ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      자동
                    </button>
                    <button
                      onClick={() => onThemeChanged('light')}
                      className={`flex-1 py-1 rounded-lg text-center font-bold transition-all ${
                        currentTheme === 'light'
                          ? 'bg-white dark:bg-zinc-900 text-amber-600 shadow-xs'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      라이트
                    </button>
                    <button
                      onClick={() => onThemeChanged('dark')}
                      className={`flex-1 py-1 rounded-lg text-center font-bold transition-all ${
                        currentTheme === 'dark'
                          ? 'bg-white dark:bg-zinc-900 text-indigo-400 shadow-xs'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      다크
                    </button>
                  </div>

                  {/* Ecosystem & Support Links */}
                  <div className="pt-1 border-t border-slate-100 dark:border-zinc-800 space-y-1">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleDonate();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold cursor-pointer"
                    >
                      <Beer className="w-3.5 h-3.5 text-amber-500" />
                      <span>🍺 Buy me a beer (후원하기)</span>
                    </button>

                    <a
                      href={activeTicker ? `https://stock.on-tap.xyz/?symbol=${activeTicker}` : "https://stock.on-tap.xyz"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                    >
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>📈 Stock on Tap (전체 주식)</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <a
                      href="https://dev.on-tap.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                    >
                      <span>🚀 개발자 페이지 (On Tap)</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
