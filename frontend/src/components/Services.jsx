import { Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";

const data = [
  {
    title: "Jobs",
    icon: "💼",
    desc: "Full-time, part-time & remote jobs from verified recruiters.",
  },
  {
    title: "Internships",
    icon: "🎓",
    desc: "Paid internships for students and freshers across domains.",
  },
  {
    title: "Courses",
    icon: "📚",
    desc: "Industry-relevant courses to build job-ready skills.",
  },
  {
    title: "Company Preparation",
    icon: "🏢",
    desc: "Interview prep, aptitude & coding rounds for top companies.",
  },
];

const Services = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-800">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="mt-3 text-gray-600">
            Everything you need to get hired — at one place
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, index) => (
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
              <ServiceCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button variant="contained" size="large">
            Explore Now
          </Button>
        </div>

      </div>
    </section>
  );
};

const ServiceCard = ({ item }) => {
  return (
    <Card className="h-full rounded-xl shadow-md hover:shadow-xl transition">
      <CardContent className="text-center">
        <div className="text-5xl mb-4">{item.icon}</div>
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.desc}</p>
      </CardContent>
    </Card>
  );
};

export default Services;