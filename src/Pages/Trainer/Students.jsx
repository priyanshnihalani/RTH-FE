import { useEffect, useState } from "react";
import { ApiService } from "../../Services/ApiService";
import { useOutletContext, useParams } from "react-router-dom"
import StudentCard from "./StudentCard";
import { toast } from "react-toastify";
import BlockingLoader from "../../components/BlockingLoader";

const Students = () => {
    const params = useParams()
    const [isLoding, setIsLoding] = useState(false)
    const [students, setStudents] = useState([]);
    const { trainerId } = useOutletContext()
    const [search, setSearch] = useState("")

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

    const fetchData = async () => {
        try {
            setIsLoding(true)
            const res = await ApiService.post(
                "api/trainees/pertraineetaskperbatch",
                { batchId: params.id }
            );
            if (res == null) {
                setStudents([])
            }
            setStudents(
                res?.data.Trainees?.map((item) => {
                    const statusCount = countTaskStatus(item.MyTasks);
                    
                    return {
                        ...item,
                        batch: res?.data?.technology,
                        batchId: res?.data?.id,
                        taskStats: statusCount,
                    };
                })
            );

        } catch (err) {
            toast.error(err?.message || "Something went wrong!")
        }
        finally {
            setIsLoding(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const filteredStudents = students?.filter((student) =>
        student.name?.toLowerCase().includes(search.toLowerCase())
    );

    console.log(students)

    return (
        <>
            {isLoding && <BlockingLoader />}
            <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 p-6 space-y-6">

                {/* HEADER */}
                <div className="flex justify-between backdrop-blur-xl p-6 items-center ">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Student Tasks Overview
                        </h1>
                        <p className="text-sm text-gray-500">
                            Track assigned, pending and completed tasks
                        </p>
                    </div>
                    <div className="mt-4 w-1/4">
                        <input
                            type="text"
                            placeholder="Search student by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="
      w-full px-4 py-4
      rounded-lg border border-gray-200
      focus:outline-none focus:ring-2 focus:ring-orange-300
      text-sm
    "
                        />
                    </div>
                </div>

                {/* STUDENT GRID */}
                {filteredStudents?.length > 0 ?
                    < div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                        {filteredStudents?.map((student) => (
                            <StudentCard key={student.user_id} student={{ ...student, trainerId }} />
                        ))}

                    </div>
                    :
                    <div className="flex min-h-[50vh] text-2xl items-center justify-center w-full">
                        <h1>No Data Available</h1>
                    </div>
                }

            </div >
        </>
    );
}

export default Students;