import { Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const sections = [
  {
    title: "General Information",
    content:
      "The information provided on JobPortal is for general informational purposes only. While we strive to keep job listings accurate, we make no guarantees about completeness or reliability.",
  },
  {
    title: "No Employment Guarantee",
    content:
      "JobPortal does not guarantee job placement or internship offers. Hiring decisions are solely made by recruiters or employers.",
  },
  {
    title: "Third-Party Responsibility",
    content:
      "We are not responsible for the actions, content, or practices of third-party recruiters, companies, or external links.",
  },
  {
    title: "User Responsibility",
    content:
      "Users are advised to verify job details independently before applying. JobPortal is not liable for any loss or damage arising from job applications.",
  }
];

const Disclaimer = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800">
            Disclaimer
          </h1>
          <p className="mt-3 text-gray-600">
            Please read this disclaimer carefully before using our platform
          </p>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((item, index) => (
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
              <Card className="rounded-xl shadow-sm">
                <CardContent>
                  <h2 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Disclaimer;