import Modal from "../../components/Modal"
import { useState } from "react";
import { ApiService } from "../../Services/ApiService";

const AddTrainerModal = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = "Name required";
        }

        if (!formData.email) {
            errors.name = "Email required"
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return;
        try {
            setSubmitting(true)
            await ApiService.post("/api/users/createtrainer", formData);
            onSuccess()
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Modal open={open} onClose={onClose} title="Add Trainer">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 animate-in fade-in zoom-in-95 duration-200"
                >

                    {/* Trainer Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700">
                            Trainer Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="laalo"
                            className={`w-full rounded-lg border px-3 py-3 text-sm
          ${errors.name ? "border-red-400 animate-shake" : "border-slate-300"}
          bg-white text-slate-800
          focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40 transition`}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Trainer Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-700">
                            Trainer Email
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="techrover@trainee.us"
                            className={`w-full rounded-lg border px-3 py-3 text-sm
          ${errors.name ? "border-red-400 animate-shake" : "border-slate-300"}
          bg-white text-slate-800
          focus:outline-none focus:ring-2 focus:ring-[#FB8924]/40 transition`}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 text-sm font-semibold rounded-lg
          bg-[#FB8924] text-white hover:bg-[#f27f1c]
          transition active:scale-95 disabled:opacity-60"
                        >
                            {submitting ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddTrainerModal