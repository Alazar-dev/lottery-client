import { useEffect, useState } from "react";
import {
  Wallet,
  Ticket,
  Trophy,
  ArrowRight,
  Clock3,
  Loader2,
} from "lucide-react";

import { api, setAuthToken } from "../services/api";
import {useSearchParams} from "react-router-dom";

interface TicketType {
  _id: string;
  number: string;
  drawWeek: string;
  createdAt: string;
}

interface UserType {
  email: string;
  walletBalance: number;
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);


  const [user, setUser] = useState<UserType | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();

    const [paymentMessage, setPaymentMessage] = useState(
        "Verifying payment..."
    );

    const verifyPayment = async () => {
        try {
            const tx_ref = searchParams.get("tx_ref");

            if (!tx_ref) {
                setPaymentMessage("Missing transaction reference");
                return;
            }

            const res = await api.get(
                `/payment/verify?tx_ref=${tx_ref}`
            );

            setPaymentMessage(res.data.message);
        } catch (err: any) {
            console.log(err);

            setPaymentMessage("Payment verification failed");
        }
    };
  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");

    if (tx_ref) {
      verifyPayment();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
    }

    fetchTickets(1);
    fetchUser();
  }, []);

  const fetchTickets = async (page = 1) => {
    try {
      const res = await api.get(`/ticket/my?page=${page}&limit=6`);

      setTickets(res.data.tickets);
      setCurrentPage(res.data.pagination.currentPage);
      setTotalPages(res.data.pagination.totalPages);
      setTotalTickets(res.data.pagination.totalTickets);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem(
        "user"
      );

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const buyTicket = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await api.post(
        "/payment/initiate"
      );

      window.location.href =
        res.data.checkout_url;
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          "Failed to initiate payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 blur-3xl rounded-full" />
      </div>

      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-wide">
              Lottery
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Player Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-3">
              <Wallet className="text-emerald-400" />

              <div>
                <p className="text-xs text-gray-400">
                  Wallet Balance
                </p>

                <h3 className="font-bold text-lg">
                  ETB {user?.walletBalance || 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
                <Trophy size={16} />
                Weekly Draw Active
              </div>

              <h2 className="text-4xl font-black leading-tight max-w-xl">
                Buy Your Ticket &
                <br />
                Win Big This Week
              </h2>

              <p className="text-gray-400 mt-6 max-w-2xl leading-relaxed">
                Secure your entry into this week's draw.
                Tickets are generated with cryptographic
                security and automatically entered into
                the active prize pool.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <button
                  onClick={buyTicket}
                  disabled={loading}
                  className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 transition-all duration-300 text-black font-semibold text-lg flex items-center gap-2 shadow-lg shadow-emerald-500/30"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Buy Ticket - 10 ETB
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3 text-gray-400">
                  <Clock3 size={18} />
                  Weekly Draw Every Sunday
                </div>
              </div>

              {message && (
                <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl">
                  {message}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <h3 className="text-2xl font-bold mb-8">
              Your Activity
            </h3>

            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-black/30 border border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      Total Tickets
                    </p>

                    <h2 className="text-3xl font-black mt-2">
                      {totalTickets}
                    </h2>
                  </div>

                  <Ticket className="text-yellow-400" size={34} />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/30 border border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      Current Balance
                    </p>

                    <h2 className="text-3xl font-black mt-2 text-emerald-400">
                      ETB {user?.walletBalance || 0}
                    </h2>
                  </div>

                  <Wallet className="text-emerald-400" size={34} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black">
                My Tickets
              </h2>

              <p className="text-gray-400 mt-2">
                Your active and previous lottery entries.
              </p>
            </div>
          </div>

          {tickets.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-black/20">
              <Ticket
                size={60}
                className="mx-auto text-gray-600 mb-5"
              />

              <h3 className="text-2xl font-bold mb-3">
                No Tickets Yet
              </h3>

              <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                Purchase your first lottery ticket to
                participate in the upcoming weekly draw.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tickets?.map((ticket) => (
                <div
                  key={ticket._id}
                  className="group rounded-3xl border border-white/10 bg-black/30 hover:bg-black/40 transition-all duration-300 p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-emerald-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Ticket className="text-emerald-400" />
                      </div>

                      <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">
                        Active
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-2">
                      Ticket Number
                    </p>

                    <h3 className="text-3xl font-black tracking-wider mb-6 break-all">
                      {ticket.number}
                    </h3>

                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="flex items-center justify-between">
                        <span>Draw Week</span>

                        <span className="text-white font-medium">
                          {ticket.drawWeek}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Purchased</span>

                        <span className="text-white font-medium">
                          {new Date(
                            ticket.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                  onClick={() => fetchTickets(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                    <button
                        key={page}
                        onClick={() => fetchTickets(page)}
                        className={`w-12 h-12 rounded-2xl border transition ${
                            currentPage === page
                                ? "bg-emerald-500 text-black border-emerald-500"
                                : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                        }`}
                    >
                      {page}
                    </button>
                );
              })}

              <button
                  onClick={() => fetchTickets(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition"
              >
                Next
              </button>
            </div>
        )}
      </main>
    </div>
  );
}
