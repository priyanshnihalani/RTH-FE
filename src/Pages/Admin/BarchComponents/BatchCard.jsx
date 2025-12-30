import {
  Calendar,
  Layers,
  PenIcon,
  UserCheck,
  Users
} from "lucide-react";

export default function BatchCard({
  id,
  name,
  technology,
  startDate,
  endDate,
  trainer,
  traineeCount,
  setIsEditOpen,
  setSelected
}) {
  return (
    <div
      className="
        bg-white/70 backdrop-blur-xl
        rounded-3xl p-5
        border border-white/40
        shadow-[0_12px_30px_rgba(0,0,0,0.08)]
        hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)]
        transition
        flex justify-between items-center
      "
    >
      {/* -------- LEFT INFO -------- */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <span className="p-2 bg-orange-100 rounded-xl text-orange-500">
            <Layers size={16} />
          </span>
          {name}
        </h3>

        <p className="text-sm text-gray-500">
          Technology:
          <span className="ml-1 font-medium text-gray-700">
            {technology}
          </span>
        </p>

        {/* Trainer + Trainees */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <UserCheck size={14} className="text-orange-500" />
            <span>{trainer || "Not Assigned"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{traineeCount} Trainees</span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={14} />
          {startDate || "No Fixed Start Date"} → {endDate || "No Fixed End Date"}
        </div>
      </div>

      {/* -------- ACTIONS -------- */}
      <button
        onClick={() => {
          setIsEditOpen(true);
          setSelected({
            id,
            name,
            technology,
            startDate,
            endDate,
            trainer,
            traineeCount
          });
        }}
        className="
          flex items-center gap-1
          text-sm font-medium
          text-orange-500
          hover:underline
        "
      >
        <PenIcon size={14} />
        Edit
      </button>
    </div>
  );
}