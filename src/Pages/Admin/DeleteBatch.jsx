import { useState } from "react";
import { ApiService } from "../../Services/ApiService";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import ToastLogo from "../../components/ToastLogo";

const DeleteBatchModal = ({ open, onClose, batch, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      const res = await ApiService.delete(
        `/api/batch/deleteBatch/${batch?.id}`
      );
      toast.success("Batch deleted successfully", {
                icon: <ToastLogo />,
                style: {
                  color: "#16a34a",
                },
                autoClose: 2000,
              });
      onSuccess();
      onClose();

    } catch (error) {
      toast.error("Failed to delete batch",{
                    icon: <ToastLogo />,
                style: {
                  color: "#16a34a",
                },
                autoClose: 2000,
              });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center p-6 space-y-4">

        <img
          src={"/logo.png"}
          alt="Company Logo"
          className="h-12"
        />

        <h2 className="text-xl font-semibold text-gray-800">
          Delete Batch?
        </h2>

        <p className="text-sm text-gray-500">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">
            {batch?.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex gap-3 pt-4 w-full">
          <button
            onClick={onClose}
            disabled={submitting}
            className="
              flex-1
              px-4 py-2
              rounded-lg
              border
              border-gray-300
              text-gray-700
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={submitting}
            className="
              flex-1
              px-4 py-2
              rounded-lg
              bg-primary
              text-white
              hover:bg-primary-dark
              disabled:opacity-60
            "
          >
            {submitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBatchModal;
