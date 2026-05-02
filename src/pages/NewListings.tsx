import { useState, useEffect } from "react";
import axios from "axios";
import CryptoTable from "../components/CryptoTable";

interface Coin {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  change24h: number;
}

export default function NewListings() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Coin[]>("/api/crypto/new")
      .then((res) => setCoins(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Listings</h1>
        <p className="text-gray-500 mt-1">
          Most recently added cryptocurrencies
        </p>
      </div>
      <CryptoTable coins={coins} loading={loading} />
    </div>
  );
}
