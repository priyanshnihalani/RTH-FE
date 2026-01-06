const OodoTimeSheet = () => {
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
          Odoo Timesheet Guidelines
        </h2>

        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          Learn how to log your daily work correctly in Odoo and
          understand what the company expects from your timesheet entries.
        </p>
      </div>

      {/* ================= WHY ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Why Timesheets Matter
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Track daily work and productivity",
            "Helps managers understand task progress",
            "Required for billing, audits, and reports",
            "Mandatory for all team members",
          ].map((item, index) => (
            <div
              key={index}
              className="
                flex items-start gap-3
                bg-orange-50
                border border-orange-100
                rounded-2xl
                p-4
                text-sm text-gray-700
              "
            >
              <span className="text-orange-500 font-bold">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW TO FILL ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          How to Fill Timesheet in Odoo
        </h3>

        <div className="bg-gray-50 rounded-2xl border p-5">
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
            <li>Login to the Odoo dashboard</li>
            <li>Open the <b>Timesheets</b> module</li>
            <li>Select the correct project and task</li>
            <li>Enter time spent (in hours)</li>
            <li>Add a clear and meaningful description</li>
            <li>Save the entry</li>
          </ol>
        </div>
      </section>

      {/* ================= DO & DONT ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Do’s & Don’ts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h4 className="font-semibold text-green-700 mb-2">
              Do ✅
            </h4>
            <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
              <li>Fill timesheet daily</li>
              <li>Use meaningful descriptions</li>
              <li>Select the correct project & task</li>
            </ul>
          </div>

          {/* DONT */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h4 className="font-semibold text-red-700 mb-2">
              Don’t ❌
            </h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              <li>Leave timesheets empty</li>
              <li>Write vague descriptions</li>
              <li>Log incorrect hours</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= EXAMPLE ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Example Timesheet Entry
        </h3>

        <div
          className="
            bg-white
            border
            rounded-2xl
            p-5
            shadow-sm
            text-sm text-gray-700
            space-y-1
          "
        >
          <p><b>Project:</b> Training Platform</p>
          <p><b>Task:</b> Pre-board video integration</p>
          <p><b>Hours:</b> 3.5</p>
          <p>
            <b>Description:</b> Implemented video progress tracking
            using YouTube IFrame API and backend sync.
          </p>
        </div>
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
        ⚠️ Filling timesheets correctly is part of your professional
        responsibility and is reviewed regularly by managers.
      </div>
    </div>
  );
};

export default OodoTimeSheet;
