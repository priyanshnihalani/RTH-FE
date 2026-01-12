import { Edit, Check, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import formatToMonthYear from "../Services/FormatToMonthYear";
import { useLocation } from "react-router-dom";

const TaskCard = ({ task, onEdit, onOpen}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const statusStyles = {
    ASSIGNED: "bg-gray-100 text-gray-600",
    IN_PROGRESS: "bg-orange-100 text-orange-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  const location = useLocation();

  const handleDragStart = (e) => {
    if (isEditing) return;
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleSave = () => {
    onEdit?.({
      ...task,
      title,
      description,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={handleDragStart}
      // onClick={() => !isEditing && onOpen?.(task)}
      className="
        bg-white
        rounded-2xl
        p-5
        pb-3
        cursor-pointer
        shadow-[0_5px_10px_rgba(0,0,0,0.1)]
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]
        transition
      "
    >
      <div className="flex justify-between">
        <div
          className={`
            text-[11px]
            p-2 underline font-medium
            rounded-full
            ${statusStyles[task.status]}
          `}
        >
          {task.status.replace("_", " ")}
        </div>

        {location.pathname.split("/").includes("trainer") && (
          <div className="space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  className="bg-green-600 text-white rounded-full p-2"
                >
                  <Check size={18} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel();
                  }}
                  className="bg-gray-400 text-white rounded-full p-2"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="bg-green-600/60 hover:bg-green-600 text-white rounded-full p-2"
              >
                <Edit size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3 w-full border rounded-lg px-2 py-1 text-sm"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full border rounded-lg px-2 py-1 text-sm"
            rows={2}
          />
        </>
      ) : (
        <>
          <h3 className="font-semibold text-gray-800 mt-3">{task.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
        </>
      )}

      <div className="flex justify-between items-center text-xs text-gray-400 mt-3">
        <span>{task.trainerName}</span>
        <span>{task.dueDate}</span>
      </div>

      <div className="flex justify-end items-center text-xs font-medium text-gray-500 border-t border-dashed pt-2 mt-2">
        {/* <div className="flex items-center gap-1">
          <MessageCircle size={14} />
          <span>{task.messageCount || 0}</span>
        </div> */}

        <span>{formatToMonthYear(task.createdAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;