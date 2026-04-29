import { api } from "../services/api";

export default function BuyTicket() {
    const buyTicket = async () => {
        try {
            const res = await api.post(
                "/payment/initiate"
            );

            window.location.href =
                res.data.checkout_url;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Buy Ticket</h1>

            <button onClick={buyTicket}>
                Buy Ticket - 10 ETB
            </button>
        </div>
    );
}