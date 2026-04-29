import { Navigate } from "react-router-dom";

export default function AdminRoute({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}