import StatusBadge from "../../components/StatusBadge";
import { ChevronRight } from "lucide-react";

const PreBoardCard = ({ module, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`
        group cursor-pointer
        rounded-2xl p-5
        border transition-all
        shadow-sm hover:shadow-md
        focus:outline-none

        ${
          active
            ? "border-orange-400 bg-orange-50"
            : "border-gray-200 bg-white hover:border-orange-300"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-gray-800 leading-snug">
          {module.title}
        </h3>

        <ChevronRight
          size={18}
          className={`
            text-gray-300 transition-transform
            ${
              active
                ? "text-orange-500 translate-x-1"
                : "group-hover:text-orange-400 group-hover:translate-x-1"
            }
          `}
        />
      </div>

      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {module.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <StatusBadge status={module.status} />

        {active && (
          <span className="text-xs font-medium text-orange-500">
            Currently Viewing
          </span>
        )}
      </div>
    </div>
  );
};

export default PreBoardCard;
