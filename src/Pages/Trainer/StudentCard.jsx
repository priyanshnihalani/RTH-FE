import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
    const navigate = useNavigate()
    const { name, MyTasks, batch, batchId, user_id, trainerId, taskStats } = student;
    const handleViewAll = () => {
        navigate(`/trainer/tasks/${trainerId}/${batchId}/${user_id}`)
    }

    return (
        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-md transition">

            <h3 className="font-semibold text-gray-800 text-lg">
                {name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
                Batch: <span className="font-medium">{batch}</span>
            </p>

            <div className="flex justify-between items-center text-lg mb-4">
                <Status label="Assigned" value={taskStats.ASSIGNED} color="bg-blue-100 text-blue-600" />
                <Status label="Pending" value={taskStats.IN_PROGRESS} color="bg-orange-100 text-orange-600" />
                <Status label="Completed" value={taskStats.COMPLETED} color="bg-green-100 text-green-600" />
            </div>

            <button className="flex items-center cursor-pointer gap-2 text-orange-500 font-medium hover:translate-x-1 transition text-sm" onClick={handleViewAll}>
                View Tasks <ArrowRight size={16} />
            </button>
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