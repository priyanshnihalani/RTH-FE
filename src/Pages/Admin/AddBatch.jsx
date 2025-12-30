import { useState } from "react";
import { ApiService } from "../../Services/ApiService";
import Modal from "../../components/Modal";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import ToastLogo from "../../components/ToastLogo";
const AddBatchModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    technology: "",
    startDate: null,
    endDate: null
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = "Batch name must be at least 3 characters";
    }
    if (!formData.technology) {
      errors.technology = "Please select a technology";
    }
    if (!formData.startDate && formData.endDate) {
      errors.startDate = "Start date is required";
    }
    if (!formData.endDate && formData.startDate) {
      errors.endDate = "End date is required";
    }
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      errors.endDate = "End date must be after start date";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await ApiService.post("/api/batch/create", formData);
      if (res.message == "Batch Created!") {
        toast.success("Batch Created Successfully!", {
          icon: <ToastLogo />,
          style: {
            color: "#16a34a",
          },
          autoClose: 2000,
        });
      }

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
    finally {
      setSubmitting(false);
      onClose();
      setFormData({
        name: "",
        endDate: null,
        startDate: null,
        technology: ""
      })
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Batch">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 animate-in fade-in zoom-in-95 duration-200"
      >

        {/* -------- BASIC INFO -------- */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">
            Batch Information
          </h3>

          {/* Batch Name */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              Batch Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. MERN – Jan 2025"
              className={`w-full rounded-xl border px-4 py-3 text-sm
                ${errors.name ? "border-red-400 animate-shake" : "border-slate-300"}
                bg-white text-slate-800
                focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40 transition`}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Technology */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              Technology
            </label>
            <select
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3 text-sm
                ${errors.technology ? "border-red-400" : "border-slate-300"}
                bg-white text-slate-800
                focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40 transition`}
            >
              <option value="">Select technology</option>
              <option value="MERN">MERN</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
            {errors.technology && (
              <p className="text-xs text-red-500">{errors.technology}</p>
            )}
          </div>
        </div>

        {/* -------- DATES -------- */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">
            Schedule
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm
                  ${errors.startDate ? "border-red-400" : "border-slate-300"}
                  bg-white text-slate-800
                  focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40 transition`}
              />
              {errors.startDate && (
                <p className="text-xs text-red-500">{errors.startDate}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm
                  ${errors.endDate ? "border-red-400" : "border-slate-300"}
                  bg-white text-slate-800
                  focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40 transition`}
              />
              {errors.endDate && (
                <p className="text-xs text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* -------- ACTIONS -------- */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="
              px-4 py-2 text-sm rounded-xl
              border border-slate-300
              text-slate-700
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="
              px-6 py-2 text-sm font-semibold rounded-xl
              bg-gradient-to-r from-[#FB8924] to-[#f27f1c]
              text-white shadow-md
              transition active:scale-95
              disabled:opacity-60
            "
          >
            {submitting ? "Creating..." : "Create Batch"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBatchModal;
