const modules = [
  {
    id: "odoo",
    title: "Odoo – Timesheets & Leaves",
    description: "How to manage daily work logs and leave requests",
    status: "not_started",
    docs: [
      { title: "Timesheet Guidelines", url: "/docs/odoo-timesheets" },
      { title: "Leave Policy", url: "/docs/odoo-leaves" }
    ],
    type: "doc"
  },
  {
    id: "roles",
    title: "Role Expectations",
    description: "Frontend & Backend responsibilities",
    status: "in_progress",
    docs: [
      { title: "Frontend Role", url: "/docs/frontend-role" },
      { title: "Backend Role", url: "/docs/backend-role" }
    ],
    type: "doc"
  },
  {
    id: "jira",
    title: "Jira Workflow",
    description: "How to manage tasks and tickets",
    status: "not_started",
    videoId: "1RilyCsxp7U",
    type: "video"
  },
  {
    id: "git",
    title: "Git Basics",
    description: "Daily Git workflow used in the company",
    status: "completed",
    videoId: "q8EevlEpQ2A",
    type: "video"
  }
];

export default modules;
