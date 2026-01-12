import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

import { ArrowDown, ArrowDown01, ArrowUp, Award, CalendarDays, File, FileTextIcon, PenIcon, Save, Trash2Icon, X } from "lucide-react";
import { ApiService } from "../../Services/ApiService";
import BlockingLoader from "../../components/BlockingLoader";
import Modal from "../../components/Modal";
import ConstantService from "../../Services/ConstantService";
import dayjs from "dayjs";
import calculateEndDate from "../../Services/CalculateEndDate";
import ToastLogo from "../../components/ToastLogo";
import { toast } from "react-toastify";

const Trainee = () => {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null);
  const [trainees, setTrainees] = useState([]);
  const [batches, setBatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [loading, setLoading] = useState(false);
  const [openGenerateModal, setOpenGenerateModal] = useState(false);
  const [generateType, setGenerateType] = useState("certificate" || "offer"); // "certificate" | "offer"
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

  const [certificate, setCertificate] = useState({
    joinedDate: "",
    endDate: "",
    name: "",
    duration: "",
    batch: [],
    manager: ""
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
        branch: t.registration?.branch ?? "",
        college: t.registration?.college ?? "",
        duration: t.registration?.duration ?? "",
        admissionStatus: t.registration?.admissionStatus ?? t.admissionStatus,
        shift: t.registration?.shift ?? t.shift,
        ndaSigned: t.registration?.ndaSigned ?? t.ndaSigned,
        remarks2: t.registration?.remarks2 ?? t.remarks2,
        joinedDate: t.registration?.joinedDate ?? t.joinedDate,
        certificateIssued:
          t.registration?.certificateIssued ?? t.certificateIssued,
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
      email: t.email || "",
      college: t.college || "",
      phone: t.phone || "",
      batches: t.batches?.map(b => b.id) || [],
      remainingFee: t.remainingFee ?? 0,
      admissionStatus: t.admissionStatus || "pending",
      trainingStatus: t.trainingStatus || "not_started",
      shift: t.shift ?? false,
      joinedDate: t.joinedDate || "",
      branch: t.branch || "",
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

  const saveTrainee = async (userId) => {
    setLoading(true);
    try {
      await ApiService.put(
        `/api/trainees/update/${userId}`,
        draft
      );
      toast.success("Trainee Updated Successfully!", {
        icon: <ToastLogo />,
        style: {
          color: "#16a34a",
        },
        autoClose: 2000,
      });
    } catch (err) {
      toast.error("Something Went Wrong!", {
        icon: <ToastLogo />,
        style: {
          color: "#dc2626",
        },
        autoClose: 3000,
      });
    } finally {
      await fetchTrainees();
      setEditingId(null);
      setDraft({});
      setLoading(false);
    }
  };


  /* ---------- DELETE ---------- */
  const deleteTrainee = async (userId) => {
    await ApiService.delete(`/api/trainees/remove/${userId}`);
    toast.error("Data Delete Successfully!", {
      icon: <ToastLogo />,
      style: {
        color: "#dc2626",
      },
      autoClose: 3000,
    });
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

      const buffer = await ApiService.post(
        "/api/generateOfferLetter/offer_letter_generation",
        offerForm,
        {
          responseType: "blob",
        }
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

      toast.success("Offer letter generation Successfully!", {
        icon: <ToastLogo />,
        style: {
          color: "#16a34a",
        },
        autoClose: 2000,
      });
      setOpenGenerateModal(false);
      setErrors({});
    }
    catch (error) {
      toast.error("Offer letter generation failed", {
        icon: <ToastLogo />,
        style: {
          color: "#dc2626",
        },
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleChangecertificate = (key, value) => {
    setCertificate((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validatecertificateForm = () => {
    const errors = {};

    if (!certificate.endDate) {
      errors.endDate = "EndDate is required";
    }

    if (!certificate.joinedDate) {
      errors.joinedDate = "JoinedDate is required";
    }

    if (!certificate.name || certificate.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (!certificate.duration) {
      errors.duration = "Duration is required";
    }

    if (!certificate.batch) {
      errors.batch = "Batch is required";
    }

    if (!certificate.manager) {
      errors.manager = "Manager is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGeneratecertificate = async () => {
    if (!validatecertificateForm()) return;
    const { joinedDate, endDate, batch, manager, duration, name } = certificate;
    try {
      setLoading(true);

      const buffer = await ApiService.post(
        "/api/generateOfferLetter/certificate_generation",
        certificate,
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([buffer], {
        type: "application/pdf",
      });

      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = pdfUrl;
      link.download = "Certificate.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(pdfUrl);
      toast.success("Certificate generation Successfully!", {
        icon: <ToastLogo />,
        style: {
          color: "#16a34a",
        },
        autoClose: 2000,
      });
      setOpenGenerateModal(false);
      setErrors({});
    } catch (error) {
      toast.error("Certificate generation failed", {
        icon: <ToastLogo />,
        style: {
          color: "#dc2626",
        },
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const tableColumns = [
    { label: "Name", width: 180 },
    { label: "Email", width: 180 },
    { label: "Degree", width: 120 },
    { label: "College", width: 200 },
    { label: "Phone", width: 200 },
    { label: "Batch", width: 200 },
    { label: "Branch", width: 200 },
    { label: "Remaining Fees", width: 160 },
    { label: "Admission", width: 130 },
    { label: "Training", width: 130 },
    { label: "Duration", width: 120 },
    { label: "Certificate", width: 140 },
    { label: "Shift", width: 100 },
    { label: "WantToBoard", width: 140 },
    { label: "JoiningDate", width: 130 },
    { label: "EndDate", width: 130 },
    { label: "NDA", width: 90 },
    { label: "Aadhaar", width: 110 },
    { label: "Remarks", width: 200 },
    { label: "Notes", width: 200 },
    { label: "Actions", width: 140 },
    { label: "Generate", width: 130 },
  ];


  return (
    <>
      {loading && <BlockingLoader />}

      <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 p-8 space-y-8">
        {/* HEADER */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow">
          <h1 className="text-3xl font-bold">Trainee Management</h1>
          <p className="text-sm text-gray-500">Manage trainee details</p>
        </div>

        {/* TABLE */}
        <div className="bg-white p-4 rounded-2xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">

          {trainees.map((t) => {
            const isEdit = editingId === t.user_id;

            return (
              <div
                key={t.user_id}
                className="rounded-2xl overflow-hidden  shadow bg-white flex flex-col"
              >
                {/* Header */}
                <div className="bg-orange-50 h-36 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-lg">
                      {t.name
                        ?.split(" ")
                        .map(w => w[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                </div>


                {/* Body */}
                <div className="p-4 space-y-2 text-sm flex-1">
                  <Row label="Name">
                    {isEdit ? (
                      <TextField size="small" value={draft.name} onChange={(e) => updateDraft("name", e.target.value)} />
                    ) : t.name}
                  </Row>

                  <Row label="Email">
                    {isEdit ? (
                      <TextField size="small" value={draft.email} onChange={(e) => updateDraft("email", e.target.value)} />
                    ) : t.email}
                  </Row>

                  <Row label="Batch">
                    {isEdit ? (
                      <Select
                        size="small"
                        value={draft.batches?.[0] ?? ""}
                        displayEmpty
                        onChange={(e) => updateDraft("batches", e.target.value ? [e.target.value] : [])}
                        renderValue={(s) => {
                          if (!s) return "Select Batch";
                          return batches.find(b => b.id === s)?.technology || "-";
                        }}
                      >
                        {batches.map(b => (
                          <MenuItem key={b.id} value={b.id}>{b.technology}</MenuItem>
                        ))}
                      </Select>
                    ) : (t.batches?.map(b => b.name).join(", ") || "-")}
                  </Row>

                  <Row label="Training Status">
                    {isEdit ? (
                      <Select size="small" value={draft.trainingStatus} onChange={(e) => updateDraft("trainingStatus", e.target.value)}>
                        {ConstantService.TrainingStatus.map(s => (
                          <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                        ))}
                      </Select>
                    ) : (ConstantService.TrainingStatus.find(s => s.value === t.trainingStatus)?.label || "-")}
                  </Row>

                  <Row label="Joined Date">
                    {isEdit ? (
                      <input
                        type="date"
                        value={draft.joinedDate ? dayjs(draft.joinedDate).format("YYYY-MM-DD") : ""}
                        onChange={(e) => updateDraft("joinedDate", e.target.value)}
                        className="px-2 py-1 border rounded-md text-xs"
                      />
                    ) : (t.joinedDate ? dayjs(t.joinedDate).format("DD-MM-YYYY") : "-")}
                  </Row>

                  <Row label="End Date">
                    {t.joinedDate && t.duration
                      ? calculateEndDate(t.joinedDate, t.duration).displaydate
                      : "-"}
                  </Row>

                  <button
                    onClick={() => setOpenId(openId === t.user_id ? null : t.user_id)}
                    className="cursor-pointer text-orange-600 text-xs font-medium mt-1 flex items-center gap-1"
                  >
                    {openId === t.user_id ? (
                      <>
                        <span>Hide details</span>
                        <ArrowUp size={16} />
                      </>
                    ) : (
                      <>
                        <span>More details</span>
                        <ArrowDown size={16} />
                      </>
                    )}
                  </button>

                  {openId === t.user_id &&
                    (
                      <>
                        <Row label="Education">
                          {isEdit ? (
                            <TextField size="small" value={draft.education} onChange={(e) => updateDraft("education", e.target.value)} />
                          ) : (t.education || "-")}
                        </Row>

                        <Row label="College">
                          {isEdit ? (
                            <TextField size="small" value={draft.college} onChange={(e) => updateDraft("college", e.target.value)} />
                          ) : (t.college || "-")}
                        </Row>

                        <Row label="Phone">
                          {isEdit ? (
                            <TextField size="small" value={draft.phone} onChange={(e) => updateDraft("phone", e.target.value)} />
                          ) : (t.phone || "-")}
                        </Row>

                        <Row label="Branch">
                          {isEdit ? (
                            <Select size="small" value={draft.branch ?? ""} displayEmpty onChange={(e) => updateDraft("branch", e.target.value)}>
                              {ConstantService.Branch.map(b => (
                                <MenuItem key={b.value} value={b.value}>{b.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.Branch.find(b => b.value === t.branch)?.label || "-")}
                        </Row>

                        <Row label="Remaining Fees">
                          {isEdit ? (
                            <TextField size="small" type="number" value={draft.remainingFees} onChange={(e) => updateDraft("remainingFees", e.target.value)} />
                          ) : (t.remainingFees || 0)}
                        </Row>

                        <Row label="Admission Status">
                          {isEdit ? (
                            <Select size="small" value={draft.admissionStatus} onChange={(e) => updateDraft("admissionStatus", e.target.value)}>
                              {ConstantService.AdmissionStatus.map(s => (
                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.AdmissionStatus.find(s => s.value === t.admissionStatus)?.label || "-")}
                        </Row>

                        <Row label="Duration">
                          {isEdit ? (
                            <Select size="small" value={draft.duration ?? ""} displayEmpty onChange={(e) => updateDraft("duration", e.target.value)}>
                              {ConstantService.Duration.map(d => (
                                <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.Duration.find(d => d.value === t.duration)?.label || "-")}
                        </Row>

                        <Row label="Certificate Issued">
                          {isEdit ? (
                            <Select size="small" value={draft.certificateIssued} onChange={(e) => updateDraft("certificateIssued", e.target.value)}>
                              {ConstantService.YesNo.map(s => (
                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.YesNo.find(s => s.value === t.certificateIssued)?.label || "No")}
                        </Row>

                        <Row label="Notes">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/admin/notes/${t.user_id}`)}
                          >
                            <CalendarDays size={16} className="text-primary" />
                          </IconButton>
                        </Row>

                        <Row label="Shift">
                          {isEdit ? (
                            <Select size="small" value={draft.shift ?? ""} onChange={(e) => updateDraft("shift", e.target.value)}>
                              {ConstantService.Shift.map(s => (
                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.Shift.find(s => s.value === t.shift)?.label || "-")}
                        </Row>

                        <Row label="Want To Board">
                          {isEdit ? (
                            <Select disabled={draft.trainingStatus != "completed"} size="small" value={draft.wantToBoard} onChange={(e) => updateDraft("wantToBoard", e.target.value)}>
                              {ConstantService.YesNo.map(s => (
                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.YesNo.find(s => s.value === t.wantToBoard)?.label || "-")}
                        </Row>

                        <Row label="NDA Signed">
                          {isEdit ? (
                            <Select size="small" value={draft.ndaSigned} onChange={(e) => updateDraft("ndaSigned", e.target.value)}>
                              {ConstantService.YesNo.map(s => (
                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.YesNo.find(s => s.value === t.ndaSigned)?.label || "No")}
                        </Row>

                        <Row label="Aadhar Submitted">
                          {isEdit ? (
                            <Select size="small" value={draft.adharSubmitted} onChange={(e) => updateDraft("adharSubmitted", e.target.value)}>
                              {ConstantService.YesNo.map(s => (
                                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
                              ))}
                            </Select>
                          ) : (ConstantService.YesNo.find(s => s.value === t.adharSubmitted)?.label || "No")}
                        </Row>

                        <Row label="Remarks">
                          {isEdit ? (
                            <TextField size="small" value={draft.remarks2 || ""} onChange={(e) => updateDraft("remarks2", e.target.value)} />
                          ) : (t.remarks2 || "-")}
                        </Row>
                      </>
                    )}

                </div>
                {/* Footer */}
                <div className="border-t px-4 py-3 flex justify-between items-center">
                  <div className="flex gap-3">
                    {isEdit ? (
                      <>
                        {/* Save */}
                        <button
                          onClick={() => saveTrainee(t.user_id)}
                          className="
          group flex items-center gap-2
          w-9 hover:w-24
          rounded-full bg-primary text-white
          px-2 py-1
          overflow-hidden
          transition-all duration-300 ease-in-out
          cursor-pointer
        "
                        >
                          <Save size={18} className="shrink-0" />
                          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Save
                          </span>
                        </button>

                        {/* Cancel */}
                        <button
                          onClick={() => setEditingId(null)}
                          className="
          group flex items-center gap-2
          w-9 hover:w-28
          rounded-full bg-primary text-white
          px-2 py-2
          overflow-hidden
          transition-all duration-300 ease-in-out
          cursor-pointer
        "
                        >
                          <X size={18} className="shrink-0" />
                          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Cancel
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Edit */}
                        <button
                          onClick={() => startEdit(t)}
                          className="
          group flex items-center gap-2
          w-9 hover:w-24
          rounded-full bg-primary text-white
          px-2 py-2
          overflow-hidden
          transition-all duration-300 ease-in-out
        "
                        >
                          <PenIcon size={18} className="shrink-0" />
                          <span className="cursor-pointer whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Edit
                          </span>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteTrainee(t.user_id)}
                          className="
          group flex items-center gap-2
          w-9 hover:w-28
          rounded-full bg-primary text-white
          px-2 py-2
          overflow-hidden
          transition-all duration-300 ease-in-out
        "
                        >
                          <Trash2Icon size={18} className="shrink-0" />
                          <span className="cursor-pointer whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Delete
                          </span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {/* Certificate */}
                    <button
                      disabled={t.trainingStatus !== "completed"}
                      onClick={() => {
                        setGenerateType("certificate");
                        setSelectedTrainee(t);
                        setCertificate({
                          joinedDate: t.joinedDate,
                          endDate:
                            t.joinedDate && t.duration
                              ? calculateEndDate(t.joinedDate, t.duration).datepicker
                              : "",
                          name: t.name,
                          duration: t.duration,
                          batch: t?.batches[0].name,
                        });
                        setOpenGenerateModal(true);
                      }}
                      className="
      group flex items-center gap-2
      w-9 hover:w-32
      rounded-full bg-primary text-white
      px-2 py-2
      overflow-hidden
      transition-all duration-300 ease-in-out
      disabled:opacity-50 disabled:cursor-not-allowed
      cursor-pointer
    "
                    >
                      <Award size={18} className="shrink-0" />
                      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Certificate
                      </span>
                    </button>

                    {/* Offer Letter */}
                    <button
                      disabled={t.trainingStatus !== "completed"}
                      onClick={() => {
                        setGenerateType("offer");
                        setSelectedTrainee(t);
                        setOfferForm({
                          joinedAt: t.joinedDate || "",
                          name: t.name || "",
                          firstName: t.name?.split(" ")[0] || "",
                          duration: t.duration || "",
                          technology: t.batches[0].name || "",
                          compensation: "",
                          signerName: "",
                          signerDesignation: "",
                          contactPerson: "",
                          signerMobile: "",
                        });
                        setOpenGenerateModal(true);
                      }}
                      className="
      group flex items-center gap-2
      w-9 hover:w-32
      rounded-full bg-primary text-white
      p-2
      overflow-hidden
      transition-all duration-300 ease-in-out
      disabled:opacity-50 disabled:cursor-not-allowed
      cursor-pointer
    "
                    >
                      <FileTextIcon size={18} className="shrink-0" />
                      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Offer Letter
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
      {generateType === "certificate" && (
        <Modal
          css={"w-1/2"}
          open={openGenerateModal}
          onClose={() => setOpenGenerateModal(false)}
          title="Generate Certificate"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGeneratecertificate();
            }}
            className="space-y-6 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Joining Date */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    JoinedDate
                  </label>
                  <input
                    type="date"
                    value={certificate.joinedDate || ""}
                    onChange={(e) =>
                      handleChangecertificate("joinedDate", e.target.value)
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.joinedDate
                        ? "border-red-400 animate-shake"
                        : "border-slate-300"
                      }
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.joinedDate && (
                    <p className="text-xs text-red-500">{errors.joinedDate}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    EndDate
                  </label>
                  <input
                    type="date"
                    value={certificate.endDate || ""}
                    onChange={(e) =>
                      handleChangecertificate("endDate", e.target.value)
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.endDate
                        ? "border-red-400 animate-shake"
                        : "border-slate-300"
                      }
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.endDate && (
                    <p className="text-xs text-red-500">{errors.endDate}</p>
                  )}
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Name
                  </label>
                  <input
                    value={certificate.name || ""}
                    onChange={(e) =>
                      handleChangecertificate("name", e.target.value)
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.name
                        ? "border-red-400 animate-shake"
                        : "border-slate-300"
                      }
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Duration */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Duration
                  </label>

                  <select
                    value={certificate.duration || ""}
                    onChange={(e) =>
                      handleChangecertificate("duration", e.target.value)
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-sm
      ${errors.duration ? "border-red-400" : "border-slate-300"}
      bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  >
                    <option value="">Select duration</option>
                    {ConstantService.Duration.map((tech) => (
                      <option key={tech.value} value={tech.value}>
                        {tech.label}
                      </option>
                    ))}
                  </select>

                  {errors.duration && (
                    <p className="text-xs text-red-500">{errors.duration}</p>
                  )}
                </div>

                {/* Batches */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Batches
                  </label>
                  <select
                    name="batch"
                    value={certificate?.batch || "Select Batch"}
                    onChange={(e) =>
                      handleChangecertificate("batch", e.target.value)
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-sm
                          ${errors.technology
                        ? "border-red-400"
                        : "border-slate-300"
                      }
                          bg-white text-slate-800
                          focus:outline-none focus:ring-2 focus:ring-primary/40 transition`}
                  >
                    <option value="">Select Batch</option>
                    {batches.map((tech) => (
                      <option key={tech.technology} value={tech.technology}>
                        {tech.technology}
                      </option>
                    ))}
                  </select>
                  {errors.batch && (
                    <p className="text-xs text-red-500">{errors.batch}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Manager
                  </label>
                  <input
                    value={certificate.manager || ""}
                    onChange={(e) =>
                      handleChangecertificate("manager", e.target.value)
                    }
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.manager
                        ? "border-red-400 animate-shake"
                        : "border-slate-300"
                      }
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.manager && (
                    <p className="text-xs text-red-500">{errors.manager}</p>
                  )}
                </div>

              </div>
            </div>

            {/* -------- ACTIONS -------- */}
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setOpenGenerateModal(false);
                }}
                className="
      px-5 py-2 text-sm rounded-xl
      border border-slate-300
      text-slate-700
      hover:bg-slate-100
      transition
      cursor-pointer
    "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
      px-5 py-2 text-sm font-semibold rounded-xl
      bg-linear-to-r from-primary to-primary-dark
      text-white shadow-md
      transition active:scale-95
      cursor-pointer
    "
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
      {generateType === "offer" && (
        <Modal
          css={"w-1/2"}
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
                {/* Joining Date */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    value={offerForm.joinedAt || ""}
                    onChange={(e) => handleChange("joinedAt", e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.joinedAt
                        ? "border-red-400 animate-shake"
                        : "border-slate-300"
                      }
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.joinedAt && (
                    <p className="text-xs text-red-500">{errors.joinedAt}</p>
                  )}
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Name
                  </label>
                  <input
                    value={offerForm.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.name
                        ? "border-red-400 animate-shake"
                        : "border-slate-300"
                      }
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* First Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    First Name
                  </label>
                  <input
                    value={offerForm.firstName || ""}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.firstName ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>

                {/* Duration */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Duration
                  </label>
                  <input
                    value={offerForm.duration || ""}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.duration ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.duration && (
                    <p className="text-xs text-red-500">{errors.duration}</p>
                  )}
                </div>

                {/* Technology */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Technology
                  </label>
                  <input
                    value={offerForm.technology || ""}
                    onChange={(e) => handleChange("technology", e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.technology ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.technology && (
                    <p className="text-xs text-red-500">{errors.technology}</p>
                  )}
                </div>

                {/* Compensation */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Compensation
                  </label>
                  <input
                    value={offerForm.compensation || ""}
                    onChange={(e) => handleChange("compensation", e.target.value)}
                    className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.compensation ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                  />
                  {errors.compensation && (
                    <p className="text-xs text-red-500">{errors.compensation}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Signer Name
                </label>
                <input
                  value={offerForm.signerName || ""}
                  onChange={(e) => handleChange("signerName", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.signerName ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                />
                {errors.signerName && (
                  <p className="text-xs text-red-500">{errors.signerName}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Signer Designation
                </label>
                <input
                  value={offerForm.signerDesignation || ""}
                  onChange={(e) =>
                    handleChange("signerDesignation", e.target.value)
                  }
                  className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.signerDesignation ? "border-red-400" : "border-slate-300"
                    }
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                />
                {errors.signerDesignation && (
                  <p className="text-xs text-red-500">
                    {errors.signerDesignation}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Contact Person
                </label>
                <input
                  value={offerForm.contactPerson || ""}
                  onChange={(e) => handleChange("contactPerson", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.contactPerson ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                />
                {errors.contactPerson && (
                  <p className="text-xs text-red-500">{errors.contactPerson}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Signer Mobile No
                </label>
                <input
                  value={offerForm.signerMobile || ""}
                  onChange={(e) => handleChange("signerMobile", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-sm
              ${errors.signerMobile ? "border-red-400" : "border-slate-300"}
              bg-white focus:outline-none focus:ring-2 focus:ring-primary/40`}
                />
                {errors.signerMobile && (
                  <p className="text-xs text-red-500">{errors.signerMobile}</p>
                )}
              </div>
            </div>

            {/* -------- ACTIONS -------- */}
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setOpenGenerateModal(false);
                }}
                className="
      px-5 py-2 text-sm rounded-xl
      border border-slate-300
      text-slate-700
      hover:bg-slate-100
      transition
      cursor-pointer
    "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
      px-5 py-2 text-sm font-semibold rounded-xl
      bg-linear-to-r from-primary to-primary-dark
      text-white shadow-md
      transition active:scale-95
      cursor-pointer
    "
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

    </>
  );
};

export default Trainee;

const Row = ({ label, children }) => (
  <div className="flex justify-between items-center gap-2">
    <span className="text-gray-500">{label}</span>
    <div className="text-right font-medium">{children}</div>
  </div>
);
