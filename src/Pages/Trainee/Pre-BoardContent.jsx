import VideoPlayer from "../../components/VideoPlayer";
import DocViewer from "../../components/DocViewer";

const PreBoardContent = ({ module }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow">
      <h2 className="text-xl font-bold text-gray-800">
        {module.title}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        {module.description}
      </p>

      <div className="mt-6 space-y-6">
        {module.video && <VideoPlayer url={module.video} />}
        {module.docs && <DocViewer docs={module.docs} />}
      </div>
    </div>
  );
};

export default PreBoardContent;
