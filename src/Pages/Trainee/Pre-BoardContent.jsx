import VideoPlayer from "../../components/VideoPlayer";
import DocViewer from "../../components/DocViewer";
import { Check, FileText, PlayCircle } from "lucide-react";

const PreBoardContent = ({
  module,
  videoProgress = {},
  onVideoProgress,
  setStatus,
}) => {
  /* ---------- EMPTY STATE ---------- */
  if (!module) {
    return (
      <div className="lg:col-span-2 bg-white rounded-3xl p-10 shadow flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Please select a module to start learning
        </p>
      </div>
    );
  }

  return (
    <div className="relative lg:col-span-2 bg-white rounded-3xl p-8 shadow space-y-6">
      {Object.keys(module).length == 0 ?
        <div className="flex justify-center items-center h-full text-2xl font-medium text-gray-500 underline">
          Please Select One Module
        </div>
        : <>
          {/* ================= HEADER ================= */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {module.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {module.description}
            </p>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="space-y-8">

            {/* ---------- VIDEO SECTION ---------- */}
            {module.videoId && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <PlayCircle size={18} />
                  <span>Video Lesson</span>
                </div>

                <VideoPlayer
                  videoId={module.videoId}
                  savedTime={videoProgress?.lastWatchedSecond || 0}
                  onProgress={(data) =>
                    onVideoProgress(module.id, data)
                  }
                />
              </section>
            )}

            {/* ---------- DOCUMENT SECTION ---------- */}
            {module.docs && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <FileText size={18} />
                  <span>Reading Material</span>
                </div>

                <DocViewer docs={module.docs} />
              </section>
            )}
          </div>

          {module.docs && (
            <div className="pt-6 absolute bottom-10 right-10 ">
              <button
                onClick={() =>
                  setStatus({ id: module.id, status: "COMPLETED" })
                }
                disabled={module.status === "COMPLETED"}
                className={`
              flex items-center gap-2
              px-6 py-3 rounded-xl font-semibold
              transition-all
              ${module.status === "COMPLETED"
                    ? "bg-green-100 border border-dashed text-green-700 cursor-not-allowed"
                    : "bg-orange-500 border border-dashed text-white hover:bg-orange-600"
                  }
            `}
              >
                <Check size={18} />
                {module.status === "COMPLETED"
                  ? "Completed"
                  : "Mark as Complete"}
              </button>
            </div>
          )}
        </>}
    </div>
  );
};

export default PreBoardContent;