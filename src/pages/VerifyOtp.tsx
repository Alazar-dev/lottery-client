import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const { state } = useLocation();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const verifyOtp = async () => {
        const res = await api.post("/auth/verify-otp", {
            email: state.email,
            otp
        });

        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
        setUser(res.data.user);

        navigate("/dashboard");
    };

    return (
        <div>
            <h1>Verify OTP</h1>
            <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
            />
            <button onClick={verifyOtp}>Verify</button>
        </div>
    );
}