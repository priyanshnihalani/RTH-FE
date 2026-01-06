import VideoPlayer from "../../components/VideoPlayer";
import DocViewer from "../../components/DocViewer";
import { Check } from "lucide-react";

const PreBoardContent = ({
  module,
  videoProgress = {},
  onVideoProgress,
  setStatus
}) => {
  return (
    <div className="relative lg:col-span-2 bg-white rounded-3xl p-6 shadow">
      <h2 className="text-xl font-bold text-gray-800">
        {module.title}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        {module.description}
      </p>

      <div className="mt-6 space-y-6">
        {module.videoId && (
          <VideoPlayer
            videoId={module.videoId}
            savedTime={videoProgress?.lastWatchedSecond || 0}
            onProgress={(data) =>
              onVideoProgress(module.id, data)
            }
          />
        )}

        {module.docs && <DocViewer docs={module.docs} />}
        {module.docs && <button
        onClick={() => setStatus({...module, status: "COMPLETED"})}
         className="cursor-pointer focus:outline-none absolute bottom-10 right-10 font-black flex space-x-2">
          <Check />
          <span>Mark As Complete</span>
        </button>}
      </div>
    </div>
  );
};

export default PreBoardContent;
