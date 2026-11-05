"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { addToast } from "@heroui/toast";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        addToast({
          title: "Welcome back!",
          description: "Logged into Ibadan Business Roundtable Admin.",
          color: "success",
        });
        router.push("/admin");
      } else {
        addToast({
          title: "Access Denied",
          description: "Incorrect admin passkey. Please try again.",
          color: "danger",
        });
      }
    } catch {
      addToast({
        title: "Connection Error",
        description: "Failed to connect to authentication service.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700/80 rounded-3xl p-8 shadow-2xl">
        <div className="w-14 h-14 bg-primary/20 border border-primary/40 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary">
          <ShieldCheck size={28} />
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Roundtable Admin
        </h1>
        <p className="text-sm text-slate-400 text-center mb-8">
          Enter your admin passkey to manage business registrations, VIP passes, and sponsor inquiries.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Access Control Center"}
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
