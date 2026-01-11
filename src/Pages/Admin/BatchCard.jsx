import {
  Layers,
  PenIcon,
  Trash2,
  UserCheck,
  Users,
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
  setSelected,
  setIsDeleteOpen
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300
        overflow-hidden
        flex flex-col
      "
    >
      {/* ---------- IMAGE / ICON ---------- */}
      <div className="h-32 bg-orange-50 flex items-center justify-center">
        <div className="p-4 bg-orange-100 rounded-2xl text-orange-500">
          <Layers size={28} />
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="p-4 flex-1 space-y-2">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-gray-500">
          Technology:
          <span className="ml-1 font-medium text-gray-700">
            {technology}
          </span>
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <UserCheck size={14} className="text-orange-500" />
          <span className="truncate">
            {trainer?.map(item => item.name).join(', ') || "Not Assigned"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users size={14} />
          <span>{traineeCount} Trainees</span>
        </div>
      </div>

      {/* ---------- ACTIONS ---------- */}
      <div className="border-t px-4 py-3 flex justify-between">
        <button
          onClick={() => {
            setIsEditOpen(true);
            setSelected({
              id,
              technology,
              trainer,
            });
          }}
          className="
            flex items-center gap-1
            text-sm font-medium text-orange-500
            hover:underline
          "
        >
          <PenIcon size={14} />
          Edit
        </button>

        <button
          onClick={() => {
            setIsDeleteOpen(true);
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
            text-sm font-medium text-red-500
            hover:underline
          "
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}