import { Mail, LockIcon, Eye, School, Donut, ChartBarIncreasing, ChartBar, ChartCandlestickIcon, ArrowRight, Contact, Phone, LucideCircleArrowRight } from "lucide-react"
import { useState } from "react";
import { Link, replace, useNavigate } from 'react-router-dom'
import { ApiService } from "../../Services/ApiService";
import BlockingLoader from "../../components/BlockingLoader";
import Cookies from "js-cookie";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    // 🔹 Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });

        // Remove error while typing
        setErrors({
            ...errors,
            [e.target.id]: "",
        });
    };

    // 🔹 Validation logic
    const validate = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
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
                "/api/users/login",
                formData
            );

            const { accessToken, role, status } = res;

            Cookies.set("accessToken", accessToken, {
                expires: 1,
                sameSite: "lax",
            });


            if (status === "pending") {
                navigate("/waiting", { replace: true });
                return;
            }

            navigate("/", { replace: true })

        } catch (err) {
            setErrors({
                password:
                    err?.response?.data?.message ||
                    "Invalid email or password",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading && <BlockingLoader />}
            <div class="font-[Inter] bg-slate-50 font-display text-slate-900 min-h-screen  flex flex-col">
                <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div class="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-orange-100 rounded-full blur-3xl opacity-70 mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]"></div>
                    <div class="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] bg-slate-100 rounded-full blur-3xl opacity-80 mix-blend-multiply"></div>
                    <div class="absolute bottom-[5%] left-[20%] w-[20vw] h-[20vw] bg-orange-200/40 rounded-full blur-3xl"></div>
                    <div class="absolute top-32 left-32 text-orange-200/50 transform rotate-12 hidden lg:block">
                        <School size={128} />
                    </div>
                    <div class="-z-9999 absolute bottom-20 right-10 text-slate-200/60 transform -rotate-12 hidden lg:block">
                        <Donut size={256} />
                    </div>
                    <div class="absolute top-1/2 left-1/4 w-6 h-6 bg-primary/20 rounded-full"></div>
                    <div class="absolute top-1/3 right-1/4 w-12 h-12 border-4 border-primary/10 rounded-xl transform rotate-45"></div>
                </div>
                <div class="border-b border-white/40 bg-white/40 backdrop-blur-md sticky top-0 z-50">
                    <div class="max-w-360 mx-auto px-4 md:px-8">
                        <header class="flex items-center justify-between h-16">
                            <div class="flex items-center gap-3">
                                <div class="size-9 text-primary flex items-center justify-center rounded-xl bg-gradient-to-br from-white to-orange-50 shadow-sm border border-white">
                                    <span class="material-symbols-outlined text-2xl"><img src="./logo.png" /></span>
                                </div>
                                <h2 class="text-lg font-bold tracking-tight text-slate-800">Rover Training Hub</h2>
                            </div>
                            <div class="hidden sm:flex items-center gap-4">
                                <button class="flex items-center justify-center rounded-lg h-9 px-4 bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-orange-200/50 hover:shadow-orange-300">
                                    <Phone size={15} />
                                    <span className="ml-2">
                                        Contact Support
                                    </span>
                                </button>
                            </div>
                        </header>
                    </div>
                </div>
                <main class="flex-1 flex items-center justify-center relative z-10 w-full p-4 lg:p-8">
                    <div class="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                        <div class="hidden lg:flex flex-1 flex-col justify-center space-y-10 relative pl-4">
                            <div class="space-y-6 max-w-lg z-10">
                                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-white text-primary text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                                    <span class="flex h-2 w-2 relative">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FB8924] opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    Productivity Hub
                                </div>
                                <h1 class="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                    Elevate your <br />
                                    <span class="text-transparent bg-clip-text bg-primary">career's potential</span>
                                </h1>
                                <p class="text-lg text-slate-600 leading-relaxed max-w-md font-body">
                                    Seamlessly access training modules, track progress and insights, and grow through continuous learning.
                                </p>
                            </div>
                            <div class="relative h-64 w-full max-w-md perspective-1000 pointer-events-none">
                                <div class="absolute top-0 left-0 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 w-64 transform -rotate-3 animate-float">
                                    <div class="flex items-center gap-3 mb-4">
                                        <div class="bg-orange-100 p-2.5 rounded-xl text-primary ">
                                            <ChartCandlestickIcon rotate={20} />
                                        </div>
                                        <div>
                                            <div class="h-2.5 w-24 bg-slate-200 rounded-full mb-1.5"></div>
                                            <div class="h-2 w-16 bg-slate-100 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div class="space-y-3">
                                        <div class="flex justify-between items-center text-xs text-slate-400 font-medium">
                                            <span>Completion</span>
                                            <span class="text-primary">85%</span>
                                        </div>
                                        <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div class="h-full bg-gradient-to-r from-orange-300 to-primary w-[85%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="absolute top-24 left-48 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60 w-auto transform rotate-3 animate-float-delayed">
                                    <div class="flex items-center gap-4">
                                        <div class="flex -space-x-3 rtl:space-x-reverse">
                                            <img alt="User" class="w-10 h-10 border-2 border-white rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqExoQuutYA-Jizx99YMyBJcyhwd6rF8bhBIqnhmdxC8XFzmxqlor_7C1FDR_Ws6KGsOhx2im_3Yce0UNapHfPYeP9QulbYhdvjF2H8u7Nw4REEOiQXNWKD0yQO2xLUF72Hs1ZD0aIVnrIrl9qn7aggmAB7s-AKvHDTf_7vhudhGlvlkrhcIwjQItG8t0XoXzvMlgTlT6oZn6qbIgtvI3gchU9r8yONbUNp6EMhclPgBCCMXGxgWnDPbamwXjHxfg6LpIgNHKWs9y_" />
                                            <img alt="User" class="w-10 h-10 border-2 border-white rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbYp27HXg7f_R-DXDuipqZ9ydVMBp_SG6128mdU7AHAf3kI17NIjhAJ2DAhF4PmbIuqkzb66ZEkdnRn5jDZDh3TiZmqfH3PP2I_rvnP-qaw_JGI3k0WnIAWFyp_guMOtJWISZvX_Phv0CzFDn5NJmfVCBbu1Sc7kf9hBF4Z-dQfPHaDPoAi0eTLIdoKaIPXP_IX2kNa7BQYCbXZwokxeOslt-pWX12jmWeNk__90ubRpI19Prw4KBZvXXyWLytjmOKjCF9HMD90IWR" />
                                            <div class="w-10 h-10 border-2 border-white rounded-full bg-orange-50 flex items-center justify-center text-xs font-bold text-primary shadow-sm">+42</div>
                                        </div>
                                        <div class="text-sm pr-2">
                                            <span class="block font-bold text-slate-800">Active Now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-100 relative mt-8 lg:mt-0"
                        >
                            {/* Soft background glow */}
                            <div className="absolute inset-0 bg-linear-to-br from-orange-200 to-blue-100 rounded-4xl rotate-6 translate-x-4 translate-y-6 blur"></div>

                            {/* Glass Card */}
                            <div className="
    rounded-[2rem] p-8 md:p-10 relative z-20
    bg-white/50 backdrop-blur-lg
    shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]
    ring-1 ring-slate-200
  ">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                        Welcome Back
                                    </h2>
                                    <p className="text-slate-500">
                                        Enter your credentials to access the workspace.
                                    </p>
                                </div>

                                <div className="space-y-5">

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
                                                id="email"
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
                                        </div>
                                        {errors.email && (
                                            <p className="text-sm text-red-500 ml-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-slate-700 ml-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                                <LockIcon size={18} />
                                            </div>
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className={`
              block w-full pl-11 pr-11 py-3.5 rounded-xl
              bg-white border
              ${errors.password ? "border-red-400" : "border-slate-200"}
              text-slate-900 placeholder-slate-400
              focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400
            `}
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-slate-600"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <Eye size={18} />
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <p className="text-sm text-red-500 ml-1">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Button */}
                                    <div className="pt-3">
                                        <button
                                            type="submit"
                                            className="
            w-full flex items-center justify-center gap-2
            rounded-xl h-12 px-6
            bg-orange-500 hover:bg-orange-600
            text-white font-semibold
            shadow-md hover:shadow-lg
            transition-all duration-200
          "
                                        >
                                            Sign In
                                            <LucideCircleArrowRight size={18} />
                                        </button>
                                    </div>

                                    <p className="text-center text-sm text-slate-500 mt-8">
                                        Don't have an account?
                                        <span className="ml-2 font-semibold text-orange-500 hover:underline cursor-pointer">
                                            <Link to={"/register"}>Register</Link>
                                        </span>
                                    </p>

                                </div>
                            </div>
                        </form>
                    </div>
                </main>

            </div>
        </>
    )
}

export default Login