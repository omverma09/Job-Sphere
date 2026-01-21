import { Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Create Account",
    desc: "Sign up as a student or fresher in seconds.",
    icon: "📝",
  },
  {
    title: "Explore Opportunities",
    desc: "Browse jobs, internships & remote work.",
    icon: "🔍",
  },
  {
    title: "Apply Easily",
    desc: "Apply with one click using your profile.",
    icon: "🚀",
  },
  {
    title: "Get Hired",
    desc: "Track applications and get hired faster.",
    icon: "🎉",
  },
];

const HowItWorks = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-800">
            How <span className="text-blue-600">JobPortal</span> Works
          </h1>
          <p className="mt-3 text-gray-600">
            Find jobs in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="h-full rounded-xl shadow hover:shadow-lg transition">
                <CardContent className="text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button variant="contained" size="large">
            Get Started
          </Button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;