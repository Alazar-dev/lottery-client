import { useEffect, useState } from "react";

import { api } from "../services/api";

export default function MyTickets() {
    const [tickets, setTickets] = useState<any[]>([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        const res = await api.get("/ticket/my");

        setTickets(res.data);
    };

    return (
        <div>
            <h1>My Tickets</h1>

            {tickets.map((ticket) => (
                <div key={ticket._id}>
                    <p>{ticket.number}</p>
                    <p>{ticket.drawWeek}</p>
                </div>
            ))}
        </div>
    );
}