import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"

import AuthGuard from "./Guards/AuthGuard";
import RoleIndex from "./Guards/RoleIndex";

// Common pages
import Login from "./Pages/Common/Login";
import Register from "./Pages/Common/Register";
import Unauthorized from "./Pages/Common/Unauthorized";
import NotFound from "./Pages/Common/NotFound";

// Layouts
import AdminLayout from "./Layout/AdminLayout";
import TrainerLayout from "./Layout/TrainerLayout";
import TraineeLayout from "./Layout/TraineeLayout";

// Pages
import AdminDashboard from "./Pages/Admin/Dashboard";
import TrainerDashboard from "./Pages/Trainer/Dashboard";
// import TraineeDashboard from "./Pages/Trainee/Dashboard";
import TraineeDashboard from "./Pages/Trainee/Dashboard";
import Waiting from "./Pages/Trainee/Waiting";
import Batches from "./Pages/Admin/Batches";
import Trainers from "./Pages/Admin/Trainers";
import Trainees from "./Pages/Admin/Trainees";
import Notes from "./Pages/Admin/Notes";
import Students from "./Pages/Trainer/Students";
import Task from "./Pages/Trainer/Task";
import PreBoard from "./Pages/Trainee/Pre-Board";

function App() {
  const router = createBrowserRouter([
    /* ---------- PUBLIC ---------- */
    {
      path: "/login",
      element: (
        <AuthGuard requireAuth={false}>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/register",
      element: (
        <AuthGuard requireAuth={false}>
          <Register />
        </AuthGuard>
      ),
    },

    /* ---------- ROOT (ROLE REDIRECT) ---------- */
    {
      path: "/",
      element: (
        <AuthGuard>
          <RoleIndex />
        </AuthGuard>
      ),
    },

    /* ---------- WAITING ---------- */
    {
      path: "/waiting",
      element: (
        <AuthGuard requireAuth={false}>
          <Waiting />
        </AuthGuard>
      ),
    },

    /* ---------- ADMIN ---------- */
    {
      path: "/admin",
      element: (
        <AuthGuard>
          <AdminLayout />
        </AuthGuard>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "batches", element: <Batches /> },
        { path: "trainers", element: <Trainers /> },
        { path: "trainees", element: <Trainees /> },
        { path: "notes/:id", element: <Notes /> },
      ],
    },

    /* ---------- TRAINER ---------- */
    {
      path: "/trainer",
      element: (
        <AuthGuard>
          <TrainerLayout />
        </AuthGuard>
      ),
      children: [
        { path: "dashboard", element: <TrainerDashboard /> },
        { path: "notes/:id", element: <Notes /> },
        { path: "batches/:id/:date", element: <Students /> },
        { path: "tasks/:trainerId/:batchId/:traineeId", element: <Task /> }
      ],
    },

    /* ---------- TRAINEE ---------- */
    {
      path: "/trainee",
      element: (
        <AuthGuard>
          <TraineeLayout />
        </AuthGuard>
      ),
      children: [
        { path: "dashboard", element: <TraineeDashboard /> },
        { path: "notes/:id", element: <Notes /> },
      ],
    },

    { path: "/pre-board", element: <PreBoard /> },
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <NotFound /> },
  ]);

  return <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>;
}

export default App;