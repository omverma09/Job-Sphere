import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const LoggedInHome = () => {
    const {user} = useAuth();
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Greeting Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {user ? `Hi, ${user.name}👋` : "Hi, Om! 👋"}
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Let’s help you land your dream career
        </p>
      </motion.section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          Trending on JobPortal 🔥
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TrendingCard
            title="Full Stack Development"
            subtitle="Placement Course with AI"
            color="from-purple-600 to-indigo-600"
            btn="Apply now"
          />
          <TrendingCard
            title="Unleash your true potential!"
            subtitle="Certification courses"
            color="from-blue-600 to-cyan-600"
            btn="Know more"
          />
          <TrendingCard
            title="India’s Largest Scholarship Test"
            subtitle="Study Abroad"
            color="from-emerald-500 to-teal-500"
            btn="Register Free"
          />
        </div>
      </section>
    </div>
  );
};

const TrendingCard = ({ title, subtitle, color, btn }) => (
  <motion.div
    initial={{ opacity: 0, y: 120 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.04 }}
    className={`rounded-2xl p-6 text-white bg-gradient-to-br ${color} shadow-lg cursor-pointer`}
  >
    <p className="text-sm opacity-90">{subtitle}</p>
    <h3 className="text-xl font-bold mt-2">{title}</h3>

    <button className="mt-6 bg-white text-gray-800 px-5 py-2 rounded-full font-medium hover:bg-gray-100 transition">
      {btn}
    </button>
  </motion.div>
);

export default LoggedInHome;