import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";

interface ProfileData {
  name: string;
  email: string;
  createdAt: string;
  portfolioValue: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<ProfileData>("/api/users/profile")
      .then((res) => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-4 animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-100 rounded w-64" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-blue-600 px-8 py-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <p className="text-blue-200 text-sm">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <InfoCard label="Full Name" value={profile.name} />
            <InfoCard label="Email Address" value={profile.email} />
            <InfoCard
              label="Member Since"
              value={new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <InfoCard
              label="Portfolio Value"
              value={`$${profile.portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              valueClass="text-green-600 font-bold text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: ReactNode;
  valueClass?: string;
}

function InfoCard({ label, value, valueClass = "text-gray-900 font-medium" }: InfoCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  );
}
