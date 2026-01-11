import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useState, useEffect } from "react"
import Cookie from "js-cookie"
import { ApiService } from "../Services/ApiService"
import BlockingLoader from "../components/BlockingLoader"

const TraineeLayout = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const loadData = async () => {
        try {
            const accesscookies = Cookie.get("accessToken")
            setLoading(true)
            const res = await ApiService.post("/api/users/auth/me", {
                accessToken: accesscookies
            });
            setData(res)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadData()
    }, [])


    return (
        <>
            {loading ? <BlockingLoader /> :
                <div className="bg-linear-to-br
            from-orange-50
            via-white
            to-orange-100">
                    <Header id={data?.id} />
                    <Outlet context={{ id: data?.id }} />
                </div>
            }
        </>
    )
}

export default TraineeLayout