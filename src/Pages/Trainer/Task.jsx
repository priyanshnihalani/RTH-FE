import { useEffect, useState } from "react";
import TaskColumn from "../../components/TaskColumn";
import { Button, Modal, Box } from "@mui/material";
import { Plus, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { ApiService } from "../../Services/ApiService";
import ToastLogo from "../../components/ToastLogo";
import { useParams } from "react-router-dom";
import TaskCard from "../../components/TaskCard";
import BlockingLoader from "../../components/BlockingLoader";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});
  const[isLoding,setIsLoding]=useState(false)
  const [batchId, setBatchId] = useState("mern-jan-2025");
  const [openGenerateModal, setOpenGenerateModal] = useState(false);
  const parms = useParams();
  const [formData, setformData] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      errors.title = "Task title must be at least 3 characters";
    }
    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = "Task description must be at least 10 characters";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      ...parms,
    };

    try {
      const res = await ApiService.post("/api/task/assign", payload);

      const newTask = res;
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task Created Successfully!",{
        icon: <ToastLogo />,
                 style: {
                   color: "#059669",
                 },
                 autoClose: 3000,
               });
      setOpenGenerateModal(false);

      setformData({
        title: "",
        description: "",
      });

      setErrors({});
    } catch (err) {
       toast.error(err?.response?.data?.message || "Something went wrong!",{
      icon: <ToastLogo />,
               style: {
                 color: "#dc2626",
               },
               autoClose: 3000,
             });
    }
  };

  const group = (status) => tasks.filter((t) => t.status === status);


  const handleTaskAction = async (task, newStatus) => {
    try {
      setIsLoding(true)
      await ApiService.put(`/api/task/update/status`, {
        traineeId: task.traineeId,
        taskId: task.id,
        newStatus: newStatus,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      toast.error("Status update failed",{
      icon: <ToastLogo />,
               style: {
                 color: "#dc2626",
               },
               autoClose: 3000,
             });
    }
    finally{
      setIsLoding(false)
    }
  };

  const loadTasks = async () => {
    try {
      setIsLoding(true)
      const res = await ApiService.post("/api/task/traineetask", {
        ...parms,
      });
      setTasks(res);
    } catch (err) {
      console.error(err);
    }
    finally{
      setIsLoding(false)
    }
  };
  useEffect(() => {
    loadTasks();
  }, [batchId]);

  return (
    <>
     {isLoding && <BlockingLoader />}
    <div
      className="
  "
    >
      {/* HEADER */}
      <div
        className="
      mx-8 mt-8 mb-12
      rounded-2xl
      p-6
      flex justify-between items-center
    "
      >

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trainer Tasks</h1>
          <p className="text-gray-500">
            Manage and track your trainees assignments
          </p>
        </div>

        <div className="flex items-center space-x-8 relative">
          <h1 className="font-semibold text-gray-700">
            Batch: <span className="font-bold">{tasks[0]?.Batch?.name}</span>
          </h1>
          <button
            onClick={() => setOpenGenerateModal(true)}
            className=" flex px-4  py-3 space-x-2 font-medium cursor-pointer hover:bg-primary-dark text-sm  items-center bg-primary text-white rounded-xl"

          >
            <PlusCircle size={18} />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* KANBAN */}
      <div
        className="
      px-8 pb-12
      grid grid-cols-1 md:grid-cols-3 gap-10
    "
      >
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
      <Modal
        open={openGenerateModal}
        onClose={() => setOpenGenerateModal(false)}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 480,
            bgcolor: "#F7F6F4",
            borderRadius: "20px",
            boxShadow: "0px 20px 60px rgba(0,0,0,0.2)",
            p: 3,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <h2 style={{ fontWeight: 600, color: "#1F2937" }}>Create Task</h2>
          </Box>
          {/* FORM GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* NAME */}
            <Box sx={{ gridColumn: "span 2" }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.title ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40`}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title}</p>
              )}
            </Box>

            {/* DESCRIPTION */}
            <Box sx={{ gridColumn: "span 2" }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  marginBottom: "6px",
                  display: "block",
                }}
              >
                Description
              </label>

              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
                className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.description ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </Box>
          </Box>
          {/* FOOTER BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "14px",
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: "12px",
                px: 3,
                color: "#475569",
                borderColor: "#CBD5E1",
              }}
              type="button"
              onClick={() => {
                setErrors({});
                setOpenGenerateModal(false);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: "12px",
                px: 4,
                backgroundColor: "#FF7A00",
                "&:hover": { backgroundColor: "#E66E00" },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default Task;
