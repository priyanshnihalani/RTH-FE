import StatCard from "./StatCard";
import BatchCard from "./BatchCard";
import BatchSkeleton from "./BatchSkeleton";
import { useEffect, useState } from "react";
import { ApiService } from "../../Services/ApiService";
import { useNavigate, useOutletContext } from "react-router-dom";

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
            <div className="px-8 pt-6 space-y-10">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Trainer Dashboard
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Manage your batches, students and tasks
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard label="Batches" value={batches.length} type="batches" />
                    <StatCard label="Students" value={batches.reduce((acc, cur) => acc + cur?.Trainees?.length, 0)} type="students" />
                    <StatCard label="Pending Tasks" value={statusCount?.IN_PROGRESS || 0} type="pending" />
                    <StatCard label="Completed Tasks" value={statusCount?.COMPLETED || 0} type="completed" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Assigned Batches */}
                    <div className="bg-white rounded-3xl shadow p-6 space-y-4">
                        <h2 className="text-lg font-semibold">Assigned Batches</h2>

                        {batches.length > 0 ? (
                            <div className="space-y-3">
                                {batches.map(batch => (
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
                            <div className="text-gray-500 text-sm py-6 text-center">
                                No batches assigned yet.
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-3xl shadow p-6 space-y-4">
                        <h2 className="text-lg font-semibold">Recent Tasks</h2>

                        {batches.some(b => b.Tasks?.length) ? (
                            <div className="space-y-3">
                                {batches
                                    .flatMap(b => b.Tasks.map(t => ({ ...t, batch: b.name })))
                                    .slice(0, 5)
                                    .map(task => (
                                        <div
                                            key={task.id}
                                            className="flex items-center justify-between p-3 rounded-xl shadow hover:shadow-sm transition"
                                        >
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-gray-500 line-clamp-1">
                                                    {task.description}
                                                </p>
                                            </div>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${task.status === "COMPLETED"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-orange-100 text-orange-700"
                                                    }`}
                                            >
                                                {task.status === "COMPLETED" ? "Completed" : task.status === "IN_PROGRESS" ? "In Progress" : "Assigned"}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm py-6 text-center">
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