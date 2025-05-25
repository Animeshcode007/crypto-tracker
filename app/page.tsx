"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { getTopCoins } from "@/lib/api";
import type { Coin } from "@/types/coin";
import CoinCard from "@/components/CoinCard";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filtered, setFiltered] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadCoins(page);
  }, [page]);

  const loadCoins = async (pg: number) => {
    setLoading(true);
    const data = await getTopCoins(pg);
    setCoins((c) => [...c, ...data]);
    setFiltered((f) => [...f, ...data]);
    setLoading(false);
  };

  const handleSearch = (query: string) => {
    setFiltered(
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setPage((p) => p + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <main className="max-w-6xl mx-auto px-8 py-6 grid gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Cryptocurrency Tracker</h1>
        <ThemeToggle />
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="loader dark:border-gray-700 dark:border-t-gray-300" />
        </div>
      )}
      <div ref={loaderRef} className="h-1" />
    </main>
  );
}
