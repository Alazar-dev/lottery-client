import { useState, useContext } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Loader2, Mail } from "lucide-react";
import {toast} from "react-toastify";

import { api, setAuthToken } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { state } = useLocation();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    if (!state?.email) {
        return <Navigate to="/" replace />;
    }

    const verifyOtp = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.post("/auth/verifyOtp", {
                email: state.email,
                otp,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setAuthToken(res.data.token);
            setUser(res.data.user);

            toast.success("Login successful");

            if (res.data.user.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || "Invalid OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/20 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
                        <ShieldCheck className="text-black" size={32} />
                    </div>

                    <h1 className="text-4xl font-black mb-3">Verify OTP</h1>

                    <p className="text-gray-400 leading-relaxed mb-8">
                        Enter the 6-digit verification code sent to{" "}
                        <span className="text-emerald-400 font-medium">{state.email}</span>.
                    </p>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-300 mb-3">
                                Verification Code
                            </label>

                            <div className="relative">
                                <Mail
                                    size={20}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                                />

                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    maxLength={6}
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl bg-black/40 border border-white/10 focus:border-emerald-500 focus:outline-none text-white placeholder:text-gray-500 tracking-[0.35em] text-lg"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-2xl px-4 py-3">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={verifyOtp}
                            disabled={loading || otp.length < 6}
                            className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify & Continue
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="w-full text-sm text-gray-400 hover:text-white transition"
                        >
                            Use another email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}