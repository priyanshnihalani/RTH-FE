import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Search, CalendarDays, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import AddTrainerModal from "./AddTrainerModal";
import { ApiService } from "../../Services/ApiService";
import BlockingLoader from "../../components/BlockingLoader";
import { toast } from "react-toastify";
import ToastLogo from "../../components/ToastLogo";

const Trainers = () => {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [loading, setLoading] = useState(false)
  const fetchAllTrainers = async () => {
    try {
      const result = await ApiService.get("/api/trainer/getAll");
      setTrainers(result || []);
    }
    catch (err) {
      console.log(err)
    }
  };

  const fetchBatches = async () => {
    try {
      const result = await ApiService.get("/api/batch/getallbatchwithdetail");
      setBatches(result || []);
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);

      try {
        await Promise.all([
          fetchAllTrainers(),
          fetchBatches()
        ]);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  /* -------------------- SEARCH FILTER -------------------- */
  const filteredTrainers = trainers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  /* -------------------- OPEN ASSIGN MODAL -------------------- */
  const openAssignModal = (trainer) => {
    const batchIds =
      batches
        .filter((b) => trainer.batches.includes(b.technology))
        .map((b) => b.id) || [];

    setEditingTrainer({
      ...trainer,
      batchIds,
    });
  };

  /* -------------------- TOGGLE BATCH -------------------- */
  const toggleBatch = (batchId) => {
    setEditingTrainer((prev) => {
      if (!prev) return prev;

      const ids = prev.batchIds || [];
      return {
        ...prev,
        batchIds: ids.includes(batchId)
          ? ids.filter((id) => id !== batchId)
          : [...ids, batchId],
      };
    });
  };

  /* -------------------- SAVE ASSIGNMENT -------------------- */
  const saveBatchAssignment = async () => {
    if (!editingTrainer) return;

    await ApiService.post("/api/trainer/assignBatch", {
      trainerId: editingTrainer.id,
      batchIds: editingTrainer.batchIds || [],
    });

    setEditingTrainer(null);
    fetchAllTrainers();
  };

  const handleDelete = async (id) => {
    try {
      await ApiService.delete(`/api/trainer/remove/${id}`)
      toast.success("Trainer Deleted Successfully!", {
        icon: <ToastLogo />,
        style: {
          color: "#16a34a",
        },
        autoClose: 2000,
      });
    }
    catch (err) {
      toast.error("Something Went Wrong!", {
        icon: <ToastLogo />,
        style: {
          color: "#dc2626",
        },
        autoClose: 3000,
      });
    }
  }
  /* ===================== UI ===================== */
  return (
    <>

      {loading && <BlockingLoader />}
      <div
        className="
    min-h-screen
    bg-linear-to-br from-orange-50 via-white to-orange-100
    p-8 space-y-8
  "
      >
        {/* ADD TRAINER MODAL */}
        <AddTrainerModal open={openAdd} onClose={() => setOpenAdd(false)} onSuccess={fetchAllTrainers} />

        {/* ================= HEADER ================= */}
        <div
          className="
      bg-white/70 backdrop-blur-xl
      rounded-xl p-6
      border border-white/40
      shadow-[0_5px_40px_rgba(0,0,0,0.08)]
      flex justify-between items-center
    "
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Trainer Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage trainers and assign them to batches.
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="
        flex items-center gap-2
        bg-gradient-to-r from-[#FB8924] to-[#f27f1c]
        text-white px-5 py-2.5
        rounded-xl
        text-sm font-medium
        shadow-md
        hover:opacity-95
      "
          >
            <Plus size={18} />
            Add Trainer
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div
          className="
      bg-white/60 backdrop-blur-xl
      rounded-2xl p-4
      border border-white/40
      shadow-sm
      max-w-md
    "
        >
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search by name or email..."
              className="
          w-full pl-10 pr-4 py-2.5
          rounded-xl border border-slate-300
          bg-white
          text-sm
          focus:ring-2 focus:ring-[#FB8924]/40
          outline-none
        "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="grid grid-cols-1 bg-white p-4 rounded-2xl md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-2xl overflow-hidden  shadow bg-white flex flex-col"
            >
              {/* Header */}
              <div className="bg-orange-50 h-28 flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-lg">
                    {trainer.name
                      ?.split(" ")
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2 text-sm flex-1">
                <Row label="Name">{trainer.name}</Row>
                <Row label="Email">{trainer.email}</Row>

                <Row label="Batches">
                  <Chip
                    label={trainer.batchCount}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(251,137,36,0.15)",
                      color: "#FB8924",
                      fontWeight: 600,
                    }}
                  />
                </Row>

                <Row label="Assigned">
                  {trainer.batches.join(", ") || "-"}
                </Row>

                <Row label="Notes">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/admin/notes/${trainer.id}`)}
                    sx={{ color: "#FB8924" }}
                  >
                    <CalendarDays size={16} />
                  </IconButton>
                </Row>
              </div>

              {/* Footer */}
              <div className="border-t px-4 py-3 flex justify-around gap-2 cursor-pointer">
                <div className="flex  items-center text-primary">
                  <button className="flex  items-center gap-1 rounded-full p-1 cursor-pointer"
                    onClick={() => openAssignModal(trainer)}
                    title="Edit"
                  >
                    <Pencil size={18} />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                </div>

                <div className="flex items-center text-primary cursor-pointer">
                  <button className="flex  items-center gap-1 rounded-full p-1 cursor-pointer"
                    onClick={() => handleDelete(trainer.id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>

            </div>
          ))}

          {filteredTrainers.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              No trainers found
            </div>
          )}
        </div>


        {/* ================= ASSIGN BATCH MODAL ================= */}
        {editingTrainer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div
              className="
          bg-white/80 backdrop-blur-xl
          rounded-3xl
          w-full max-w-md
          p-6 space-y-5
          border border-white/40
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        "
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Assign Batches – {editingTrainer.name}
              </h2>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {batches.map((batch) => (
                  <label
                    key={batch.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="accent-[#FB8924]"
                      checked={
                        editingTrainer.batchIds?.includes(batch.id) ||
                        false
                      }
                      onChange={() => toggleBatch(batch.id)}
                    />
                    {batch.technology}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setEditingTrainer(null)}
                  className="
                  cursor-pointer
              px-4 py-2
              rounded-xl
              border border-slate-300
              text-sm
              hover:bg-slate-100
            "
                >
                  Cancel
                </button>

                <button
                  onClick={saveBatchAssignment}
                  className="
                  cursor-pointer
              px-5 py-2
              rounded-xl
              text-sm font-medium
              bg-gradient-to-r from-[#FB8924] to-[#f27f1c]
              text-white
              shadow-md
            "
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Trainers;

const Row = ({ label, children }) => (
  <div className="flex justify-between items-center gap-2">
    <span className="text-gray-500">{label}</span>
    <div className="text-right font-medium">{children}</div>
  </div>
);