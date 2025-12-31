import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { CalendarDays } from "lucide-react";
import { ApiService } from "../../Services/ApiService";
import BlockingLoader from "../../components/BlockingLoader";
import { Label } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

/* ---------- CONSTANTS ---------- */
const admissionStatus = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const trainingStatus = [
  { label: "Not Started", value: "not_started" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Dropped", value: "dropped" },
];

const yesNo = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const duration = [
  { label: "15 Days", value: "15 Days" },
  { label: "30 Days", value: "30 Days" },
  { label: "45 Days", value: "45 Days" },
  { label: "90 Days", value: "90 Days" },
  { label: "180 Days", value: "180 Days" },
];

const Trainee = () => {
  const navigate = useNavigate();

  const [trainees, setTrainees] = useState([]);
  const [batches, setBatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [loading, setLoading] = useState(false);

  const technology = [
    { value: "Frontend Design", label: "Frontend Design" },
    { value: "node", label: "Node.js" },
    { value: "QA", label: "QA" },
    { value: "Devops", label: "Devops" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "Java", lable: "Java" },
    { value: "react", label: "React" },
    { value: "ReactNative", label: "ReactNative" },
  ];

    /* ---------- FETCH ---------- */
    const fetchTrainees = async () => {
        setLoading(true);

        const res = await ApiService.get("/api/trainees/getAll");

    const normalized = res
      .filter((t) => !t.softDelete)
      .map((t) => ({
        ...t,
        education: t.registration?.education ?? "",
        college: t.registration?.college ?? "",
        duration: t.registration?.duration ?? "",
        admissionStatus: t.registration?.admissionStatus ?? t.admissionStatus,
        technology: t.registration?.technology ?? t.technology,
        shift: t.registration?.shift ?? t.shift,
        joinedDate: t.registration?.joinedDate ?? t.joinedDate,
        trainingStatus: t.registration?.trainingStatus ?? t.trainingStatus,
        remainingFees: t.registration?.remainingFee ?? 0,
      }));

        setTrainees(normalized);
        setLoading(false);
    };


    const fetchBatches = async () => {
        const res = await ApiService.get("/api/batch/getallbatchwithdetail");
        setBatches(res);
    };

    useEffect(() => {
        fetchTrainees();
        fetchBatches();
    }, []);

  /* ---------- EDIT ---------- */
  const startEdit = (t) => {
    setEditingId(t.user_id);
    setDraft({
      name: t.name || "",
      education: t.education || "",
      college: t.college || "",
      batchIds: t.batchIds || [],
      remainingFees: t.remainingFees ?? 0,
      admissionStatus: t.admissionStatus || "pending",
      trainingStatus: t.trainingStatus || "not_started",
      technology: t.technology || "",
      shift: t.shift || "",
      joinedDate: t.joinedDate || "",
      duration: t.duration || "",
      certificateIssued: !!t.certificateIssued,
      ndaSigned: !!t.ndaSigned,
      adharSubmitted: !!t.adharSubmitted,
      remarks: t.remarks || "",
    });
  };

    const updateDraft = (field, value) =>
        setDraft(prev => ({ ...prev, [field]: value }));

    /* ---------- SAVE ---------- */
    const saveTrainee = async (userId) => {
        setLoading(true);
        await ApiService.put(`/api/trainees/update/${userId}`, draft);
        await fetchTrainees();     // 🔑 important
        setEditingId(null);
        setDraft({});
        setLoading(false);
    };

    /* ---------- DELETE ---------- */
    const deleteTrainee = async (userId) => {
        await ApiService.delete(`/api/trainees/remove/${userId}`);
        fetchTrainees();
    };

    return (
        <>
            {loading && <BlockingLoader />}

            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-8 space-y-8">

                {/* HEADER */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow">
                    <h1 className="text-3xl font-bold">Trainee Management</h1>
                    <p className="text-sm text-gray-500">Manage trainee details</p>
                </div>

        {/* TABLE */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow overflow-hidden">
          <TableContainer component={Paper} elevation={0}>
            <Table size="small" sx={{ minWidth: 1400 }}>
              <TableHead sx={{ background: "#FB8924" }}>
                <TableRow>
                  {[
                    "Name",
                    "Degree",
                    "College",
                    "Batch",
                    "Remaining Fees",
                    "Admission",
                    "Training",
                    "Duration",
                    "Certificate",
                    "Shift",
                    "JoiningDate",
                    "Technologys",
                    "NDA",
                    "Aadhaar",
                    "Remarks",
                    "Notes",
                    "Actions",
                  ].map((h) => (
                    <TableCell key={h} sx={{ color: "#fff", fontWeight: 600 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

                            <TableBody>
                                {trainees.map(t => {
                                    const isEdit = editingId === t.user_id;

                                    return (
                                        <TableRow key={t.user_id} hover>

                                            <TableCell>
                                                {isEdit
                                                    ? <TextField size="small" value={draft.name} onChange={e => updateDraft("name", e.target.value)} />
                                                    : t.name}
                                            </TableCell>

                                            <TableCell>
                                                {isEdit
                                                    ? <TextField size="small" value={draft.education} onChange={e => updateDraft("education", e.target.value)} />
                                                    : t.education || "-"}
                                            </TableCell>

                                            <TableCell>
                                                {isEdit
                                                    ? <TextField size="small" value={draft.college} onChange={e => updateDraft("college", e.target.value)} />
                                                    : t.college || "-"}
                                            </TableCell>

                                            <TableCell>
                                                {isEdit ? (
                                                    <Select
                                                        multiple
                                                        size="small"
                                                        value={draft.batchIds}
                                                        onChange={e => updateDraft("batchIds", e.target.value)}
                                                    >
                                                        {batches.map(b => (
                                                            <MenuItem key={b.id} value={b.id}>
                                                                {b.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : (
                                                    t.batches?.map(b => b.name).join(", ") || "-"
                                                )}
                                            </TableCell>

                      <TableCell>
                        {isEdit ? (
                          <TextField
                            size="small"
                            type="number"
                            value={draft.remainingFees}
                            onChange={(e) =>
                              updateDraft("remainingFees", e.target.value)
                            }
                          />
                        ) : (
                          t.remainingFees || 0
                        )}
                      </TableCell>

                                            <TableCell>
                                                {isEdit ? (
                                                    <Select size="small" value={draft.admissionStatus} onChange={e => updateDraft("admissionStatus", e.target.value)}>
                                                        {admissionStatus.map(s => (
                                                            <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : admissionStatus.find(s => s.value === t.admissionStatus)?.label}
                                            </TableCell>

                                            <TableCell>
                                                {isEdit ? (
                                                    <Select size="small" value={draft.trainingStatus} onChange={e => updateDraft("trainingStatus", e.target.value)}>
                                                        {trainingStatus.map(s => (
                                                            <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : trainingStatus.find(s => s.value === t.trainingStatus)?.label}
                                            </TableCell>

                      <TableCell>
                        {isEdit ? (
                          <Select
                            size="small"
                            value={draft.duration}
                            onChange={(e) =>
                              updateDraft("duration", e.target.value)
                            }
                          >
                            {duration.map((d) => (
                              <MenuItem key={d.value} value={d.value}>
                                {d.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          duration.find((d) => d.value === t.duration)?.label ||
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {t.certificateIssued ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {t.shift === true
                          ? "Morning"
                          : t.shift === false
                          ? "Afternoon"
                          : "-"}
                      </TableCell>
                      <TableCell>
                       {t.joinedDate || "-"}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <Select
                            size="small"
                            value={draft.technology}
                            onChange={(e) =>
                              updateDraft("technology", e.target.value)
                            }
                          >
                            {technology.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          technology.find((s) => s.value === t.technology)
                            ?.label || "-"
                        )}
                      </TableCell>
                      <TableCell>{t.ndaSigned ? "Yes" : "No"}</TableCell>
                      <TableCell>{t.adharSubmitted ? "Yes" : "No"}</TableCell>

                                            <TableCell>{t.remarks || "-"}</TableCell>

                                            <TableCell align="center">
                                                <IconButton onClick={() => navigate(`/admin/notes/${t.user_id}`)}>
                                                    <CalendarDays size={18} />
                                                </IconButton>
                                            </TableCell>

                                            <TableCell>
                                                <Stack direction="row" spacing={1}>
                                                    {isEdit ? (
                                                        <Button size="small" variant="contained" onClick={() => saveTrainee(t.user_id)}>
                                                            Save
                                                        </Button>
                                                    ) : (
                                                        <Button size="small" variant="outlined" onClick={() => startEdit(t)}>
                                                            Edit
                                                        </Button>
                                                    )}
                                                    <Button size="small" variant="outlined" color="error" onClick={() => deleteTrainee(t.user_id)}>
                                                        Delete
                                                    </Button>
                                                </Stack>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default Trainee;