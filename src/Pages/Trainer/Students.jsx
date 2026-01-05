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
                setStudents(res?.Trainees.map((item) => ({ ...item, batch: res.name, batchId: res?.id })))
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, [params.id]);

    const studentCount = students?.length ?? 0;
    const skeletonCount = Math.max(0, count - studentCount);

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
            <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">

                {students?.map((student) => (
                    <StudentCard key={student.user_id} student={{ ...student, trainerId }} />
                ))}

                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <StudentCardSkeleton key={`skeleton-${i}`} />
                ))}

            </div>

        </div>
    );
}

export default Students;