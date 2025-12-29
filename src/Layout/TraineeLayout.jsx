import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const TraineeLayout = () => {
    return (
        <>
            <div className="bg-linear-to-br
    from-orange-50
    via-white
    to-orange-100">
                <Header />
                <Outlet />
            </div>
        </>
    )
}

export default TraineeLayout