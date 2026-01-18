import { Edit, Check, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import formatToMonthYear from "../Services/FormatToMonthYear";
import { useLocation } from "react-router-dom";

const TaskCard = ({ task, onEdit, onOpen }) => {
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
      className="
    bg-white
    rounded-xl
    p-4
    cursor-pointer
    border border-slate-100
    shadow-sm
    hover:shadow-md
    transition
  "
    >
      <div className="flex justify-between items-start">
        <div
          className={`
        text-[10px]
        px-2 py-0.5
        font-medium
        rounded-full
        ${statusStyles[task.status]}
      `}
        >
          {task.status.replace("_", " ")}
        </div>

        {location.pathname.split("/").includes("trainer") && (
          <div className="space-x-1">
            {isEditing ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  className="bg-green-500 cursor-pointer text-white rounded-full p-1.5 hover:bg-green-600"
                >
                  <Check size={14} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel();
                  }}
                  className="bg-slate-300 cursor-pointer text-white rounded-full p-1.5 hover:bg-slate-400"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="bg-slate-100 cursor-pointer hover:bg-slate-200 text-slate-600 rounded-full p-1.5"
              >
                <Edit size={14} />
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
            className="mt-3 w-full border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
            rows={2}
          />
        </>
      ) : (
        <>
          <h3 className="font-medium text-slate-800 mt-3 leading-snug">
            {task.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {task.description}
          </p>
        </>
      )}

      <div className="flex justify-between items-center text-[11px] text-slate-400 mt-3">
        <span>{task.trainerName}</span>
        <span>{task.dueDate}</span>
      </div>

      <div className="flex justify-end items-center text-[11px] font-medium text-slate-400 border-t-2 border-dashed border-slate-300 pt-2 mt-2">
        <span>{formatToMonthYear(task.createdAt)}</span>
      </div>
    </div>
  );
};

export default TaskCard;