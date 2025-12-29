import { LucideHourglass, Mail } from "lucide-react";
const Waiting = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111518] dark:text-white flex flex-col min-h-screen font-display">

            {/* ================= Header ================= */}
            <header className="flex items-center justify-between border-b border-[#f0f3f4] dark:border-[#2a343c] px-6 lg:px-10 py-3 bg-white dark:bg-[#1a2630]">
                <div className="flex items-center gap-4">
                    <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <img src="./logo.png" />
                    </div>
                    <h2 className="text-lg font-bold tracking-tight">
                        Rover Training Hub
                    </h2>
                </div>
            </header>

            {/* ================= Main ================= */}
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col w-full max-w-[600px]">

                    {/* Card */}
                    <div className="rounded-xl shadow-lg bg-white dark:bg-[#1a2630] border border-[#f0f3f4] dark:border-[#2a343c] overflow-hidden">

                        {/* Hero Section */}
                        {/* Hero Section */}
                        <div className="relative h-48 sm:h-64 bg-primary/5 dark:bg-primary/10 flex items-center justify-center overflow-hidden">

                            {/* Background glow */}
                            <div className="absolute w-72 h-72 bg-[#FB8924]/10 rounded-full blur-3xl"></div>
                            <div className="absolute w-40 h-40 bg-[#FBBB17]/20 rounded-full blur-2xl"></div>

                            {/* Icon Container */}
                            <div className="relative z-10 flex items-center justify-center">
                                {/* Outer Ring */}
                                <div className="absolute w-24 h-24 rounded-full border border-[#FB8924]/30 animate-ping"></div>

                                {/* Icon Badge */}
                                <div className="w-20 h-20 rounded-full bg-white dark:bg-[#1a2630] border border-primary/20 shadow-lg flex items-center justify-center">
                                    <LucideHourglass
                                        size={36}
                                        strokeWidth={2.2}
                                        className="text-primary animate-pulse"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Content */}
                        <div className="p-8 flex flex-col items-center text-center gap-6">

                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 dark:border-yellow-900/50 dark:bg-yellow-900/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                                </span>
                                <p className="text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase tracking-wide">
                                    Pending Review
                                </p>
                            </div>

                            {/* Text */}
                            <div className="space-y-3 max-w-md">
                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Registration Received
                                </h1>
                                <p className="text-[#617989] dark:text-slate-400">
                                    Thanks for signing up! We are currently verifying your training
                                    department credentials. This process typically takes{" "}
                                    <span className="font-semibold text-[#111518] dark:text-slate-200">
                                        24–48 hours
                                    </span>.
                                </p>
                                <p className="text-sm text-[#617989] dark:text-slate-400 pt-2">
                                    Please check your inbox for an activation email. You will be
                                    notified automatically once approved.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-[#f0f3f4] dark:bg-[#2a343c]"></div>

                            {/* Help */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center text-sm">
                                <span className="text-[#617989] dark:text-slate-500">
                                    Need assistance?
                                </span>
                                <span
                                    className="text-primary hover:text-[#FB8924] font-medium flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        <Mail />
                                    </span>
                                    Contact Support
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Footer Text */}
                    <p className="mt-8 text-center text-sm text-[#617989] dark:text-slate-500">
                        &copy; {new Date().getFullYear()} Training Dept MS. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Waiting;
