import { useState, useEffect } from "react";
import { ApiService } from "../../Services/ApiService";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import ToastLogo from "../../components/ToastLogo";

const EditBatchModal = ({ open, onClose, batch, onSuccess }) => {
  const [formData, setFormData] = useState({
    technology: "",
    prices: {
      0.5: "",
      1: "",
      1.5: "",
      3: "",
      6: ""
    }
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (batch && open) {
      setFormData({
        technology: batch.technology || "",
        prices: {
          0.5: batch?.prices?.[0.5] || "",
          1: batch?.prices?.[1] || "",
          1.5: batch?.prices?.[1.5] || "",
          3: batch?.prices?.[3] || "",
          6: batch?.prices?.[6] || ""
        }
      });
      setErrors({});
    }
  }, [batch, open]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.technology?.trim()) {
      errors.technology = "Please select a technology";
    }

    const values = Object.values(formData.prices || {});
    const allEmpty = values.every(v => !v || v.trim() === "");

    if (allEmpty) {
      errors.price = "Please enter at least one fee";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await ApiService.put(`/api/batch/updateBatch/${batch?.id}`, formData);
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
      setSubmitting(false);
      onSuccess();
      onClose();
    }
  };


  return (
    <Modal css={'w-1/3'} open={open} onClose={onClose} title="Edit Batch">
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
              Technology
            </label>
            <input
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              placeholder="e.g. MERN – Jan 2025"
              className={`w-full rounded-xl border px-4 py-3 text-sm
                ${errors.name ? "border-red-400 animate-shake" : "border-slate-300"}
                bg-white text-slate-800
                focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40 transition`}
            />
            {errors.technology && (
              <p className="text-xs text-red-500">{errors.technology}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600">
              Batch Fees
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[0.5, 1, 1.5, 3, 6].map(month => (
                <div key={month} className="space-y-1">
                  <label className="text-[11px] text-slate-500">

                    {month == 0.5 ? " 15 Days" : month == 1.5 ? "45 Day" : `${month} Month`}{month > 1 ? "s" : ""}
                  </label>

                  <input
                    type="number"
                    value={formData.prices[month]}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        prices: {
                          ...prev.prices,
                          [month]: e.target.value
                        }
                      }))
                    }
                    className={`w-full rounded-xl border px-3 py-2 text-sm
            ${errors.price ? "border-red-400" : "border-slate-300"}
            focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40`}
                    placeholder="₹"
                  />
                </div>
              ))}
            </div>

            {errors.price && (
              <p className="text-xs text-red-500">{errors.price}</p>
            )}
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
            {submitting ? "Updating..." : "Update Batch"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBatchModal;
