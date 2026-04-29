import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { api } from "../services/api";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();

    const [message, setMessage] = useState(
        "Verifying payment..."
    );

    useEffect(() => {
        verifyPayment();
    }, []);

    const verifyPayment = async () => {
        try {
            const tx_ref = searchParams.get("tx_ref");

            if (!tx_ref) {
                setMessage("Missing transaction reference");
                return;
            }

            const res = await api.get(
                `/payment/verify?tx_ref=${tx_ref}`
            );

            setMessage(res.data.message);
        } catch (err: any) {
            console.log(err);

            setMessage("Payment verification failed");
        }
    };

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}