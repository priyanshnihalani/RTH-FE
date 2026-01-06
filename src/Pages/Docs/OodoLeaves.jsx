const OodoLeaves = () => {
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
          Odoo Leave Management Guidelines
        </h2>

        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          Learn how to apply for leaves, track approvals, and follow
          company leave policies using Odoo.
        </p>
      </div>

      {/* ================= WHY ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Why Leave Requests Matter
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Ensures proper team planning and workload distribution",
            "Maintains transparency between employees and managers",
            "Required for payroll and attendance records",
            "Helps HR track leave balances accurately",
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

      {/* ================= HOW TO APPLY ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          How to Apply for Leave in Odoo
        </h3>

        <div className="bg-gray-50 rounded-2xl border p-5">
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
            <li>Login to the Odoo dashboard</li>
            <li>Open the <b>Time Off</b> or <b>Leaves</b> module</li>
            <li>Select the type of leave (Casual, Sick, Paid, etc.)</li>
            <li>Choose start and end dates</li>
            <li>Add a short and clear reason</li>
            <li>Submit the leave request</li>
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
              <li>Apply leave in advance whenever possible</li>
              <li>Check leave balance before applying</li>
              <li>Inform your manager for planned leaves</li>
            </ul>
          </div>

          {/* DONT */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h4 className="font-semibold text-red-700 mb-2">
              Don’t ❌
            </h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              <li>Apply leave after being absent</li>
              <li>Use incorrect leave types</li>
              <li>Submit leave without a reason</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= EXAMPLE ================= */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Example Leave Request
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
          <p><b>Leave Type:</b> Casual Leave</p>
          <p><b>From:</b> 15 Jan 2026</p>
          <p><b>To:</b> 16 Jan 2026</p>
          <p>
            <b>Reason:</b> Personal work / family commitment
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
        ⚠️ Leave requests must be approved by your manager before
        taking leave. Always check approval status in Odoo.
      </div>
    </div>
  );
};

export default OodoLeaves;
