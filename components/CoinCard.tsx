'use client';
import { useState } from 'react';
import type { Coin } from '@/types/coin';
import type { CoinDetail } from '@/types/coinDetail';
import { getCoinDetail } from '@/lib/api';
import { LineChart, Line } from 'recharts';

interface Props { coin: Coin; }

export default function CoinCard({ coin }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setExpanded((e) => !e);
    if (!detail) {
      setLoading(true);
      const d = await getCoinDetail(coin.id);
      setDetail(d);
      setLoading(false);
    }
  };

  return (
    <div className="border w-full rounded-md p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <div className="flex gap-3 items-center">
          <img src={coin.image} className="w-6 h-6" alt="" />
          <div>
            <div className="font-medium">{coin.name}</div>
            <div className="text-xs text-gray-500">{coin.symbol.toUpperCase()}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right text-sm">
            <div>${coin.current_price.toFixed(2)}</div>
            <div className={coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
          <div className="w-32 hidden md:block">
            <LineChart width={100} height={30} data={coin.sparkline_in_7d.price.map((p, i) => ({ pv: p }))}>
              <Line dataKey="pv" dot={false} strokeWidth={1.5} />
            </LineChart>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 text-sm space-y-2">
          {loading ? (
            <div>Loading details…</div>
          ) : detail ? (
            <>
              <div>Market Cap: ${detail.market_data.market_cap.usd.toLocaleString()}</div>
              <div>24h Volume: ${detail.market_data.total_volume.usd.toLocaleString()}</div>
              <div dangerouslySetInnerHTML={{
                __html: detail.description.en.split('. ')[0] + '.'
              }} />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
