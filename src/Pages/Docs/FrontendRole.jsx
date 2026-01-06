const FrontendRole = () => {
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
          Frontend Developer Role
        </h2>

        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          This document explains the responsibilities, skills, and expectations
          of a Frontend Developer in our organization.
        </p>
      </div>

      {/* ================= ROLE OVERVIEW ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Role Overview
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed">
          A Frontend Developer is responsible for building the user-facing part
          of web applications. This includes designing responsive layouts,
          implementing UI components, and ensuring smooth user interaction
          across devices and browsers.
        </p>
      </section>

      {/* ================= RESPONSIBILITIES ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Key Responsibilities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Develop responsive and user-friendly interfaces",
            "Convert designs into reusable UI components",
            "Integrate frontend with backend APIs",
            "Ensure cross-browser and device compatibility",
            "Optimize application performance",
            "Fix UI bugs and improve usability",
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
          <li>Strong knowledge of HTML, CSS, and JavaScript</li>
          <li>Experience with modern frameworks (React preferred)</li>
          <li>Understanding of component-based architecture</li>
          <li>Basic understanding of REST APIs</li>
          <li>Familiarity with Git and version control</li>
        </ul>
      </section>

      {/* ================= TOOLS & TECHNOLOGIES ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Tools & Technologies
        </h3>

        <div className="bg-gray-50 border rounded-2xl p-5">
          <p className="text-sm text-gray-700">
            <b>Frameworks:</b> React, Next.js <br />
            <b>Styling:</b> Tailwind CSS, CSS Modules <br />
            <b>Tools:</b> Git, VS Code, Postman <br />
            <b>APIs:</b> REST APIs, JSON
          </p>
        </div>
      </section>

      {/* ================= EXPECTATIONS ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Expectations from a Frontend Developer
        </h3>

        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Write clean, readable, and maintainable code</li>
          <li>Follow UI/UX and coding standards</li>
          <li>Collaborate with backend and design teams</li>
          <li>Meet deadlines and take ownership of tasks</li>
          <li>Continuously improve skills and code quality</li>
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
        ⚠️ This role requires attention to detail, consistency in UI, and
        a strong focus on user experience. Your work directly impacts how users
        perceive the product.
      </div>
    </div>
  );
};

export default FrontendRole;
