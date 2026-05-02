import { useState, useEffect } from "react";
import CryptoTable from "../components/CryptoTable.jsx";
import axios from "axios";

export default function CryptoList() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/crypto")
      .then((res) => setCoins(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Assets</h1>
        <p className="text-gray-500 mt-1">Browse all tradable cryptocurrencies</p>
      </div>
      <CryptoTable coins={coins} loading={loading} />
    </div>
  );
}
