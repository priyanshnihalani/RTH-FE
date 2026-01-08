import formatToMonthYear from "../Services/FormatToMonthYear";

const TaskCard = ({ task }) => {

  const statusStyles = {
    ASSIGNED: "bg-gray-100 text-gray-600",
    IN_PROGRESS: "bg-orange-100 text-orange-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="
        bg-white
        rounded-2xl
        p-5
        pb-3
        cursor-grab
        shadow-[0_5px_10px_rgba(0,0,0,0.1)]
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]
        transition
      "
    >
      <span
        className={`
          text-[11px]
          px-2 py-1
          rounded-full
          ${statusStyles[task.status]}
        `}
      >
        {task.status.replace("_", " ")}
      </span>

      <h3 className="font-semibold text-gray-800 mt-3">
        {task.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {task.description}
      </p>

      <div className="flex justify-between text-xs text-gray-400 mt-3">
        <span>{task.trainerName}</span>
        <span>{task.dueDate}</span>
      </div>

      <div className="flex text-xs font-medium text-gray-500 border-t border-dashed items-baseline pt-2 justify-end">
        {formatToMonthYear(task.createdAt)}
      </div>
    </div>
  );
};

export default TaskCard;
