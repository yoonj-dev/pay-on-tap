import React, { useState } from 'react';
import {
  Globe2,
  PieChart,
  ShieldAlert,
  GitCompare,
} from 'lucide-react';
import { PaymentsDataset, PaymentTicker } from '../../types/payments';

interface PaymentsSetMenuWorkspaceProps {
  data: PaymentsDataset;
  activeTicker: PaymentTicker;
  onSelectTicker: (t: PaymentTicker) => void;
}

type TabId = 'dominance' | 'margin' | 'risk' | 'spread';

export const PaymentsSetMenuWorkspace: React.FC<PaymentsSetMenuWorkspaceProps> = ({
  data,
  activeTicker: _activeTicker,
  onSelectTicker,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('dominance');
  const { companies, spreads } = data;

  const TABS: Array<{ id: TabId; domId: string; label: string; icon: React.ReactNode; badge: string }> = [
    {
      id: 'dominance',
      domId: 'sec-pay-dominance',
      label: 'GDV & 점유율 배틀',
      icon: <Globe2 className="w-4 h-4" />,
      badge: '$29.4T Market',
    },
    {
      id: 'margin',
      domId: 'sec-pay-margin',
      label: '수수료 & 마진 인텔리전스',
      icon: <PieChart className="w-4 h-4" />,
      badge: 'Take-Rate',
    },
    {
      id: 'risk',
      domId: 'sec-pay-risk',
      label: '비즈니스 모델 & 여신 리스크',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: 'Network vs Issuer',
    },
    {
      id: 'spread',
      domId: 'sec-pay-spread',
      label: '퀀트 페어스 트레이딩 & 스프레드',
      icon: <GitCompare className="w-4 h-4" />,
      badge: 'Pairs Alpha',
    },
  ];

  const scrollToSection = (tabId: TabId, domId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById(domId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Jump Ribbon (Sticky) */}
      <div className="sticky top-16 z-20 p-1.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 shadow-xs flex items-center justify-between overflow-x-auto no-scrollbar gap-1">
        <div className="flex items-center gap-1.5 shrink-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id, tab.domId)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-[9.5px] font-mono px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
        <span className="text-[11px] text-slate-400 dark:text-zinc-500 hidden md:inline px-2 font-medium">
          스크롤하여 전체 열람
        </span>
      </div>

      {/* Full-Scroll Continuous Sections */}
      <div className="space-y-6">
        {/* SECTION 1: Dominance Battle */}
        <section id="sec-pay-dominance" className="scroll-mt-28 fintech-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-blue-500" />
                1. 글로벌 결제 볼륨 (GDV) 및 트랜잭션 점유율
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                전 세계 3대 결제망의 연간 카드 결제액, 트랜잭션 건수 및 카드 보급량 비교
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['V', 'MA', 'AXP'] as PaymentTicker[]).map((ticker) => {
              const c = companies[ticker];
              return (
                <div
                  key={ticker}
                  onClick={() => onSelectTicker(ticker)}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/80 dark:border-zinc-700 hover:border-blue-400 transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm px-2 py-0.5 rounded text-white" style={{ backgroundColor: c.brandColor }}>
                      {c.ticker}
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                      점유율 {c.gdvSharePct}%
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>연간 결제액 (GDV):</span>
                      <strong className="text-slate-900 dark:text-white">{c.gdvAnnualRunRate}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>연간 트랜잭션:</span>
                      <strong className="text-slate-900 dark:text-white">{c.transactionCountAnnual} 건</strong>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>글로벌 카드 수:</span>
                      <strong className="text-slate-900 dark:text-white">{c.cardsInCirculation}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Margin Intelligence */}
        <section id="sec-pay-margin" className="scroll-mt-28 fintech-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-zinc-800">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              2. 수수료 수익성 & 크로스보더(Cross-Border) 인텔리전스
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              무위험 네트워크 수수료와 해외 여행 결제 수수료(Cross-Border)가 이끄는 압도적 마진율
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {(['V', 'MA', 'AXP'] as PaymentTicker[]).map((ticker) => {
              const c = companies[ticker];
              return (
                <div key={ticker} className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/80 dark:border-zinc-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black text-sm">
                      OPM {c.operatingMargin}%
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-zinc-700/60 font-mono">
                    <div>
                      <div className="flex justify-between text-slate-500 mb-1">
                        <span>크로스보더 매출 비중</span>
                        <span className="font-bold text-slate-900 dark:text-white">{c.crossBorderRevenueShare}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.crossBorderRevenueShare * 2}%` }} />
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-slate-600 dark:text-zinc-400 font-sans">
                      {ticker === 'V' && '규모의 경제를 바탕으로 업계 최고인 67.4% 영업마진 달성.'}
                      {ticker === 'MA' && '유럽/아시아 크로스보더 비중(35.4%)이 높아 해외 결제 턴어라운드 수혜 극대화.'}
                      {ticker === 'AXP' && '자체 카드 발급 및 대출 손실 충당금으로 인해 OPM 22.8%로 상대적 낮음.'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Business Model & Credit Risk */}
        <section id="sec-pay-risk" className="scroll-mt-28 fintech-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-zinc-800">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-500" />
              3. 비즈니스 모델 분기 & 신용 대출 리스크 프로파일
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              오픈 네트워크(Visa·Mastercard)의 무위험 고속도로 vs 폐쇄형 카드사(Amex)의 대출 위험 분해
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/30 space-y-2 text-xs">
              <span className="font-bold text-blue-700 dark:text-blue-300 text-sm">
                1. 자산 경량화 오픈 네트워크 (Visa & Mastercard)
              </span>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                비자와 마스터카드는 은행이 아닙니다. 고객에게 돈을 빌려주지 않으며, 카드 대금 연체나 부도에 따른 신용 손실 위험을 <strong>전혀 부담하지 않습니다(Credit Risk = 0)</strong>.
                오직 가맹점과 발급 은행 사이에서 결제 데이터를 중개하고 건당 톨게이트 수수료를 받으므로 경기 침체 시에도 마진이 훼손되지 않습니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/30 space-y-2 text-xs">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                2. 폐쇄형 카드 발급사 (American Express)
              </span>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                아멕스는 카드 네트워크인 동시에 고객에게 직접 신용을 공여하는 금융사입니다. 고소득 프리미엄 고객의 연회비($695 플래티넘 등)와 가맹점 할인료(Discount Fee)를 독점 취득하지만,
                <strong>경기 침체 시 고객 연체 및 대손 충당금(Provision for Credit Losses) 리스크</strong>를 직접 떠안습니다.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Quant Spread & Pairs Trading */}
        <section id="sec-pay-spread" className="scroll-mt-28 fintech-card p-5 space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-purple-500" />
                4. 3사 퀀트 페어스 트레이딩 (Pairs Trading) & 상대가치 스프레드
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                역사적 밸류에이션 밴드 및 평균 회귀(Mean Reversion) 시그널
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spreads.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-200/80 dark:border-zinc-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{s.pair}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {s.signal}
                  </span>
                </div>

                <div className="flex items-baseline justify-between font-mono pt-1">
                  <span className="text-slate-400">현재 비율:</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{s.ratio.toFixed(3)}</strong>
                </div>

                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-slate-400">P/E 격차:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">+{s.peDifference.toFixed(1)}x</strong>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-zinc-400 pt-2 border-t border-slate-200/60 dark:border-zinc-700/60 leading-relaxed">
                  💡 {s.insight}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};