import { Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <section className="bg-gray-50 min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            About <span className="text-blue-600">JobPortal</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            JobPortal connects students, freshers, and professionals with
            meaningful job and internship opportunities across India.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why JobPortal?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We focus on helping candidates find the right opportunities —
              whether it's a full-time role, part-time job, internship, or
              remote work.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Recruiters can easily post jobs, manage applications, and hire
              faster using our simple dashboard.
            </p>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Feature title="Verified Jobs" desc="Quality-checked job postings" />
            <Feature title="Remote & WFH" desc="Flexible work opportunities" />
            <Feature title="Fresher Friendly" desc="Perfect for beginners" />
            <Feature title="Recruiter Tools" desc="Simple hiring process" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ title, desc }) => (
  <Card className="shadow-md">
    <CardContent>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </CardContent>
  </Card>
);

export default About;
