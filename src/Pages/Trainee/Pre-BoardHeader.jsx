import ProgressBar from "./ProgressBar";
import { BookOpen } from "lucide-react";

const PreBoardHeader = ({ progress = 0 }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow space-y-4">
      
      {/* ================= TITLE ================= */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-800">
            <BookOpen size={22} className="text-orange-500" />
            <h1 className="text-2xl font-bold">
              Pre-Board Learning
            </h1>
          </div>

          <p className="text-sm text-gray-500 mt-2 max-w-xl">
            Complete these modules to understand company workflows,
            tools, and expectations before joining the team.
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Overall Progress
          </p>
          <p className="text-2xl font-bold text-orange-500">
            {progress}%
          </p>
        </div>
      </div>

      <div>
        <ProgressBar value={progress} />
      </div>
    </div>
  );
};

export default PreBoardHeader;
