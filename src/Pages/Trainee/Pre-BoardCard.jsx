import StatusBadge from "../../components/StatusBadge";

const PreBoardCard = ({ module, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-2xl p-4 shadow
        transition border
        ${active ? "border-orange-400 bg-orange-50" : "bg-white"}
      `}
    >
      <h3 className="font-semibold text-gray-800">
        {module.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {module.description}
      </p>

      <div className="mt-3">
        <StatusBadge status={module.status} />
      </div>
    </div>
  );
};

export default PreBoardCard;
