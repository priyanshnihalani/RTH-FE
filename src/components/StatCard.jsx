export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-3xl p-6
        bg-gradient-to-br from-white via-orange-50 to-orange-100/60
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        flex items-center justify-between
      "
    >
      {/* Accent Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl" />

      {/* Left Content */}
      <div className="relative z-10">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-[#FB8924] mt-2 tracking-tight">
          {value}
        </h3>
      </div>

      {/* Icon */}
      <div
        className="
          relative z-10
          p-4 rounded-2xl
          bg-[linear-gradient(135deg,#FB8924_0%,#FB8924_65%,#F97316_100%)]
          text-white
          shadow-md shadow-orange-300/40
        "
      >
        <Icon size={18} />
      </div>
    </div>
  );
}
