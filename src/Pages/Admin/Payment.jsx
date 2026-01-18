import { PlusCircle, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ApiService } from "../../Services/ApiService";
import CreatePayment from "./CreatePayment";
import { toast } from "react-toastify";
import BlockingLoader from "../../components/BlockingLoader";

const Payments = () => {
    const [data, setData] = useState([]);
    const [logs, setLogs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [mergedData, setMergedData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false)

    const [visibleCount, setVisibleCount] = useState(30);

    const [logForm, setLogForm] = useState({
        amount: "",
        receivedBy: "",
    });

    const loadTraineesBatchWise = async () => {
        try {
            const result = await ApiService.get("/api/trainees/getAllTraineesPerBatch");
            setData(result?.data || []);
            setLoading(true)
        }
        catch (err) {
            toast.error(err.message || "Something went wrong!")
        }
        finally {
            setLoading(false)
        }
    };

    const loadLogs = async () => {
        try {
            const result = await ApiService.get(`/api/payments/findAllPaymentLogs`);
            setLogs(result?.data || []);
            setLoading(true)
        }
        catch (err) {
            toast.error(err.message || "Something went wrong!")
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        Promise.all([loadTraineesBatchWise(), loadLogs()]);
    }, []);

    useEffect(() => {
        if (data && logs) {
            const merged = data.map((item) => {
                const relatedPayments = logs.filter(
                    (log) => log.batch_trainee_id === item.id
                );

                return {
                    ...item,
                    payments: relatedPayments,
                };
            });
            setMergedData(merged);
        }
    }, [data, logs]);

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200;

            if (nearBottom) {
                setVisibleCount((prev) => prev + 20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSave = async (item, form) => {
        const totalFee = Number(item.trainee.registration?.feesToPay || 0);

        const alreadyPaid = item.payments.reduce(
            (sum, p) => sum + Number(p.amount || 0),
            0
        );

        const remaining = totalFee - alreadyPaid;
        const amount = Number(form.amount);

        if (!amount || amount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        if (amount > remaining) {
            alert(`Amount exceeds remaining fees (₹${remaining})`);
            return;
        }

        const result = await ApiService.post("/api/payments/create", {
            batch_trainee_id: item.id,
            amount,
            receivedBy: form.receivedBy,
        });

        if (result?.success) {
            await loadLogs();
            setOpenModal(false);
            setLogForm({ amount: "", receivedBy: "" });
        }
    };

    const filteredData = useMemo(() => {
        return mergedData.filter((item) => {
            const traineeName = item.trainee.name.toLowerCase();
            const batchName = item.batch.technology.toLowerCase();
            const q = search.toLowerCase();
            return traineeName.includes(q) || batchName.includes(q);
        });
    }, [mergedData, search]);

    const limitedData = useMemo(
        () => filteredData.slice(0, visibleCount),
        [filteredData, visibleCount]
    );

    const groupedData = useMemo(() => {
        return limitedData.reduce((acc, item) => {
            const firstChar = item.trainee.name[0].toUpperCase();
            if (!acc[firstChar]) acc[firstChar] = [];
            acc[firstChar].push(item);
            return acc;
        }, {});
    }, [limitedData]);

    return (
        <>
            {loading && <BlockingLoader />}
            <div className="min-h-screen p-8 bg-linear-to-br from-orange-50 via-white to-orange-100">
                <div className="mb-6 bg-white p-5 rounded-2xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Trainee Payment Overview
                        </h1>
                        <p className="text-sm text-slate-500">
                            Track course-wise fees and payment history
                        </p>
                    </div>

                    <div className="relative w-sm">
                        <Search
                            className="absolute left-3 top-[1.2rem] text-gray-400"
                            size={18}
                        />
                        <input
                            placeholder="Search by name or email..."
                            className="
          w-full pl-10 p-4
          rounded-xl border-2 border-primary
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

                <div className="rounded-3xl bg-white p-6 space-y-10">
                    {Object.keys(groupedData)
                        .sort()
                        .map((letter) => (
                            <div key={letter}>
                                <div className="px-4 py-2 mb-4 bg-orange-100 text-orange-700 font-bold rounded-lg">
                                    {letter}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedData[letter].map((item) => {
                                        const trainee = item.trainee;
                                        const batch = item.batch;
                                        const reg = trainee.registration;

                                        const totalFee = Number(reg?.feesToPay || 0);
                                        const paid = item.payments.reduce(
                                            (sum, p) => sum + Number(p.amount || 0),
                                            0
                                        );
                                        const remaining = Math.max(totalFee - paid, 0);

                                        return (
                                            <div
                                                key={item.id}
                                                className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
                                            >
                                                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-t-2xl">
                                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                                                        {trainee.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-lg text-slate-800">
                                                            {trainee.name}
                                                        </div>
                                                        <div className="text-xs text-slate-500">Trainee</div>
                                                    </div>
                                                </div>

                                                <div className="p-4">
                                                    <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                                                        <div className="text-slate-500">Batch</div>
                                                        <div className="font-medium text-slate-800">
                                                            {batch.technology}
                                                        </div>

                                                        <div className="text-slate-500">Fees</div>
                                                        <div className="font-medium text-slate-800">
                                                            ₹{totalFee}
                                                        </div>
                                                    </div>

                                                    <hr className="my-3" />

                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className="font-semibold text-slate-800">
                                                            Payment Log
                                                        </div>
                                                        <button
                                                            className="cursor-pointer flex text-xs space-x-1 items-center px-2 py-1 rounded-md text-blue-600 hover:bg-blue-50"
                                                            onClick={() => {
                                                                setActiveItem(item);
                                                                setOpenModal(true);
                                                            }}
                                                        >
                                                            <PlusCircle size={14} /> <span>Add Logs</span>
                                                        </button>
                                                    </div>

                                                    <div className="text-sm text-slate-600 space-y-2">
                                                        {item.payments.length === 0 ? (
                                                            <div className="text-xs text-slate-400 italic">
                                                                No payment logs yet
                                                            </div>
                                                        ) : (
                                                            item.payments.map((log) => (
                                                                <div
                                                                    key={log.id}
                                                                    className="flex justify-between items-center"
                                                                >
                                                                    <span className="w-20">
                                                                        {new Date(
                                                                            log.receivedAt
                                                                        ).toLocaleDateString("en-GB", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                        })}
                                                                    </span>

                                                                    <span className="flex-1 text-center truncate">
                                                                        {log.receivedBy}
                                                                    </span>

                                                                    <span className="text-slate-800 font-medium">
                                                                        ₹{log.amount}
                                                                    </span>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>

                                                    <hr className="my-3" />

                                                    <div className="flex justify-between items-center font-semibold">
                                                        <span className="text-slate-700">
                                                            Remaining Fees
                                                        </span>
                                                        <span className="text-orange-600 text-lg">
                                                            ₹{remaining}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <CreatePayment
                open={openModal}
                activeItem={activeItem}
                logForm={logForm}
                setLogForm={setLogForm}
                onClose={() => {
                    setOpenModal(false);
                    setLogForm({ amount: "", receivedBy: "" });
                }}
                onSave={(item, form) => {
                    handleSave(item, form);
                }}
            />
        </>
    );
};

export default Payments;