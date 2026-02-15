# Volatility Forecast

A beginner-friendly stock volatility dashboard built with Next.js. Search any ticker to see its recent price volatility visualized as weather conditions — from calm skies to full storms — with a heat scale, S&P 500 comparison, and plain-English explainers.

## Features

- **Ticker Search** — Look up any stock by symbol or company name via Polygon.io
- **Weather-Based Volatility Display** — Volatility mapped to intuitive weather conditions (Sunny, Partly Cloudy, Cloudy, Rainy, Stormy)
- **Heat Scale** — 1–10 visual scale showing how volatile the stock is right now
- **S&P 500 Comparison** — See how a stock's volatility stacks up against the broader market
- **"What's Happening Right Now" Explainer** — Dynamic, two-sentence summary of current conditions in plain language
- **Educational Cards** — Learn the difference between historical and implied volatility

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Polygon.io API** — ticker search and daily OHLCV price data
- **AlphaVantage API** — sentiment and historical data

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nneed/volatility-forecast.git
cd volatility-forecast
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up API keys

Copy the example environment file and add your keys:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your real API keys:

```
NEXT_PUBLIC_POLYGON_API_KEY=your_polygon_key_here
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_alphavantage_key_here
```

**Get free API keys:**

- Polygon.io — [https://polygon.io/dashboard/signup](https://polygon.io/dashboard/signup)
- AlphaVantage — [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (TickerSearch, Dashboard, etc.)
├── hooks/            # Custom hooks (useVolatilityForecast, useDebouncedSearch)
├── services/         # API clients (Polygon.io, AlphaVantage)
├── utils/            # Risk engine, weather mapper
└── data/             # Constants, mock data
```
