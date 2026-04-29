import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const requestOtp = async () => {
        await api.post("/auth/requestOtp", { email });
        navigate("/verify", { state: { email } });
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <button onClick={requestOtp}>Send OTP</button>
        </div>
    );
}