# 🚀 Training Hub – Frontend

**Techrover Solutions**

Training Hub is a modern web-based platform built for managing trainees, trainers, batches, tasks, and payments in one centralized system.
This repository contains the **Frontend (FE)** of the application, developed using **React** to deliver a fast, clean, and responsive user experience.

The goal of this project is to simplify training operations by providing an intuitive dashboard for admins and trainers to manage everything digitally.

---

## 🧠 Introduction (In Simple Words)

The Training Hub frontend is the **user interface** of the system.
It is what trainers and admins see and interact with in the browser.

Through this frontend, users can:

* View and manage trainees
* Assign and track tasks
* Create and manage batches
* Monitor payments
* Analyze data using charts and dashboards

The frontend communicates with the backend APIs to fetch and update data in real-time.

---

## 🛠 Tech Stack

* **React.js** – Core UI library
* **React Router** – Page navigation
* **Axios / Custom ApiService** – API communication
* **Tailwind CSS / Custom CSS** – Styling
* **Lucide Icons** – UI icons
* **Toast Notifications** – Feedback messages
* **Highcharts / Charts** – Analytics & reports

---

## 📁 Project Structure

```
src/
│
├── components/        # Reusable UI components
├── pages/             # Page-level components (Students, Payments, Dashboard, etc.)
├── Services/          # ApiService and API helpers
├── layouts/           # Layout wrappers (Sidebar, Navbar)
├── assets/            # Images, icons, static files
├── App.jsx            # Root component
└── main.jsx           # Entry point
```

Each module is separated clearly so that the project remains:

* Easy to understand
* Easy to maintain
* Easy to scale

---

## ⚙️ Setup & Installation

1. Clone the repository:

```bash
git clone <frontend-repo-url>
```

2. Move into the project folder:

```bash
cd training-hub-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## 🔄 Application Workflow

1. User opens the web app
2. React loads the UI
3. Pages call APIs using `ApiService`
4. Backend returns data (trainees, tasks, payments, etc.)
5. UI renders dynamic content
6. User performs actions (add, edit, assign, delete)
7. Requests are sent to backend
8. UI updates in real-time with feedback

This flow ensures:

* Fast UI
* Real-time updates
* Smooth user experience

---

## ✨ Key Features

* 📊 Admin Dashboard
* 👨‍🎓 Trainee Management
* 👨‍🏫 Trainer & Batch Handling
* 📝 Task Assignment & Tracking
* 💳 Payment Records
* 🔍 Search, Filter & Infinite Scroll
* 📈 Charts & Reports
* 🔔 Toast Notifications
* 📱 Fully Responsive Design

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

This allows the frontend to connect with the backend.

---

## 📦 Build for Production

```bash
npm run build
```

The optimized files will be generated in the `dist/` folder.
