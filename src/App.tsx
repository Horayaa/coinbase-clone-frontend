import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WarningBanner from "./components/WarningBanner";
import FooterDisclaimer from "./components/FooterDisclaimer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CryptoList from "./pages/CryptoList";
import Gainers from "./pages/Gainers";
import NewListings from "./pages/NewListings";
import Profile from "./pages/Profile";
import AddCrypto from "./pages/AddCrypto";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <WarningBanner />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crypto" element={<CryptoList />} />
          <Route path="/crypto/gainers" element={<Gainers />} />
          <Route path="/crypto/new" element={<NewListings />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-crypto"
            element={
              <ProtectedRoute>
                <AddCrypto />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <FooterDisclaimer />
    </div>
  );
}
