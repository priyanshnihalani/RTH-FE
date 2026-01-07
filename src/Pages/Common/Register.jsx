import { User, Mail, Phone, Lock, LucideCircleArrowRight } from "lucide-react";
import { useState } from "react";
import { ApiService } from "../../Services/ApiService";
import { useNavigate } from "react-router-dom";
import BlockingLoader from "../../components/BlockingLoader";
import Cookies from 'js-cookie'

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const res = await ApiService.post(
                "/api/users/register",
                { ...formData, role: "trainee" }
            );

            const { waitingToken } = res;

            Cookies.set("waitingToken", waitingToken, {
                expires: 365,
                sameSite: "lax",
            });

            navigate("/waiting", { replace: true });

        } catch (error) {
            console.log(
                error?.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <BlockingLoader />}
            <div className="min-h-screen bg-gradient-to-br from-[#f5faff] via-white to-[#eef6ff] relative overflow-hidden">

                {/* Top Bar */}
                <div className="flex justify-between items-center px-10 py-6">
                    <div className="flex items-center gap-2 font-semibold text-slate-800">
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                            <img src="./logo.png" alt="" />
                        </div>
                        Rover Training Hub
                    </div>

                    <button className="flex items-center gap-2 bg-[#FB8924] text-white px-5 py-2 rounded-lg shadow hover:bg-[#FBBB17] transition">
                        <Phone size={15} /> Contact Support
                    </button>
                </div>

                {/* Main Section */}
                <div className="max-w-7xl mx-auto px-10 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <div class="my-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-white text-primary text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                            <span class="flex h-2 w-2 relative">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB8924] opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Productivity Hub
                        </div>

                        <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
                            Begin your{" "}
                            <span className="text-[#FB8924]">learning journey</span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 max-w-xl">
                            Create your account to access training modules, track progress,
                            and collaborate with mentors in one unified workspace.
                        </p>

                        {/* Decorative Cards */}
                        <div className="mt-12 flex gap-6">
                            <div className="p-2 flex items-center space-x-2  bg-white rounded-2xl shadow-lg w-52">
                                <div className="flex items-center bg-[#FB8924] p-2 text-white h-full  rounded-l-2xl">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700">
                                        Secure Access</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Admin verified registration
                                    </p>
                                </div>
                            </div>

                            <div className="p-2 flex items-center space-x-2  bg-white rounded-2xl shadow-lg w-52">
                                <div className="flex items-center bg-[#FB8924] p-2 text-white h-full  rounded-l-2xl">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700">
                                        Structured Growth</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Guided Learning Path
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT REGISTER CARD */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-xl  relative mt-8 lg:mt-0"
                    >
                        {/* Soft background glow */}
                        <div className="
    absolute inset-0
    bg-linear-to-br from-orange-200 to-blue-100
    rounded-[2.5rem]
    rotate-6 translate-x-4 translate-y-6
    blur
  "></div>

                        {/* Glass Card */}
                        <div
                            className="
      relative z-20
      rounded-[2rem]
      p-8 md:p-10
      bg-white/50 backdrop-blur-lg
      shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]
      ring-1 ring-slate-200
    "
                        >
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                    Create Account
                                </h2>
                                <p className="text-slate-500">
                                    Fill in your details to register.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div className="flex space-x-2">

                                    {/* Full Name */}
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-slate-700 ml-1">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                                <User size={18} />
                                            </div>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className={`
    block w-full pl-11 pr-4 py-3.5 rounded-xl
    bg-white border
    ${errors.name ? "border-red-400" : "border-slate-200"}
    text-slate-900 placeholder-slate-400
    focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400
  `}
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-500 ml-1">{errors.name}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}

                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-slate-700 ml-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="name@company.com"
                                                className={`
    block w-full pl-11 pr-4 py-3.5 rounded-xl
    bg-white border
    ${errors.email ? "border-red-400" : "border-slate-200"}
    text-slate-900 placeholder-slate-400
    focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400
  `}
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500 ml-1">{errors.email}</p>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    {/* Phone */}
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-slate-700 ml-1">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="9876543210"
                                                className={`
    block w-full pl-11 pr-4 py-3.5 rounded-xl
    bg-white border
    ${errors.phone ? "border-red-400" : "border-slate-200"}
    text-slate-900 placeholder-slate-400
    focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400
  `}
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-red-500 ml-1">{errors.phone}</p>
                                            )}

                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-slate-700 ml-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className={`
    block w-full pl-11 pr-4 py-3.5 rounded-xl
    bg-white border
    ${errors.password ? "border-red-400" : "border-slate-200"}
    text-slate-900 placeholder-slate-400
    focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400
  `}
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-500 ml-1">{errors.password}</p>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-3">
                                    <button
                                        type="submit"
                                        className="
            w-full flex items-center justify-center gap-2
            rounded-xl h-12 px-6
            bg-[#FB8924] hover:bg-[#FBBB17]
            text-white font-semibold
            shadow-md hover:shadow-lg
            transition-all duration-200
          "
                                    >
                                        Create Account
                                        <LucideCircleArrowRight size={18} />
                                    </button>
                                </div>

                                {/* Footer */}
                                <p className="text-center text-sm text-slate-500 mt-8">
                                    Already have an account?
                                    <span className="ml-2 font-semibold text-[#FB8924] hover:underline cursor-pointer">
                                        Sign In
                                    </span>
                                </p>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
