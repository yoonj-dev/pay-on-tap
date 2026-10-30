import React, { useEffect, useRef } from 'react';
import { PaymentTicker } from '../../types/payments';

interface TradingViewComparisonProps {
  theme: 'dark' | 'light';
  activeTicker: PaymentTicker;
}

export const TradingViewComparison: React.FC<TradingViewComparisonProps> = ({
  theme,
  activeTicker,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).TradingView !== 'undefined' && containerRef.current) {
        new (window as any).TradingView.widget({
          autosize: true,
          symbol: `NYSE:${activeTicker}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: theme === 'dark' ? 'dark' : 'light',
          style: '1',
          locale: 'kr',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_payments_container',
          studies: ['Volume@tv-basicstudies', 'RSI@tv-basicstudies'],
        });
      }
    };
    containerRef.current.appendChild(script);
  }, [theme, activeTicker]);

  return (
    <div className="fintech-card p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            실시간 트레이딩뷰 (TradingView) 차트 & 기술적 분석
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            현재 선택된 {activeTicker} 실시간 캔들 차트 및 보조지표
          </p>
        </div>
      </div>

      <div className="w-full h-[450px] sm:h-[500px] rounded-xl overflow-hidden border border-slate-200/80 dark:border-zinc-800">
        <div
          id="tradingview_payments_container"
          ref={containerRef}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
