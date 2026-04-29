import {useEffect, useState} from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Trophy,
  Wallet,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      setLoading(true);
      setError("");

      await api.post("/auth/requestOtp", {
        email,
      });

      navigate("/verify", {
        state: { email },
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token) {
      navigate("/dashboard");
    }
  }, [token])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/20 blur-3xl rounded-full" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center font-bold text-black text-lg shadow-lg shadow-emerald-500/30">
              L
            </div>

            <div>
              <h1 className="font-bold text-xl tracking-wide">
                Lottery
              </h1>

              <p className="text-xs text-gray-400">
                Secure Weekly Lottery Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <button className="hover:text-white transition">
              Features
            </button>

            <button className="hover:text-white transition">
              Winners
            </button>

            <button className="hover:text-white transition">
              About
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Side */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm mb-8">
            <Sparkles size={16} />
            Trusted & Secure Digital Lottery Platform
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            Win Big.
            <br />
            Play Secure.
          </h1>

          <p className="text-lg text-gray-400 mt-8 leading-relaxed max-w-xl">
            Buy lottery tickets securely, join weekly draws,
            and receive winnings directly into your wallet.
            Built with enterprise-level security and
            transparent draw systems.
          </p>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-5 mt-12">
            <div className="p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <ShieldCheck className="text-emerald-400 mb-4" />

              <h3 className="font-semibold mb-2">
                Secure Draws
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                Cryptographically secure ticket generation.
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <Wallet className="text-yellow-400 mb-4" />

              <h3 className="font-semibold mb-2">
                Instant Wallet
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                Automatic payouts and wallet management.
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <Trophy className="text-orange-400 mb-4" />

              <h3 className="font-semibold mb-2">
                Weekly Winners
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                Transparent weekly prize distributions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />

          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 lg:p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3">
                Get Started
              </h2>

              <p className="text-gray-400 leading-relaxed">
                Enter your email to receive a secure OTP and
                access your lottery dashboard.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full h-14 px-5 rounded-2xl bg-black/40 border border-white/10 focus:border-emerald-500 focus:outline-none text-white placeholder:text-gray-500 transition"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-2xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                onClick={requestOtp}
                disabled={loading || !email}
                className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
              >
                {loading ? (
                  "Sending OTP..."
                ) : (
                  <>
                    Continue
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-emerald-400">
                  10K+
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Active Players
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-yellow-400">
                  5M+
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  ETB Paid Out
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-orange-400">
                  99.9%
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Secure Draws
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
