import { useState } from "react";
import BatchCard from "./BatchCard";
import { Plus } from "lucide-react";
import AddBatchModal from "./AddBatch";
import EditBatchModal from "./EditBatch";
import { useEffect } from "react";
import { ApiService } from "../../Services/ApiService";
import BlockingLoader from "../../components/BlockingLoader";
import DeleteBatchModal from "./DeleteBatch";

const Batches = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selected, setSelected] = useState(null);
    const [batches, setBatches] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchBatches = async () => {
        try {
            setLoading(true)
            const result = await ApiService.get("/api/batch/getallbatchwithdetail")
            setBatches(result)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchBatches()
    }, [])
    
    return (

        <>
            {loading && <BlockingLoader />}
            < section
                className="
            min-h-screen
            bg-gradient-to-br from-orange-50 via-white to-orange-100
            p-8 space-y-8
            "
            >
                <AddBatchModal
                    open={openAdd}
                    onClose={() => setOpenAdd(false)}
                    onSuccess={fetchBatches}
                />

                <EditBatchModal
                    open={openEdit}
                    batch={selected}
                    onClose={() => setOpenEdit(false)}
                    onSuccess={fetchBatches}
                />

                <DeleteBatchModal
                    open={openDelete}
                    batch={selected}
                    onClose={() => setOpenDelete(false)}
                    onSuccess={fetchBatches}
                />

                {/* -------- HEADER -------- */}
                <div
                    className="
      bg-white/70 backdrop-blur-xl
      rounded-3xl p-6
      border border-white/40
      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      flex items-center justify-between
    "
                >
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Training Courses
                        </h2>
                        <p className="text-sm text-gray-500">
                            Manage trainers and enrolled trainees per courses.
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenAdd(true)}
                        className="
        inline-flex items-center gap-2
        bg-gradient-to-r from-[#FB8924] to-[#f27f1c]
        text-white px-5 py-2.5
        rounded-xl
        text-sm font-medium
        shadow-md
        hover:opacity-95
      "
                    >
                        <Plus size={16} />
                        Add Course
                    </button>
                </div>

                {/* -------- BATCH LIST -------- */}
                <div
                    className="
      bg-white/60 backdrop-blur-xl
      rounded-3xl p-5
      border border-white/40
      shadow-[0_20px_60px_rgba(0,0,0,0.06)]
      space-y-4
    "
                >
                    {batches.length === 0 ? (
                        <div className="text-center text-gray-400 py-10">
                            <p className="font-medium">No batches created yet</p>
                            <p className="text-sm mt-1">
                                Click “Add Batch” to get started
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {batches.map((batch) => (
                                <BatchCard key={batch.id} id={batch.id} trainer={batch.Trainers} prices={batch.prices}
                                    technology={batch.technology}
                                    traineeCount={batch.traineeCount} setSelected={setSelected} setIsEditOpen={setOpenEdit} setIsDeleteOpen={setOpenDelete} />
                            ))}
                        </div>

                    )}
                </div>
            </section >

        </>


    );
}
export default Batches