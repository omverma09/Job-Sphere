import React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const GetCertified = () => {
  return (
    <div className="w-full bg-gray-100 py-16 px-6">

      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
        Get <span className="text-blue-600">Certified.</span>
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div className="space-y-8">

          <div className="flex gap-4">
            <WorkspacePremiumIcon className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-lg">Start today</h3>

              <p className="text-gray-600">
                You are just months away from cracking your dream company.
              </p>
            </div>

          </div>

          <div className="flex gap-4">
            <WorkspacePremiumIcon className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-lg">Believe in yourself</h3>

              <p className="text-gray-600">
                Coding is simple. You just need the right guidance.
                Consistency & hard work will help you become
                Internship/Placement ready for Tech companies.
              </p>
            </div>

          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold mt-4">
            Enroll Now →
          </button>
        </div>

        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0"
            alt="certificate"
            className="rounded-xl shadow-xl w-full max-w-md"
          />

        </div>

      </div>

    </div>
  );
};

export default GetCertified;