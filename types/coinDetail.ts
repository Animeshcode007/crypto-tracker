export interface CoinDetail {
  description: { en: string };
  market_data: {
    market_cap: { usd: number };
    total_volume: { usd: number };
  };
}