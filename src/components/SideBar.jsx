import { User2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const mainMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
];

const managementMenu = [
    { name: "Batches", path: "/admin/batches" },
    { name: "Trainers", path: "/admin/trainers" },
    { name: "Trainees", path: "/admin/trainees" },
];

const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition
   ${isActive
        ? "bg-[#FB8924]/20 text-[#FB8924]"
        : "text-gray-700 hover:bg-[#FB8924]/10"
    }`;

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r px-6 py-6 flex flex-col">
            {/* Logo */}
            <div className="flex items-center mb-10 space-x-2">
                <div className="p-1 shadow rounded-2xl">
                    <img src="/logo.png" alt="logo" className="w-8 h-8" />
                </div>
                <h1 className="text-md font-bold">Rover Training Hub</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-6">
                {/* Main */}
                <div className="space-y-2">
                    {mainMenu.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={linkClass}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Management Section */}
                <div>
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-2 mt-10">
                        Management
                    </p>

                    <div className="space-y-2">
                        {managementMenu.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={linkClass}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Profile */}
            <div className="flex items-center gap-3 absolute bottom-10">
                <User2/>
                <span className="text-sm font-medium">Admin</span>
            </div>
        </aside>
    );
}
