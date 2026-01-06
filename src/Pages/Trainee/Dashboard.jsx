import { useEffect, useState } from "react";
import TaskColumn from "../../components/TaskColumn";
import { ApiService } from "../../Services/ApiService";
import Cookie from "js-cookie"
import { replace, useNavigate } from "react-router-dom";
// import { getTasksByBatch, updateTaskStatus } from "../services/taskApi";
const SAMPLE_TASKS = [
    {
        id: 1,
        title: "API Integration with Node.js",
        description: "Connect React frontend with Node/Express backend APIs.",
        status: "ASSIGNED",
        trainerName: "Sarah Connor",
        dueDate: "Jan 24",
        batchId: "mern-jan-2025",
    },
    {
        id: 2,
        title: "Advanced CSS Layouts",
        description: "Build responsive layouts using Flexbox and Grid.",
        status: "ASSIGNED",
        trainerName: "Mike Ross",
        dueDate: "Jan 28",
        batchId: "mern-jan-2025",
    },
    {
        id: 3,
        title: "React Components Deep Dive",
        description: "Understand props, state, and lifecycle methods.",
        status: "IN_PROGRESS",
        trainerName: "David Chen",
        dueDate: "Jan 26",
        batchId: "mern-jan-2025",
    },
    {
        id: 4,
        title: "State Management with Redux",
        description: "Redux flow, store, reducers, and Redux Toolkit.",
        status: "IN_PROGRESS",
        trainerName: "Sarah Connor",
        dueDate: "Jan 30",
        batchId: "mern-jan-2025",
    },
    {
        id: 5,
        title: "Introduction to Git",
        description: "Git basics, branching, and merge conflict resolution.",
        status: "COMPLETED",
        trainerName: "David Chen",
        dueDate: "Jan 20",
        batchId: "mern-jan-2025",
    },

    // Second batch (to prove batch-wise filtering works)
    {
        id: 6,
        title: "React Hooks Basics",
        description: "useState, useEffect, and custom hooks.",
        status: "ASSIGNED",
        trainerName: "Alex Morgan",
        dueDate: "Feb 10",
        batchId: "react-feb-2025",
    },
];

const STATUS_FLOW = ["ASSIGNED", "IN_PROGRESS", "COMPLETED"];

const TraineeDashboard = () => {
    const [batchId, setBatchId] = useState("mern-jan-2025");
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate()

    const loadMe = async () => {
        const accessToken = Cookie.get("accessToken")
        const result = await ApiService.post("api/users/auth/me", { accessToken })
        console.log(result)
        if (result?.id) {
            const response = await ApiService.post("api/trainees/getTraineeById", { id: result?.id })
            if (response?.data?.registration?.wantToBoard) {
                navigate("/pre-board", { replace: true })
            }
        }
    }

    useEffect(() => {
        loadMe()
    }, [])

    useEffect(() => {
        loadTasks();
    }, [batchId]);


    const loadTasks = async () => {
        const data = SAMPLE_TASKS.filter(
            task => task.batchId === batchId
        );
        setTasks(data);
    };


    const handleTaskAction = (
        task,
        forceStatus = null,
        direction = "forward"
    ) => {
        setTasks(prevTasks =>
            prevTasks.map(t => {
                if (t.id !== task.id) return t;

                let nextStatus = t.status;

                if (forceStatus) {
                    nextStatus = forceStatus;
                }
                else {
                    const currentIndex = STATUS_FLOW.indexOf(t.status);

                    if (direction === "forward" && currentIndex < STATUS_FLOW.length - 1) {
                        nextStatus = STATUS_FLOW[currentIndex + 1];
                    }

                    if (direction === "backward" && currentIndex > 0) {
                        nextStatus = STATUS_FLOW[currentIndex - 1];
                    }
                }

                return { ...t, status: nextStatus };
            })
        );
    };


    const group = (status) =>
        tasks.filter(t => t.status === status);

    return (
        <div className="
    min-h-screen
  ">

            {/* HEADER */}
            <div className="
      mx-8 mt-8 mb-12
      rounded-2xl
      p-6
      flex justify-between items-center
    ">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
                    <p className="text-gray-500">
                        Manage and track your training assignments
                    </p>
                </div>

                <h1 className="font-semibold text-gray-700">
                    Batch: <span className="font-bold">MERN Batch-2025</span>
                </h1>
            </div>

            {/* KANBAN */}
            <div className="
      px-8 pb-12
      grid grid-cols-1 md:grid-cols-3 gap-10
    ">
                <TaskColumn
                    title="Assigned"
                    status="ASSIGNED"
                    tasks={group("ASSIGNED")}
                    onAction={handleTaskAction}
                />

                <TaskColumn
                    title="In Progress"
                    status="IN_PROGRESS"
                    tasks={group("IN_PROGRESS")}
                    onAction={handleTaskAction}
                />

                <TaskColumn
                    title="Completed"
                    status="COMPLETED"
                    tasks={group("COMPLETED")}
                    onAction={handleTaskAction}
                />

            </div>
        </div>
    );
};

export default TraineeDashboard;