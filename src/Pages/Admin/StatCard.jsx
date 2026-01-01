export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex items-center justify-between">
      
      {/* Left Content */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-[#FB8924] mt-2">
          {value}
        </h3>
      </div>

      {/* Icon */}
      <div className="p-3 rounded-xl bg-[#FB8924]/10 text-[#FB8924]">
        <Icon size={28} />
      </div>
    </div>
  );
}
