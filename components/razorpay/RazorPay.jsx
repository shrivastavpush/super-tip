"use client";
import Script from "next/script";

export default function RazorPay() {
  const handlePayment = async () => {
    const res = await fetch("/api/razorpay-order", {
      method: "POST",
    });
    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Test Corp",
      description: "Razorpay Test Payment",
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful! 🎉");
        console.log(response);
      },
      prefill: {
        name: "Kaval Dev",
        email: "kaval@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1>Test Razorpay Payment</h1>
      <button onClick={handlePayment}>Pay ₹500</button>
    </>
  );
}
