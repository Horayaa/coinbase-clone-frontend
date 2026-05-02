interface Coin {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  change24h: number;
  marketCap?: number | null;
  volume24h?: number | null;
}

interface CryptoTableProps {
  coins: Coin[];
  loading: boolean;
}

export default function CryptoTable({ coins, loading }: CryptoTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!coins || coins.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No cryptocurrencies found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 text-gray-500 font-medium">#</th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Name
            </th>
            <th className="text-right px-4 py-3 text-gray-500 font-medium">
              Price
            </th>
            <th className="text-right px-4 py-3 text-gray-500 font-medium">
              24h Change
            </th>
            <th className="text-right px-4 py-3 text-gray-500 font-medium">
              Market Cap
            </th>
            <th className="text-right px-4 py-3 text-gray-500 font-medium">
              Volume (24h)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {coins.map((coin, index) => (
            <tr key={coin._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-400">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-7 h-7 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{coin.name}</div>
                    <div className="text-xs text-gray-400 uppercase">
                      {coin.symbol}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-right font-mono font-medium text-gray-900">
                ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
              </td>
              <td className="px-4 py-3 text-right font-mono font-medium">
                <span
                  className={
                    coin.change24h >= 0 ? "text-green-600" : "text-red-500"
                  }
                >
                  {coin.change24h >= 0 ? "+" : ""}
                  {coin.change24h.toFixed(2)}%
                </span>
              </td>
              <td className="px-4 py-3 text-right text-gray-600">
                {coin.marketCap
                  ? "$" + formatLargeNumber(coin.marketCap)
                  : "—"}
              </td>
              <td className="px-4 py-3 text-right text-gray-600">
                {coin.volume24h
                  ? "$" + formatLargeNumber(coin.volume24h)
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
}
