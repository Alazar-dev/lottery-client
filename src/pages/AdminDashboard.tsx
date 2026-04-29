import { useEffect, useState } from "react";

import { api } from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Users,
  Ticket,
  Wallet,
  Trophy,
  DollarSign,
  Activity,
  Crown,
  TrendingUp,
  Loader2,
} from "lucide-react";

interface StatsType {
  totalUsers: number;
  totalTickets: number;
  totalRevenue: number;
  totalDraws: number;
  totalWinners: number;
  totalPayouts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<StatsType | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/admin/stats"
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex items-center gap-3 text-lg font-medium">
          <Loader2 className="animate-spin" />
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const data = [
    {
      name: "Revenue",
      value: stats.totalRevenue,
    },
    {
      name: "Payouts",
      value: stats.totalPayouts,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 blur-3xl rounded-full" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Crown className="text-black" />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-wide">
                  LotteryX Admin
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                  Analytics & Platform Management
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-3">
              <Activity className="text-emerald-400" />

              <div>
                <p className="text-xs text-gray-400">
                  Platform Status
                </p>

                <h3 className="font-semibold text-emerald-400">
                  Operational
                </h3>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Hero Section */}
        <div className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
              <TrendingUp size={16} />
              Live Platform Analytics
            </div>

            <h2 className="text-5xl font-black leading-tight max-w-3xl">
              Monitor Lottery Operations
              <br />
              In Real Time
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
              Track revenue, payouts, users, draw activity,
              and overall platform performance from a
              centralized enterprise-grade admin dashboard.
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Users */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Users className="text-blue-400" />
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                Users
              </span>
            </div>

            <h2 className="text-4xl font-black">
              {stats.totalUsers}
            </h2>

            <p className="text-gray-400 mt-3">
              Registered platform users.
            </p>
          </div>

          {/* Tickets */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <Ticket className="text-yellow-400" />
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                Tickets
              </span>
            </div>

            <h2 className="text-4xl font-black">
              {stats.totalTickets}
            </h2>

            <p className="text-gray-400 mt-3">
              Total tickets sold.
            </p>
          </div>

          {/* Revenue */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <DollarSign className="text-emerald-400" />
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Revenue
              </span>
            </div>

            <h2 className="text-4xl font-black text-emerald-400">
              ETB {stats.totalRevenue}
            </h2>

            <p className="text-gray-400 mt-3">
              Total platform revenue.
            </p>
          </div>

          {/* Draws */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Trophy className="text-purple-400" />
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                Draws
              </span>
            </div>

            <h2 className="text-4xl font-black">
              {stats.totalDraws}
            </h2>

            <p className="text-gray-400 mt-3">
              Completed weekly draws.
            </p>
          </div>

          {/* Winners */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <Crown className="text-orange-400" />
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
                Winners
              </span>
            </div>

            <h2 className="text-4xl font-black">
              {stats.totalWinners}
            </h2>

            <p className="text-gray-400 mt-3">
              Total winning players.
            </p>
          </div>

          {/* Payouts */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Wallet className="text-red-400" />
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                Payouts
              </span>
            </div>

            <h2 className="text-4xl font-black text-red-400">
              ETB {stats.totalPayouts}
            </h2>

            <p className="text-gray-400 mt-3">
              Total distributed winnings.
            </p>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-black mb-2">
                Revenue Analytics
              </h2>

              <p className="text-gray-400">
                Platform revenue vs payouts overview.
              </p>
            </div>

            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="value" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Stats */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-black mb-2">
                Platform Insights
              </h2>

              <p className="text-gray-400 leading-relaxed">
                Key operational metrics for platform
                monitoring and performance tracking.
              </p>
            </div>

            <div className="space-y-6 mt-10">
              <div className="p-5 rounded-2xl bg-black/30 border border-white/5">
                <p className="text-sm text-gray-400 mb-2">
                  Avg Revenue Per Ticket
                </p>

                <h3 className="text-3xl font-black text-emerald-400">
                  ETB
                  {stats.totalTickets > 0
                    ? Math.floor(
                        stats.totalRevenue /
                          stats.totalTickets
                      )
                    : 0}
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-black/30 border border-white/5">
                <p className="text-sm text-gray-400 mb-2">
                  Winner Ratio
                </p>

                <h3 className="text-3xl font-black text-yellow-400">
                  {stats.totalUsers > 0
                    ? Math.floor(
                        (stats.totalWinners /
                          stats.totalUsers) *
                          100
                      )
                    : 0}
                  %
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
