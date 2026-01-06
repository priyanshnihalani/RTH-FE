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
  Menu,
} from "@mui/material";
import { CalendarDays } from "lucide-react";
import { ApiService } from "../../Services/ApiService";
import BlockingLoader from "../../components/BlockingLoader";
import { Label } from "@mui/icons-material";
import Modal from "../../components/Modal";
import ConstantService from "../../Services/ConstantService";
import dayjs from "dayjs";

const Trainee = () => {
  const navigate = useNavigate();

  const [trainees, setTrainees] = useState([]);
  const [batches, setBatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [loading, setLoading] = useState(false);
  const [openGenerateModal, setOpenGenerateModal] = useState(false);
  const [generateType, setGenerateType] = useState(""); // "certificate" | "offer"
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [offerForm, setOfferForm] = useState({
    joinedAt: "",
    name: "",
    firstName: "",
    duration: "",
    technology: "",
    compensation: "",
    signerName: "",
    signerDesignation: "",
    contactPerson: "",
    signerMobile: "",
  });

  const [errors, setErrors] = useState({});

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
        ndaSigned: t.registration?.ndaSigned ?? t.ndaSigned,
        remarks2: t.registration?.remarks2 ?? t.remarks2,
        joinedDate: t.registration?.joinedDate ?? t.joinedDate,
        certificateIssued: t.registration?.certificateIssued ?? t.certificateIssued,
        adharSubmitted: t.registration?.adharSubmitted ?? t.adharSubmitted,
        trainingStatus: t.registration?.trainingStatus ?? t.trainingStatus,
        remainingFee: t.registration?.remainingFee ?? 0,
        wantToBoard: t.registration?.wantToBoard,
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
      batches: t.batches || [],
      remainingFee: t.remainingFee ?? 0,
      admissionStatus: t.admissionStatus || "pending",
      trainingStatus: t.trainingStatus || "not_started",
      technology: t.technology || "",
      shift: t.shift ?? false,
      joinedDate: t.joinedDate || "",
      duration: t.duration || "",
      wantToBoard: t.wantToBoard,
      certificateIssued: !!t.certificateIssued,
      ndaSigned: !!t.ndaSigned,
      adharSubmitted: !!t.adharSubmitted,
      remarks2: t.remarks2 || "",
    });
  };

  const updateDraft = (field, value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));
  console.log("draft", draft)

  /* ---------- SAVE ---------- */
  const saveTrainee = async (userId) => {
    setLoading(true);
    await ApiService.put(`/api/trainees/update/${userId}`, draft);
    await fetchTrainees();
    setEditingId(null);
    setDraft({});
    setLoading(false);
  };
  console.log("draft", draft)

  /* ---------- DELETE ---------- */
  const deleteTrainee = async (userId) => {
    await ApiService.delete(`/api/trainees/remove/${userId}`);
    fetchTrainees();
  };

  const handleChange = (key, value) => {
    setOfferForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateOfferForm = () => {
    const errors = {};

    if (!offerForm.joinedAt) {
      errors.joinedAt = "Joining date is required";
    }

    if (!offerForm.name || offerForm.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!offerForm.firstName) {
      errors.firstName = "First name is required";
    }

    if (!offerForm.duration) {
      errors.duration = "Duration is required";
    }

    if (!offerForm.technology) {
      errors.technology = "Technology is required";
    }

    if (!offerForm.compensation) {
      errors.compensation = "Compensation is required";
    }

    if (!offerForm.signerName) {
      errors.signerName = "Signer name is required";
    }

    if (!offerForm.signerDesignation) {
      errors.signerDesignation = "Signer designation is required";
    }

    if (!offerForm.contactPerson) {
      errors.contactPerson = "Contact person is required";
    }

    const mobile = offerForm.signerMobile?.toString().trim();

    if (!mobile) {
      errors.signerMobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      errors.signerMobile = "Enter valid 10-digit mobile number";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGenerateOfferLetter = async () => {
    if (!validateOfferForm()) return;

    try {
      setLoading(true);

      const buffer = await ApiService.postFile(
        "/api/generateOfferLetter/offer_letter_generation",
        offerForm
      );

      const pdfBlob = new Blob([buffer], {
        type: "application/pdf",
      });

      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = pdfUrl;
      link.download = "Offer_Letter.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(pdfUrl);

      setOpenGenerateModal(false);
      setErrors({});
    } catch (error) {
      console.error("Offer letter generation failed", error);
    } finally {
      setLoading(false);
    }
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
                    "WantToBoard",
                    "JoiningDate",
                    "Technologys",
                    "NDA",
                    "Aadhaar",
                    "Remarks",
                    "Notes",
                    "Actions",
                    "Generate",
                  ].map((h) => (
                    <TableCell key={h} sx={{ color: "#fff", fontWeight: 600 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {trainees.map((t) => {
                  const isEdit = editingId === t.user_id;

                  return (
                    <TableRow key={t.user_id} hover>
                      <TableCell>
                        {isEdit ? (
                          <TextField
                            size="small"
                            value={draft.name}
                            onChange={(e) =>
                              updateDraft("name", e.target.value)
                            }
                          />
                        ) : (
                          t.name
                        )}
                      </TableCell>

                      <TableCell>
                        {isEdit ? (
                          <TextField
                            size="small"
                            value={draft.education}
                            onChange={(e) =>
                              updateDraft("education", e.target.value)
                            }
                          />
                        ) : (
                          t.education || "-"
                        )}
                      </TableCell>

                      <TableCell>
                        {isEdit ? (
                          <TextField
                            size="small"
                            value={draft.college}
                            onChange={(e) =>
                              updateDraft("college", e.target.value)
                            }
                          />
                        ) : (
                          t.college || "-"
                        )}
                      </TableCell>

                      <TableCell>
                        {isEdit ? (
                          <Select
                            multiple
                            size="small"
                            value={draft.batches}
                            onChange={(e) =>
                              updateDraft("batches", e.target.value)
                            }
                          >
                            {batches.map((b) => (
                              <MenuItem key={b.id} value={b.id}>
                                {b.name}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          t.batches?.map((b) => b.name).join(", ") || "-"
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
                          <Select
                            size="small"
                            value={draft.admissionStatus}
                            onChange={(e) =>
                              updateDraft("admissionStatus", e.target.value)
                            }
                          >
                            {ConstantService.AdmissionStatus.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          ConstantService.AdmissionStatus.find(
                            (s) => s.value === t.admissionStatus
                          )?.label || "-"
                        )}
                      </TableCell>

                      <TableCell>
                        {isEdit ? (
                          <Select
                            size="small"
                            value={draft.trainingStatus}
                            onChange={(e) =>
                              updateDraft("trainingStatus", e.target.value)
                            }
                          >
                            {ConstantService.TrainingStatus.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          ConstantService.TrainingStatus.find(
                            (s) => s.value === t.trainingStatus
                          )?.label || "-"
                        )}
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
                            {ConstantService.Duration.map((d) => (
                              <MenuItem key={d.value} value={d.value}>
                                {d.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : ConstantService.Duration.find(
                          (d) => d.value === t.duration
                        )?.label || t.duration ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <Select
                            size="small"
                            value={draft.certificateIssued}
                            onChange={(e) =>
                              updateDraft("certificateIssued", e.target.value)
                            }
                          >
                            {ConstantService.YesNo.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : ConstantService.YesNo.find(
                          (s) => s.value === t.certificateIssued
                        )?.label || t.certificateIssued ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <Select
                            size="small"
                            value={draft.shift}
                            onChange={(e) =>
                              updateDraft("shift", e.target.value)
                            }
                          >
                            {ConstantService.Shift.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          ConstantService.Shift.find((s) => s.value === t.shift)
                            ?.label || true
                        )}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <Select
                            disabled={draft.trainingStatus != "completed"}
                            size="small"
                            value={draft.wantToBoard}
                            onChange={(e) =>
                              updateDraft("wantToBoard", e.target.value)
                            }
                          >
                            {ConstantService.YesNo.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          ConstantService.YesNo.find((s) => s.value === t.wantToBoard)?.label || "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <input
                            type="date"
                            value={
                              draft.joinedDate
                                ? dayjs(draft.joinedDate).format("YYYY-MM-DD")
                                : ""
                            }
                            onChange={(e) =>
                              updateDraft("joinedDate", e.target.value)
                            }
                            className="px-2 py-1 border rounded-md text-sm"
                          />
                        ) : t.joinedDate ? (
                          dayjs(t.joinedDate).format("DD-MM-YYYY")
                        ) : (
                          "-"
                        )}
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
                            {ConstantService.Technologys.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          ConstantService.Technologys.find(
                            (s) => s.value === t.technology
                          )?.label || "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <Select
                            size="small"
                            value={draft.ndaSigned}
                            onChange={(e) =>
                              updateDraft("ndaSigned", e.target.value)
                            }
                          >
                            {ConstantService.YesNo.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : ConstantService.YesNo.find(
                          (s) => s.value === t.ndaSigned
                        )?.label || t.ndaSigned ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <Select
                            size="small"
                            value={draft.adharSubmitted}
                            onChange={(e) =>
                              updateDraft("adharSubmitted", e.target.value)
                            }
                          >
                            {ConstantService.YesNo.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : ConstantService.YesNo.find(
                          (s) => s.value === t.adharSubmitted
                        )?.label || t.adharSubmitted ? (
                          "Yes"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>
                        {isEdit ? (
                          <TextField
                            size="small"
                            value={draft.remarks2 || ""}
                            onChange={(e) =>
                              updateDraft("remarks2", e.target.value)
                            }
                          />
                        ) : (
                          t.remarks2 || "-"
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          onClick={() => navigate(`/admin/notes/${t.user_id}`)}
                        >
                          <CalendarDays size={18} className="text-primary" />
                        </IconButton>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {isEdit ? (
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => saveTrainee(t.user_id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => startEdit(t)}
                            >
                              Edit
                            </Button>
                          )}
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => deleteTrainee(t.user_id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            disabled={t?.trainingStatus !== "completed"}
                            size="small"
                            variant="contained"
                            sx={{
                              backgroundColor: "#FB8924",
                              textTransform: "none",
                              fontSize: "12px",
                              minWidth: 95,
                              height: 30,
                              "&:hover": {
                                backgroundColor: "#f57c00",
                              },
                            }}
                          // onClick={() => {
                          //   setGenerateType("certificate");
                          //   setSelectedTrainee(t);
                          //   setOpenGenerateModal(true);
                          // }}
                          >
                            Certificate
                          </Button>

                          <Button
                            disabled={t.trainingStatus !== "completed"}
                            size="small"
                            variant="contained"
                            sx={{
                              backgroundColor: "#FB8924",
                              textTransform: "none",
                              fontSize: "12px",
                              minWidth: 95,
                              height: 30,
                              "&:hover": {
                                backgroundColor: "#f57c00",
                              },
                            }}
                            onClick={() => {
                              setGenerateType("offer");
                              setSelectedTrainee(t);

                              setOfferForm({
                                joinedAt: t.joinedDate || "",
                                name: t.name || "",
                                firstName: t.name?.split(" ")[0] || "",
                                duration: t.duration || "",
                                technology: t.technology || "",
                                compensation: "",
                                signerName: "",
                                signerDesignation: "",
                                contactPerson: "",
                                signerMobile: "",
                              });

                              setOpenGenerateModal(true);
                            }}
                          >
                            Offer Letter
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
      <Modal
        open={openGenerateModal}
        onClose={() => setOpenGenerateModal(false)}
        title="Generate Offer Letter"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateOfferLetter();
          }}
          className="space-y-6 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "joinedAt", label: "Joining Date", type: "date" },
                { key: "name", label: "Name" },
                { key: "firstName", label: "First Name" },
                { key: "duration", label: "Duration" },
                { key: "technology", label: "Technology" },
                { key: "compensation", label: "Compensation" },
              ].map(({ key, label, type }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    {label}
                  </label>
                  <input
                    type={type || "text"}
                    value={offerForm[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
                ${errors[key] ? "border-red-400" : "border-slate-300"}
                bg-white focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40`}
                  />
                  {errors[key] && (
                    <p className="text-xs text-red-500">{errors[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "signerName", label: "Signer Name" },
                { key: "signerDesignation", label: "Signer Designation" },
                { key: "contactPerson", label: "Contact Person" },
                { key: "signerMobile", label: "Signer Mobile No" },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    {label}
                  </label>
                  <input
                    value={offerForm[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
                ${errors[key] ? "border-red-400" : "border-slate-300"}
                bg-white focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40`}
                  />
                  {errors[key] && (
                    <p className="text-xs text-red-500">{errors[key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* -------- ACTIONS -------- */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setOpenGenerateModal(false)}
              className="px-4 py-2 text-sm rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 text-sm font-semibold rounded-xl
        bg-gradient-to-r from-[#FB8924] to-[#f27f1c]
        text-white shadow-md active:scale-95"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Trainee;
