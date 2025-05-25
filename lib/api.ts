import axios from "axios";
import type { Coin } from "@/types/coin";

export const getTopCoins = async (page = 1): Promise<Coin[]> => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page,
        sparkline: true,
      },
    }
  );
  return data;
};

export const getCoinDetail = async (id: string) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}`,
    { params: { localization: false } }
  );
  return data;
};
