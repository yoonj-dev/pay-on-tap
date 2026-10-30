import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { PaymentsBattlegroundHero } from './components/dashboard/PaymentsBattlegroundHero';
import { PaymentsSetMenuWorkspace } from './components/dashboard/PaymentsSetMenuWorkspace';
import { TradingViewComparison } from './components/dashboard/TradingViewComparison';
import { Footer } from './components/layout/Footer';
import { Theme, getInitialTheme, applyThemeToDom, resolveTheme } from './lib/theme';
import { INITIAL_PAYMENTS_DATA } from './data/paymentsData';
import { PaymentTicker, PaymentsDataset } from './types/payments';

export const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme);
  const [paymentsData, setPaymentsData] = useState<PaymentsDataset>(INITIAL_PAYMENTS_DATA);
  const [activeTicker, setActiveTicker] = useState<PaymentTicker>('V');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Sync theme
  useEffect(() => {
    applyThemeToDom(currentTheme, true);
  }, [currentTheme]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate live update
    setTimeout(() => {
      setPaymentsData((prev) => ({
        ...prev,
        companies: {
          ...prev.companies,
          V: {
            ...prev.companies.V,
            currentPrice: Number((prev.companies.V.currentPrice + (Math.random() * 0.8 - 0.4)).toFixed(2)),
          },
          MA: {
            ...prev.companies.MA,
            currentPrice: Number((prev.companies.MA.currentPrice + (Math.random() * 1.2 - 0.6)).toFixed(2)),
          },
          AXP: {
            ...prev.companies.AXP,
            currentPrice: Number((prev.companies.AXP.currentPrice + (Math.random() * 0.9 - 0.45)).toFixed(2)),
          },
        },
      }));
      setIsRefreshing(false);
    }, 600);
  };

  const resolvedTheme = resolveTheme(currentTheme);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors">
      <Header
        currentTheme={currentTheme}
        onThemeChanged={setCurrentTheme}
        companies={paymentsData.companies}
        activeTicker={activeTicker}
        onSelectTicker={setActiveTicker}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 py-5 space-y-6">
        {/* 1. Oligopoly Market Dominance Hero & Quick Live Arena */}
        <PaymentsBattlegroundHero
          data={paymentsData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* 2. Set-Menu Specialized 4 Workspaces */}
        <PaymentsSetMenuWorkspace
          data={paymentsData}
          activeTicker={activeTicker}
          onSelectTicker={setActiveTicker}
        />

        {/* 3. TradingView Chart & Multi-Perspective Comparison */}
        <TradingViewComparison
          theme={resolvedTheme}
          activeTicker={activeTicker}
        />
      </main>

      <Footer />
    </div>
  );
};
