import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { ApiService } from "../Services/ApiService";
import Cookie from "js-cookie"
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
        <div
          className="
      min-h-screen
      bg-linear-to-br
      from-orange-50
      via-white
      to-orange-100
      flex
      flex-col
      "
        >
          <Header id={data?.id} />

          <main className="flex-1 pb-6">
            <Outlet context={{trainerId: data?.id}}/>
          </main>
        </div>
      }
    </>
  );
};

export default TraineeLayout;
