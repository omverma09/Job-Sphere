import stripe from "../config/stripe.js";
import Course from "../model/course.model.js";
import Enrollment from "../model/enrollment.model.js";

export const createCheckoutSession = async (req, res) => {
    try {

        const { courseId } = req.body;
        const userId = req.user.id;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // prevent duplicate purchase
        const alreadyPurchased = await Enrollment.findOne({
            user: userId,
            course: courseId
        });

        if (alreadyPurchased) {
            return res.status(400).json({ message: "Course already purchased" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: course.title
                        },
                        unit_amount: course.price * 100
                    },
                    quantity: 1
                }
            ],

            mode: "payment",

            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,

            metadata: {
                courseId: courseId,
                userId: userId
            }
        });

        res.json({
            url: session.url
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};