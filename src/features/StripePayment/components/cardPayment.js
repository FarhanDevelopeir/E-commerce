import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../cardPayment.css";
import CheckoutForm from "./checkoutForm";
import { useSelector } from "react-redux";
import { allFetchedCartData, totalItemsInCart } from "../../cart/cartSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Ov2MdSALdH0VXIq1MFwMTHjqBJ0qy4R5fh2QynaFWPv4QyuYqAoe2nICOeusUBPZIQo7Vb4TaZdkrUzBLDVFhwZ00C8SQBsKr");

export default function CardPayment() {
  const [clientSecret, setClientSecret] = useState("");
  const Cart = useSelector(allFetchedCartData)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: Cart.bill }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}