import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import { api } from "../services/api";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(
        null
    );
    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const res = await api.get(
            "/admin/stats"
        );

        setStats(res.data);
    };
    if (!stats) {
        return <div>Loading...</div>;
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
        <div>

            <h1>Admin Dashboard</h1>

            <BarChart
                width={500}
                height={300}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" />
            </BarChart>

            <div>
                <h3>
                    Users: {stats.totalUsers}
                </h3>

                <h3>
                    Tickets: {stats.totalTickets}
                </h3>

                <h3>
                    Revenue: ETB{" "}
                    {stats.totalRevenue}
                </h3>

                <h3>
                    Draws: {stats.totalDraws}
                </h3>

                <h3>
                    Winners: {stats.totalWinners}
                </h3>

                <h3>
                    Payouts: ETB{" "}
                    {stats.totalPayouts}
                </h3>
            </div>
        </div>
    );
}