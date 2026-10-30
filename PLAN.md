# PLAN: Payments on Tap Implementation Pipeline
- Plan ID: PLAN-20261030-PAY-ON-TAP-INIT
- Target: pay-on-tap (https://pay.on-tap.xyz)
- Date: 2026-10-30
- 1. Project Initialization & Architecture Setup
* Step 1.1: Initialize package.json with Node.js >= 22.0.0, React 19, TypeScript, Tailwind CSS v4, Lucide icons, and Wrangler.
* Step 1.2: Generate official branding assets via Python PIL script (favicon.svg, favicon.ico, apple-touch-icon.png, icon-192, icon-512, og-image.png).
* Step 1.3: Configure Cloudflare wrangler.toml with [assets] directory = "./dist" and not_found_handling = "single-page-application".
* Step 1.4: Setup Tailwind CSS v4 with high-specificity dark variant and dual-theme tokens.
- 2. Data Engineering & Python Market Pipeline
* Step 2.1: Python live scraper/fetcher scripts/fetch_payments_live.py to fetch V, MA, AXP quotes, GDV volumes, margins, and credit metrics from official exchange feeds and 10-Q reports.
* Step 2.2: Compile ground-truth data into public/data/payments.json.
- 3. Frontend Component & Terminal Implementation
* Step 3.1: Global Header with ticker ribbons (V · MA · AXP live prices), 3-dot (⋯) context menu (Buy me a beer, Developer page, Theme switcher).
* Step 3.2: PaymentsBattlegroundHero (The Arena): Interactive 3-way market dominance bar, GDV comparison, and 24H volume indicators.
* Step 3.3: 4 Tabbed Workspaces:
* Tab 1: Market Dominance Battle (GDV, Transactions, Card counts).
* Tab 2: Margin & Cross-Border Fee Intelligence (Take rates, Cross-border volume growth).
* Tab 3: Model & Credit Risk Gauge (Network vs Issuer, Delinquency rates, Capital ratios).
* Tab 4: Quant Pairs Trading & Valuation Radar (P/E spreads, EV/EBITDA, Consensus upside).
* Step 3.4: TradingView Comparison Chart section for V vs MA vs AXP.
* Step 3.5: Standard Footer with ecosystem navigation.
- 4. Verification & Deployment Pipeline
* npm run build verification (0 errors).
* check_theme.sh verification (0 warnings).
* wrangler deploy --dry-run verification.
* Atomic git commit and remote GitHub push.