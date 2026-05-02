import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface PresetCoin {
  name: string;
  symbol: string;
  image: string;
}

const PRESET_COINS: PresetCoin[] = [
  { name: "Bitcoin", symbol: "BTC", image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { name: "Ethereum", symbol: "ETH", image: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "Cardano", symbol: "ADA", image: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
  { name: "Solana", symbol: "SOL", image: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { name: "Tether", symbol: "USDT", image: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { name: "Dogecoin", symbol: "DOGE", image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png" },
];

export default function AddCrypto() {
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    price: "",
    image: "",
    change24h: "",
    marketCap: "",
    volume24h: "",
  });
  const [loading, setLoading] = useState(false);
  const [useDefaultImage, setUseDefaultImage] = useState(true);
  const [selectedDefaultImage, setSelectedDefaultImage] = useState(PRESET_COINS[0].image);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePresetSelect = (coin: PresetCoin) => {
    setSelectedDefaultImage(coin.image);
    setForm((prev) => ({ 
      ...prev, 
      image: coin.image,
      name: prev.name || coin.name,
      symbol: prev.symbol || coin.symbol 
    }));
  };

  const setImageMode = (useDefault: boolean) => {
    setUseDefaultImage(useDefault);
    setForm((prev) => ({
      ...prev,
      image: useDefault ? selectedDefaultImage : "",
    }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/crypto", {
        name: form.name,
        symbol: form.symbol,
        price: parseFloat(form.price),
        image: useDefaultImage ? selectedDefaultImage : form.image,
        change24h: parseFloat(form.change24h),
        marketCap: form.marketCap ? parseFloat(form.marketCap) : null,
        volume24h: form.volume24h ? parseFloat(form.volume24h) : null,
      });
      toast.success(`${form.name} added successfully!`);
      navigate("/crypto");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "Failed to add cryptocurrency");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Add Cryptocurrency</h1>
        <p className="text-gray-500">List a new coin on the platform</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Field label="Coin Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ethereum" required />
          <Field label="Symbol" name="symbol" value={form.symbol} onChange={handleChange} placeholder="e.g. ETH" required />
          <Field label="Price (USD)" name="price" value={form.price} onChange={handleChange} type="number" step="any" min="0" placeholder="e.g. 3500.00" required />
          
          <div className="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Coin Image</label>
              <div className="flex bg-gray-200 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setImageMode(true)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    useDefaultImage ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Presets
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode(false)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    !useDefaultImage ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Custom URL
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden p-2">
                  {(useDefaultImage ? selectedDefaultImage : form.image) ? (
                    <img
                      src={useDefaultImage ? selectedDefaultImage : form.image}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/80?text=No+Icon";
                      }}
                    />
                  ) : (
                    <div className="text-[10px] text-gray-400 text-center px-1">No Image</div>
                  )}
                </div>
              </div>

              <div className="flex-1 w-full">
                {useDefaultImage ? (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {PRESET_COINS.map((coin) => (
                      <button
                        type="button"
                        key={coin.symbol}
                        className={`aspect-square flex items-center justify-center border-2 rounded-xl transition-all hover:bg-gray-50 ${
                          selectedDefaultImage === coin.image
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-transparent bg-white shadow-sm hover:border-gray-200"
                        }`}
                        onClick={() => handlePresetSelect(coin)}
                      >
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 object-contain" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Paste image URL here..."
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                )}
              </div>
            </div>
          </div>

          <Field label="24h Change (%)" name="change24h" value={form.change24h} onChange={handleChange} type="number" step="any" placeholder="e.g. 2.5 or -1.3" required />
          <Field label="Market Cap (USD) — optional" name="marketCap" value={form.marketCap} onChange={handleChange} type="number" step="any" min="0" placeholder="e.g. 400000000000" />
          <Field label="24h Volume (USD) — optional" name="volume24h" value={form.volume24h} onChange={handleChange} type="number" step="any" min="0" placeholder="e.g. 18000000000" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2"
          >
            {loading ? "Adding..." : "Add Cryptocurrency"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Field({ label, ...props }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
