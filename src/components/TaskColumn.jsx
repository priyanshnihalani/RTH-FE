import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskDetailCard from "./TaskDetailCard";
const TaskColumn = ({ title, status, tasks, onAction, onEdit }) => {
  const [activeTask, setActiveTask] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedTask = JSON.parse(
      e.dataTransfer.getData("task")
    );

    if (droppedTask.status !== status) {
      onAction(droppedTask, status);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="
        relative
        pl-6
        md:pl-8
        border-l-2
        border-dashed
        border-gray-200
        first:border-none
        min-h-50
      "
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-800">
          {title}
        </h2>

        <span className="
          text-xs
          px-2 py-1
          rounded-full
          bg-orange-100 text-orange-700
        ">
          {tasks.length}
        </span>
      </div>

      {/* TASKS */}
      <div className="space-y-5">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onOpen={setActiveTask}
          />
        ))}
        {
          activeTask &&
          <TaskDetailCard task={activeTask}  onClose={() => setActiveTask(null)}/>
        }
      </div>
    </div>
  );
};

export default TaskColumn;
