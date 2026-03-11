import stripe from "../config/stripe.js";
import Enrollment from "../model/enrollment.model.js";

export const stripeWebhook = async (req, res) => {
    let event;

    try {

        const sig = req.headers["stripe-signature"];

        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (err) {
        console.log("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle Event
    if (event.type === "checkout.session.completed") {

        const session = event.data.object;

        const userId = session.metadata.userId;
        const courseId = session.metadata.courseId;

        const paymentIntent = session.payment_intent;
        const amount = session.amount_total;

        try {

            // Prevent duplicate enrollment
            const alreadyEnrolled = await Enrollment.findOne({
                user: userId,
                course: courseId
            });

            if (!alreadyEnrolled) {

                await Enrollment.create({
                    user: userId,
                    course: courseId,
                    paymentId: paymentIntent,
                    orderId: session.id,
                    amount: amount / 100
                });

                console.log("Enrollment created successfully");
            }

        } catch (error) {
            console.log("Enrollment creation failed:", error.message);
        }
    }

    res.json({ received: true });
};