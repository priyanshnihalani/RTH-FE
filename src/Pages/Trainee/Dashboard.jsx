import { useEffect, useState } from "react";
import TaskColumn from "../../components/TaskColumn";
import { ApiService } from "../../Services/ApiService";
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom";

const TraineeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [userDetails, setUserDetails] = useState(null)

  const loadMe = async () => {
    const accessToken = Cookie.get("accessToken")
    const result = await ApiService.post("api/users/auth/me", { accessToken })
    setUser(result)

    if (result?.id) {
      const response = await ApiService.post("api/trainees/getTraineeById", { id: result?.id })
      setUserDetails(response)
      if (response?.data?.registration?.wantToBoard) {
        navigate("/pre-board", { replace: true })
      }
    }
  }

  const loadTasks = async () => {
    try {
      const res = await ApiService.post("/api/task/mytasks", {
        traineeId: userDetails?.data.user_id,
        batchId: userDetails.data?.TraineeBatches[0].id
      });
      setTasks(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMe()
  }, [])

  useEffect(() => {
    loadTasks();
  }, [user, userDetails]);

  const handleTaskAction = async (task, newStatus) => {
    try {
      await ApiService.put(`/api/task/update/status`, {
        traineeId: user.id,
        taskId: task.id,
        newStatus: newStatus,
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      toast.error("Status update failed");
    }
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
          Batch: <span className="font-bold">{userDetails?.data?.TraineeBatches[0]?.technology || "Will Be Assigned Soon"}</span>
        </h1>
      </div>

      {/* KANBAN */}
      <div className="
      px-8 pb-12 min-h-screen h-auto
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