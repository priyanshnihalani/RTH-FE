import { ArrowDown, ArrowRight, CalendarArrowDown, LucideCalendarArrowDown, LucideCalendarArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import calculateEndDate from "../../Services/CalculateEndDate";
import { PhoneAndroid } from "@mui/icons-material";

const StudentCard = ({ student }) => {
    const navigate = useNavigate()
    const { name, registration, phone, batch, batchId, user_id, trainerId, taskStats } = student;
    const handleViewAll = () => {
        navigate(`/trainer/tasks/${trainerId}/${batchId}/${user_id}`)
    }
    log(student)
    return (
        <div
            className="
    bg-white rounded-2xl p-6
    shadow-sm hover:shadow-lg
    transition-all duration-300
    border border-gray-100
  "
        >
            {/* Header */}
            <div className="mb-4">
                <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                    {name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    Batch:
                    <span className="ml-1 font-medium text-gray-700">
                        {batch}
                    </span>
                </p>
            </div>

            {/* Info Section */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-1">
                <div className="flex justify-between text-sm">
                    <div className="flex space-x-2 items-center text-gray-500">
                        <PhoneAndroid sx={{width: 18}} className="text-gray-500"/>
                        <span className="text-gray-500">Phone</span>
                    </div>
                    <span className="font-medium text-gray-700">
                        +91 {phone || "-"}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <div className="flex space-x-2 items-center text-gray-500">
                        <LucideCalendarArrowUp size={18} />
                        <span className="text-gray-500">Start Date</span>
                    </div>
                    <span className="font-medium text-gray-700">
                        {registration?.joinedDate || "-"}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <div className="flex space-x-2 items-center text-gray-500">
                        <LucideCalendarArrowDown size={18} />
                        <span className="text-gray-500">End Date</span>
                    </div>
                    <span className="font-medium text-gray-700">
                        {calculateEndDate(
                            registration?.joinedDate,
                            registration?.duration
                        )?.datepicker || "-"}
                    </span>
                </div>
            </div>

            {/* Status Section */}
            <div className="flex justify-between items-center mb-6">
                <Status
                    label="Assigned"
                    value={taskStats.ASSIGNED}
                    color="bg-blue-50 text-blue-600"
                />
                <Status
                    label="Pending"
                    value={taskStats.IN_PROGRESS}
                    color="bg-orange-50 text-orange-600"
                />
                <Status
                    label="Completed"
                    value={taskStats.COMPLETED}
                    color="bg-green-50 text-green-600"
                />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-4 flex justify-end">
                <button
                    className="
        flex items-center gap-2
        text-orange-500 font-medium text-sm
        hover:text-orange-600
        transition-all
        cursor-pointer
      "
                    onClick={handleViewAll}
                >
                    View Tasks
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>

    );
};

export default StudentCard;

const Status = ({ label, value, color }) => (
    <div className="flex flex-col items-center space-y-1">
        <span className="text-xs"> {label} </span>
        <div className={`flex w-10 h-10 items-center justify-center text-sm rounded-full font-semibold ${color}`}>
            <span>{value}</span>
        </div>
    </div>
);