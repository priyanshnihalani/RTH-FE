import { Layers, Users, ArrowRight } from "lucide-react";

const BatchCard = ({ name, tech, students, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        bg-white
        rounded-2xl
        p-4 sm:p-5
        shadow
        hover:shadow-md
        transition
        cursor-pointer

        flex flex-col
        gap-4

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        <div
          className="
            w-10 h-10
            rounded-xl
            bg-orange-50
            flex items-center justify-center
            shrink-0
          "
        >
          <Layers size={20} className="text-orange-500" />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">
            {name}
          </h3>

          <p className="text-sm text-gray-500 truncate">
            Technology: <span className="font-medium">{tech}</span>
          </p>
        </div>
      </div>

      {/* RIGHT GROUP */}
      <div className="
        flex items-center justify-between
        sm:justify-end
        gap-6
        w-full
        sm:w-auto
      ">
        {/* STUDENTS */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Users size={14} />
          <span>{students} Students</span>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1 text-orange-500 font-medium  hover:translate-x-1 transition">
          <span className="hidden sm:inline text-sm">View Batch</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default BatchCard;
