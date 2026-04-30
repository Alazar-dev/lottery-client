import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login.tsx";
import VerifyOtp from "../pages/VerifyOtp.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import AdminRoute from "../components/AdminRoute.tsx";
import AdminDashboard from "../pages/AdminDashboard.tsx";

export const AppRoutes =  (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/verify" element={<VerifyOtp />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )