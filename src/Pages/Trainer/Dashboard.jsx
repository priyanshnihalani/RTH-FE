import StatCard from "../../components/StatCard";
import BatchCard from "./BatchCard";
import BatchSkeleton from "./BatchSkeleton";
import { useEffect, useState } from "react";
import { ApiService } from "../../Services/ApiService";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Layers, Users, Clock, CheckCircle } from "lucide-react";
const Dashboard = () => {
    const [batches, setBatches] = useState([])
    const { trainerId } = useOutletContext()
    const navigate = useNavigate();
    const [statusCount, setStatusCount] = useState(null)

    const loadData = async () => {
        if (!trainerId) return
        const res = await ApiService.post("/api/trainer/getTrainersBatches", { trainerId })
        setBatches(res)
        const statusCount = res.reduce((acc, batch) => {
            batch.Tasks.forEach((tasks) => {
                acc[tasks.status] = (acc[tasks.status] || 0) + 1;
            });

            return acc;
        }, {});

        setStatusCount(statusCount)
    }

    useEffect(() => {
        loadData()
    }, [trainerId])

    return (
        <>
            <div className="p-8 space-y-10 bg-linear-to-br min-h-screen">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Trainer Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Manage your batches, students and tasks
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Batches" value={batches.length} icon={Layers} />
                    <StatCard
                        title="Students"
                        value={batches.reduce((acc, cur) => acc + cur?.Trainees?.length, 0)}
                        icon={Users}
                    />
                    <StatCard
                        title="Pending Tasks"
                        value={statusCount?.IN_PROGRESS || 0}
                        icon={Clock}
                    />
                    <StatCard
                        title="Completed Tasks"
                        value={statusCount?.COMPLETED || 0}
                        icon={CheckCircle}
                    />
                </div>

                {/* Panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Assigned Batches */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-slate-800">
                                Assigned Batches
                            </h2>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-medium">
                                {batches.length}
                            </span>
                        </div>

                        {batches.length > 0 ? (
                            <div className="space-y-3">
                                {batches.map((batch) => (
                                    <BatchCard
                                        key={batch.id}
                                        name={batch.name}
                                        tech={batch.technology}
                                        students={batch.Trainees?.length}
                                        onClick={() =>
                                            navigate(`/trainer/batches/${batch.id}/${Date.now()}`)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-slate-400 text-sm py-8 text-center">
                                No batches assigned yet.
                            </div>
                        )}
                    </div>

                    {/* Recent Tasks */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-slate-800">
                                Recent Tasks
                            </h2>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-medium">
                                Last 5
                            </span>
                        </div>

                        {batches.some((b) => b.Tasks?.length) ? (
                            <div className="space-y-2.5">
                                {batches
                                    .flatMap((b) => b.Tasks.map((t) => ({ ...t, batch: b.name })))
                                    .slice(0, 5)
                                    .map((task) => (
                                        <div
                                            key={task.id}
                                            className="
                    flex items-center justify-between
                    p-3 rounded-xl
                    border border-slate-100
                    hover:bg-slate-50 transition
                  "
                                        >
                                            <div className="space-y-0.5 pr-4">
                                                <p className="text-sm font-medium text-slate-800">
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-slate-500 line-clamp-1">
                                                    {task.description}
                                                </p>
                                            </div>

                                            <span
                                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${task.status === "COMPLETED"
                                                        ? "bg-green-50 text-green-700"
                                                        : task.status === "IN_PROGRESS"
                                                            ? "bg-blue-50 text-blue-700"
                                                            : "bg-orange-50 text-orange-700"
                                                    }`}
                                            >
                                                {task.status === "COMPLETED"
                                                    ? "Completed"
                                                    : task.status === "IN_PROGRESS"
                                                        ? "In Progress"
                                                        : "Assigned"}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="text-slate-400 text-sm py-8 text-center">
                                No tasks assigned yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;