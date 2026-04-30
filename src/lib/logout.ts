import { api } from "../services/api";

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];

    window.location.href = "/";
};