import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const useLogout = () => {
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        delete api.defaults.headers.common["Authorization"];

        toast.info("Logged out successfully");

        setTimeout(() => {
            navigate("/");
        }, 500);
    };
};