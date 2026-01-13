import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="lg:w-64 border-r bg-white">
        <Sidebar />
      </aside>

      {/* Page content */}
      <main className="flex-1 min-w-0 overflow-x-hidden bg-slate-50">
        <Outlet />
      </main>
    </div>

  );
};

export default AdminLayout;
