import {
    Layers,
    UserCheck,
    Users,
    Plus,
    LogOut,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import { ApiService } from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BlockingLoader from "../../components/BlockingLoader";
import Cookies from "js-cookie"

export default function Dashboard() {
    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([])
    const [trainees, setTrainees] = useState([])
    const [batches, setBatches] = useState([])
    const [pendingTrainees, setPendingTrainees] = useState([])
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        await ApiService.get("/api/users/logout");
        Cookies.remove('accessToken')
        navigate("/login");
    };

    const handleStatus = async (id, bool) => {
        await ApiService.put(`api/trainees/update/${id}`, { admissionStatus: bool ? "approved" : "blocked" })

    }

    const fetchTrainees = async () => {
        const res = await ApiService.get("/api/trainees/getAll");
        setPendingTrainees(res.filter((item) => item.status == "pending"))
        setTrainees(res.filter((item) => !item.softDelete));
    };

    const fetchAllTrainers = async () => {
        const result = await ApiService.get("/api/trainer/getAll");
        setTrainers(result || []);
    };

    const fetchBatches = async () => {
        const result = await ApiService.get("/api/batch/getallbatchwithdetail");
        setBatches(result || []);
    };
    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);

            try {
                await Promise.all([
                    fetchTrainees(),
                    fetchAllTrainers(),
                    fetchBatches()
                ]);
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, []);


    return (
        <>
            {loading && <BlockingLoader />}

            <div className="
      min-h-screen
      bg-gradient-to-br from-orange-50 via-white to-orange-100
      p-6 space-y-10
    ">

                {/* ================= HEADER ================= */}
                <div className="
        flex items-center justify-between
        bg-white/70 backdrop-blur-xl
        rounded-3xl p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        border border-white/40
      ">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Dashboard Overview
                        </h1>
                        <p className="text-sm text-gray-500">
                            Manage training operations and registrations
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleLogout}
                            className="
                            cursor-pointer
              flex items-center gap-2
              bg-linear-to-r from-primary to-primary-dark 
              text-white px-4 py-2 rounded-xl
              text-sm font-medium shadow-md
              hover:opacity-95
            "
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* ================= STATS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Total Batches", value: batches.length, icon: Layers },
                        { label: "Total Trainers", value: trainers.length, icon: UserCheck },
                        { label: "Total Trainees", value: trainees.length, icon: Users },
                        { label: "Pending Approvals", value: pendingTrainees.length, icon: AlertCircle }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="
              bg-white/70 backdrop-blur-xl
              rounded-3xl p-6
              border border-white/40
              shadow-[0_4px_10px_rgba(0,0,0,0.08)]
            "
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">{item.label}</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-1">
                                        {item.value}
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-xl text-orange-500">
                                    <item.icon size={22} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= PENDING APPROVAL =================
            <div className="
        max-w-sm
        bg-white/70 backdrop-blur-xl
        rounded-3xl p-6
        border border-white/40
        shadow-[0_4px_10px_rgba(0,0,0,0.08)]
      ">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <AlertCircle size={16} className="text-red-500" />
                    Pending Approvals
                </div>
                <p className="text-3xl font-bold text-red-600 mt-2">3</p>
                <p className="text-xs text-gray-500">
                    Requires immediate attention
                </p>
            </div> */}

                {/* ================= RECENT REGISTRATIONS ================= */}
                <div className="
        bg-white/70 backdrop-blur-xl
        rounded-3xl p-6
        border border-white/40
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        space-y-4
      ">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Recent Registrations
                            </h2>
                            <p className="text-sm text-gray-500">
                                Latest 5 trainee applications
                            </p>
                        </div>

                        <button className="
            flex items-center gap-1
            text-sm font-medium text-orange-500
            hover:underline
          ">
                            View all
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="space-y-2 min-h-65 flex flex-col justify-center">
                        {trainees.length === 0 ? (
                            /* -------- EMPTY STATE -------- */
                            <div className="
      flex flex-col items-center justify-center
      text-center text-gray-400
      h-full
    ">
                                <p className="text-sm font-medium">
                                    No recent registrations
                                </p>
                                <p className="text-xs mt-1">
                                    New trainees will appear here
                                </p>
                            </div>
                        ) : (
                            trainees
                                .slice()
                                .reverse()
                                .slice(0, 5)
                                .map((user, index) => (
                                    <div
                                        key={index}
                                        className="
            flex items-center justify-between
            bg-white rounded-xl px-4 py-3
            shadow-sm
            hover:bg-orange-50 transition
          "
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user.email} · {user.phone}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${user.status === "approved"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-orange-100 text-orange-600"
                                                    }
              `}
                                            >
                                                {user.status}
                                            </span>

                                            {user.status === "pending" && (
                                                <>
                                                    <button className="cursor-pointer text-green-600 text-sm font-medium" onClick={() => handleStatus(user.user_id, true)}>
                                                        Approve
                                                    </button>
                                                    <button className="cursor-pointer text-red-500 text-sm font-medium" onClick={() => handleStatus(user.user_id, false)}>
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="text-center text-xs text-gray-400 pt-6">
                    System status healthy · All services operational
                </div>
            </div>


        </>
    );
}
