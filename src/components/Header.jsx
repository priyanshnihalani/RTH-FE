import { LogOut, NotebookTabsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "../Services/ApiService";
import Cookie from "js-cookie";

const Header = (id) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await ApiService.get("/api/users/logout");
    Cookie.remove("accessToken");
    navigate("/login");
  };

  return (
    <header className="
      bg-white
      px-4 sm:px-8
      py-6
      flex flex-col sm:flex-row
      sm:items-center
      sm:justify-between
      gap-4
      shadow-sm
    ">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="bg-white shadow w-10 h-10 rounded-xl flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-7 h-7" />
        </div>
        <h1 className="text-lg sm:text-xl font-bold">
          Rover Training Hub
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => navigate(`/trainee/notes/${id.id}`)}
          className="
            flex items-center gap-2
            bg-primary text-white
            px-4 py-2
            rounded-xl
            text-sm
            hover:bg-primary-dark
            cursor-pointer
          "
        >
          <NotebookTabsIcon size={16} />
          Add Notes
        </button>

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            bg-primary text-white
            px-4 py-2
            rounded-xl
            text-sm
            hover:bg-primary-dark
            cursor-pointer
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;