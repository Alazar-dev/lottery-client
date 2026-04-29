import { useState } from "react";

import { api } from "../services/api";

export default function BuyTicket() {
    const [message, setMessage] = useState("");

    const buyTicket = async () => {
        try {
            const res = await api.post("/tickets");

            setMessage(`Ticket Number: ${res.data.ticket.number}`);
        } catch (err: any) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div>
            <h1>Buy Ticket</h1>

            <button onClick={buyTicket}>
                Buy Ticket (10 ETB)
            </button>

            <p>{message}</p>
        </div>
    );
}