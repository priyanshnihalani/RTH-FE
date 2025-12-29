export default function RegistrationRow({
  name,
  phone,
  email,
  status,
  showHeader = false
}) {
  const isPending = status === "pending";

  return (
    <div className="space-y-2">
      {/* Headings */}
      {showHeader && (
        <div
          className="grid grid-cols-5 gap-4 px-4 py-2
                     text-xs font-semibold text-gray-500 uppercase
                     border-b border-gray-200"
        >
          <span>Name</span>
          <span>Phone</span>
          <span>Email</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
      )}

      {/* Row */}
      <div
        className="
          grid grid-cols-5 gap-4 items-center
          bg-white rounded-xl px-4 py-4
          border border-gray-200
          hover:border-[#FB8924]/50 hover:shadow-md
          transition
        "
      >
        {/* Name */}
        <p className="font-medium text-gray-800 border-r border-gray-100 pr-4">
          {name}
        </p>

        {/* Phone */}
        <p className="text-sm text-gray-600 border-r border-gray-100 pr-4">
          {phone}
        </p>

        {/* Email */}
        <p className="text-sm text-gray-600 truncate border-r border-gray-100 pr-4">
          {email}
        </p>

        {/* Status */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium w-fit
            border
            ${
              isPending
                ? "bg-[#FBBB17]/20 text-[#FB8924] border-[#FB8924]/40"
                : "bg-green-50 text-green-600 border-green-200"
            }`}
        >
          {isPending ? "Pending" : "Approved"}
        </span>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {isPending ? (
            <>
              <button className="text-sm font-medium text-green-600 hover:underline">
                Approve
              </button>
              <button className="text-sm font-medium text-red-500 hover:underline">
                Reject
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-400">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
