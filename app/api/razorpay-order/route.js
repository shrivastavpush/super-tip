// app/api/razorpay-order/route.js

import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 50000, // Amount in paise (₹500)
      currency: "INR",
      receipt: "order_receipt_123",
      payment_capture: 1, // Automatically capture payment
    };

    // Create Razorpay order
    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify(order), { status: 200 }); // Return the order details to the client
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(JSON.stringify({ error: "Error creating order" }), { status: 500 });
  }
}
