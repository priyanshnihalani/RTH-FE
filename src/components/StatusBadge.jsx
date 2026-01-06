const STATUS_CONFIG = {
  NOT_STARTED: {
    label: "Not Started",
    className: "bg-gray-100 text-gray-600"
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-orange-100 text-orange-600"
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-green-100 text-green-600"
  }
};

const StatusBadge = ({ status = "NOT_STARTED" }) => {
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
