import { LogOut, NotebookTabsIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ApiService } from "../Services/ApiService"
import Cookie from "js-cookie"

const Header = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await ApiService.get("/api/users/logout");
        Cookie.remove("accessToken")
        navigate("/login");
    };

    return (
        <>
            <div className="flex justify-between items-center bg-transparent bg-white p-4">
                <div className="flex items-center space-x-4 text-xl font-bold">
                    <div className="bg-white shadow w-10 rounded-xl ">
                        <img src="/logo.png" alt="Logo" />
                    </div>
                    <h1>Rover Training Hub</h1>
                </div>
                <div className="flex text-sm space-x-4">
                    <button className="flex items-center space-x-2 bg-primary text-white p-2 cursor-pointer rounded-lg hover:bg-primary-dark"
                        onClick={() => navigate(`/trainee/notes/${1}`)}>
                        <NotebookTabsIcon size={16} />
                        <span>Add Notes</span>
                    </button>
                    <div>
                        <button value={"Logout"} className="flex items-center space-x-2 px-4 text-sm bg-primary text-white p-2 cursor-pointer hover:bg-primary-dark rounded-lg" onClick={handleLogout}>
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header