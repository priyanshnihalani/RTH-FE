import Modal from "../../components/Modal";

const CreatePayment = ({
  open,
  onClose,
  activeItem,
  logForm,
  setLogForm,
  onSave,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Payment Log"
      css="w-full max-w-md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={logForm.amount}
            onChange={(e) =>
              setLogForm({ ...logForm, amount: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Received By
          </label>
          <input
            type="text"
            value={logForm.receivedBy}
            onChange={(e) =>
              setLogForm({ ...logForm, receivedBy: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Person name"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 cursor-pointer py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={() => onSave(activeItem, logForm)}
          className="px-4 cursor-pointer py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default CreatePayment;
