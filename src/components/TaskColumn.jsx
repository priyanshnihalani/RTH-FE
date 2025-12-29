import TaskCard from "./TaskCard";

const TaskColumn = ({ title, count, tasks, onAction }) => {
  return (
    <div className="
      relative
      pl-6
      md:pl-8
      border-l-2
      border-dashed
      border-gray-200
      first:border-none
    ">
      {/* COLUMN HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-800">{title}</h2>

        <span className="
          text-xs
          px-2 py-1
          rounded-full
          bg-orange-100 text-orange-700
        ">
          {count}
        </span>
      </div>

      {/* TASKS */}
      <div className="space-y-5">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onAction={onAction}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
