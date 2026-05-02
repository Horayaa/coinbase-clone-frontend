import { useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Coin {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  change24h: number;
}

interface Stats {
  totalCoins: number;
  totalGainers: number;
  totalLosers: number;
  avgChange24h: number;
  topGainer: Coin | null;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, coinsRes] = await Promise.all([
          axios.get<Stats>("/api/crypto/stats"),
          axios.get<Coin[]>("/api/crypto"),
        ]);
        setStats(statsRes.data);
        setCoins(coinsRes.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            The future of money is here
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            We are the most trusted place for people and businesses to buy,
            sell, and manage crypto.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/crypto"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Assets
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard label="Total Assets" value={stats.totalCoins} />
            <StatCard
              label="Avg Change (24h)"
              value={`${stats.avgChange24h >= 0 ? "+" : ""}${stats.avgChange24h.toFixed(2)}%`}
              valueClass={stats.avgChange24h >= 0 ? "text-green-600" : "text-red-500"}
            />
            <StatCard
              label="Top Gainer"
              value={stats.topGainer?.name || "—"}
              sub={stats.topGainer ? `+${stats.topGainer.change24h.toFixed(2)}%` : ""}
              subClass="text-green-600"
            />
            <StatCard
              label="Gainers / Losers"
              value={
                <span>
                  <span className="text-green-600">{stats.totalGainers}</span>
                  <span className="text-gray-400"> / </span>
                  <span className="text-red-500">{stats.totalLosers}</span>
                </span>
              }
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Top Assets</h2>
          <Link to="/crypto" className="text-blue-600 text-sm font-medium hover:underline">
            View all
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {coins.map((coin, index) => (
            <div
              key={coin._id}
              className={`flex items-center justify-between px-5 py-4 ${
                index < coins.length - 1 ? "border-b border-gray-100" : ""
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 w-5">{index + 1}</span>
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                <div>
                  <div className="font-medium text-gray-900">{coin.name}</div>
                  <div className="text-xs text-gray-400 uppercase">{coin.symbol}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium text-gray-900">
                  ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
                <div
                  className={`text-xs font-mono ${
                    coin.change24h >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {coin.change24h >= 0 ? "+" : ""}
                  {coin.change24h.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: ReactNode;
  sub?: string;
  valueClass?: string;
  subClass?: string;
}

function StatCard({
  label,
  value,
  sub,
  valueClass = "text-gray-900",
  subClass = "",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
      {sub && <p className={`text-sm mt-1 ${subClass}`}>{sub}</p>}
    </div>
  );
}
