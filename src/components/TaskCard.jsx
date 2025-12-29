const TaskCard = ({ task, onAction }) => {

  const statusStyles = {
    ASSIGNED: "bg-gray-100 text-gray-600",
    IN_PROGRESS: "bg-orange-100 text-orange-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5
        shadow-[0_5px_10px_rgba(0,0,0,0.1)]
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]
        transition
      "
      draggable
    >
      {/* STATUS */}
      <span className={`
        text-[11px]
        px-2 py-1
        rounded-full
        ${statusStyles[task.status]}
      `}>
        {task.status.replace("_", " ")}
      </span>

      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 mt-3">
        {task.title}
      </h3>

      {/* DESC */}
      <p className="text-sm text-gray-500 mt-1">
        {task.description}
      </p>

      {/* META */}
      <div className="flex justify-between text-xs text-gray-400 mt-3">
        <span>{task.trainerName}</span>
        <span>{task.dueDate}</span>
      </div>

      {/* ACTION */}
      {task.status !== "COMPLETED" && (
        <button
          onClick={() => onAction(task)}
          className="
            w-full mt-4 py-2
            bg-orange-500 hover:bg-orange-600
            text-white
            rounded-xl
            transition
          "
        >
          {task.status === "ASSIGNED" ? "Start Task" : "Continue"}
        </button>
      )}

      {task.status === "COMPLETED" && (
        <button
          onClick={() => onAction(task, "IN_PROGRESS")}
          className="
            w-full mt-4 py-2
            bg-red-50 text-red-600
            rounded-xl
            hover:bg-red-100
            transition
          "
        >
          Send Back to In Progress
        </button>
      )}
    </div>
  );
};

export default TaskCard;
