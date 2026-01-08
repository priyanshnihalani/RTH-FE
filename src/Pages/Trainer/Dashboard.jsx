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
                <div className="space-y-4 bg-white p-6 rounded-4xl shadow-[0_10px_10px_rgba(0,0,0,0.08)]">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Assigned Batches
                    </h2>

                    <div>
                        {batches.length > 0 ? <div className="grid xl:grid-cols-2 gap-2">
                            {batches.map(batch => (
                                <BatchCard
                                    key={batch?.id}
                                    name={batch?.name}
                                    tech={batch?.technology}
                                    students={batch?.Trainees?.length}
                                    onClick={() => navigate(`/trainer/batches/${batch.id}/${Date.now()}`)}
                                />
                            ))}
                        </div>
                            :
                            <div className="flex items-center text-gray-500 justify-center text-2xl min-h-[50vh]">
                                No Batches Are Assigned To You.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;