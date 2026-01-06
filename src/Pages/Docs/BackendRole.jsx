const BackendRole = () => {
  return (
    <div
      className="
        bg-white/80 backdrop-blur-xl
        rounded-3xl
        p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        space-y-10
      "
    >
      {/* ================= HEADER ================= */}
      <div>
        <span className="text-sm font-medium text-orange-500">
          Pre-Board Training
        </span>

        <h2 className="text-3xl font-bold text-gray-800 mt-1">
          Backend Developer Role
        </h2>

        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          This document outlines the responsibilities, skills, and expectations
          of a Backend Developer in our organization.
        </p>
      </div>

      {/* ================= ROLE OVERVIEW ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Role Overview
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed">
          A Backend Developer is responsible for building and maintaining
          the server-side logic of applications. This includes managing APIs,
          databases, authentication, and ensuring system performance,
          scalability, and security.
        </p>
      </section>

      {/* ================= RESPONSIBILITIES ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Key Responsibilities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Design and develop RESTful APIs",
            "Implement business logic and validations",
            "Manage databases and data models",
            "Handle authentication and authorization",
            "Ensure application security and performance",
            "Fix bugs and optimize backend workflows",
          ].map((item, index) => (
            <div
              key={index}
              className="
                bg-orange-50
                border border-orange-100
                rounded-2xl
                p-4
                text-sm text-gray-700
              "
            >
              • {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= SKILLS REQUIRED ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Required Skills
        </h3>

        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Strong knowledge of JavaScript (Node.js)</li>
          <li>Experience with Express.js or similar frameworks</li>
          <li>Understanding of REST APIs and HTTP methods</li>
          <li>Experience with databases (MongoDB / SQL)</li>
          <li>Knowledge of authentication (JWT, sessions)</li>
          <li>Basic understanding of security best practices</li>
        </ul>
      </section>

      {/* ================= TOOLS & TECHNOLOGIES ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Tools & Technologies
        </h3>

        <div className="bg-gray-50 border rounded-2xl p-5">
          <p className="text-sm text-gray-700">
            <b>Runtime:</b> Node.js <br />
            <b>Frameworks:</b> Express.js <br />
            <b>Databases:</b> MongoDB, PostgreSQL <br />
            <b>Tools:</b> Git, Postman, Docker (basic) <br />
            <b>Security:</b> JWT, bcrypt
          </p>
        </div>
      </section>

      {/* ================= EXPECTATIONS ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Expectations from a Backend Developer
        </h3>

        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Write scalable and maintainable backend code</li>
          <li>Follow clean architecture and coding standards</li>
          <li>Ensure data integrity and security</li>
          <li>Collaborate closely with frontend developers</li>
          <li>Debug and resolve production issues efficiently</li>
        </ul>
      </section>

      {/* ================= NOTE ================= */}
      <div
        className="
          bg-orange-50
          border border-orange-200
          rounded-2xl
          p-4
          text-sm text-orange-700
        "
      >
        ⚠️ Backend systems power the entire application. Any mistake in logic,
        security, or data handling can directly impact system reliability and
        user trust.
      </div>
    </div>
  );
};

export default BackendRole;
