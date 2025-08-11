const dotenv = require("dotenv")
dotenv.config()

const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // use stable version
});

const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty or invalid" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            description: item.customizedIngredients
              ? `Custom: ${item.customizedIngredients.join(", ")}`
              : undefined,
          },
          unit_amount: Math.round(
            (item.customizedPrice || item.price) * 100
          ),
        },
        quantity: item.quantity,
      })),
      success_url:
        (process.env.FRONTEND_URL || "http://localhost:3000") + "/success",
      cancel_url:
        (process.env.FRONTEND_URL || "http://localhost:3000") + "/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createCheckoutSession };
