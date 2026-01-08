import { useEffect, useState } from "react";
import { ApiService } from "../../Services/ApiService";
import { useOutletContext, useParams } from "react-router-dom"
import StudentCard from "./StudentCard";
import StudentCardSkeleton from "./StudentCardSkeleton";
import useSkeletonCount from "./useSkeletonCount";

const Students = () => {
    const { gridRef, count } = useSkeletonCount()
    const params = useParams()
    const [students, setStudents] = useState([]);
    const { trainerId } = useOutletContext()
    const countTaskStatus = (assignedTasks = []) => {
        return assignedTasks.reduce(
            (acc, task) => {
                acc[task.status] = (acc[task.status] || 0) + 1;
                return acc;
            },
            {
                ASSIGNED: 0,
                IN_PROGRESS: 0,
                COMPLETED: 0,
            }
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApiService.post(
                    "api/trainees/pertraineetaskperbatch",
                    { batchId: params.id }
                );
                if (res == null) {
                    setStudents([])
                }
                setStudents(
                    res?.Trainees.map((item) => {
                        const statusCount = countTaskStatus(item.MyTasks);

                        return {
                            ...item,
                            batch: res.name,
                            batchId: res.id,
                            taskStats: statusCount,
                        };
                    })
                );

            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, [params.id]);


    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 p-6 space-y-6">

            {/* HEADER */}
            <div className="backdrop-blur-xl p-6 ">
                <h1 className="text-2xl font-bold text-gray-800">
                    Student Tasks Overview
                </h1>
                <p className="text-sm text-gray-500">
                    Track assigned, pending and completed tasks
                </p>
            </div>

            {/* STUDENT GRID */}
            {students?.length > 0 ?
                < div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                    {students?.map((student) => (
                        <StudentCard key={student.user_id} student={{ ...student, trainerId }} />
                    ))}

                </div>
                :
                <div className="flex min-h-[50vh] text-2xl items-center justify-center w-full">
                    <h1>No Data Available</h1>
                </div>
            }

        </div >
    );
}

export default Students;