import { getCoinDetail } from "@/lib/api";

export default async function CoinPage({ params }: { params: { id: string } }) {
  const coin = await getCoinDetail(params.id);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
      <p dangerouslySetInnerHTML={{ __html: coin.description.en?.slice(0, 300) + "..." }} />
    </div>
  );
}
