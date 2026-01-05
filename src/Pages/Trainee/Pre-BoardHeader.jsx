import ProgressBar from "./ProgressBar";

const PreBoardHeader = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">
      <h1 className="text-2xl font-bold text-gray-800">
        Pre-Board Learning
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Complete these modules before joining the team
      </p>

      <div className="mt-4">
        <ProgressBar value={70} />
      </div>
    </div>
  );
};

export default PreBoardHeader;
