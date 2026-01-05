const STATUS_CONFIG = {
  not_started: {
    label: "Not Started",
    className: "bg-gray-100 text-gray-600"
  },
  in_progress: {
    label: "In Progress",
    className: "bg-orange-100 text-orange-600"
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-600"
  }
};

const StatusBadge = ({ status = "not_started" }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_started;

  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        rounded-full
        text-xs font-medium
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
