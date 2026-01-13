import {
  LayoutDashboard,
  Layers,
  Users,
  User,
  User2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const mainMenu = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
];

const managementMenu = [
  { name: "Batches", path: "/admin/batches", icon: Layers },
  { name: "Trainers", path: "/admin/trainers", icon: User },
  { name: "Trainees", path: "/admin/trainees", icon: Users },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg transition
   ${isActive
    ? "bg-[#FB8924]/20 text-[#FB8924]"
    : "text-gray-700 hover:bg-[#FB8924]/10"
  }
   justify-center md:justify-start`;

export default function Sidebar() {
  return (
    <aside className="relative h-full p-2 ">
      {/* Logo */}
      <div className="flex items-center mb-10 space-x-2 justify-center lg:justify-start">
        <div className="p-1 shadow rounded-2xl">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
        </div>
        <h1 className="text-md font-bold hidden lg:block">
          Rover Training Hub
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6">
        {/* Main */}
        <div className="space-y-2 border-b border-gray-400 pb-2 lg:pt-0 lg:border-0">
          {mainMenu.map(item => {
            const Icon = item.icon;
            return (
              <NavLink key={item.name} to={item.path} className={linkClass}>
                <Icon size={20} />
                <span className="hidden lg:inline">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Management */}
        <div>
          <p className="px-4 text-xs  font-semibold text-gray-400 uppercase mb-2 mt-10 hidden lg:block">
            Management
          </p>

          <div className="space-y-2 ">
            {managementMenu.map(item => {
              const Icon = item.icon;
              return (
                <NavLink key={item.name} to={item.path} className={linkClass}>
                  <Icon size={20} />
                  <span className="hidden lg:inline">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Profile */}
      <div className="flex items-center gap-3 absolute bottom-10 left-0 right-0 px-4 justify-center md:justify-start">
        <User2 size={20} />
        <span className="text-sm font-medium hidden lg:inline">Admin</span>
      </div>
    </aside>
  );
}