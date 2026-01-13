export const ConstantService = {

  statusGradient: {
    IN_PROGRESS: "from-orange-500 via-orange-300 to-orange-100",
    COMPLETED: "from-green-500 via-green-300 to-green-100",
    ASSIGNED: "from-gray-500 via-gray-300 to-gray-100",
  },

  bubblesGradient: {
    IN_PROGRESS: "orange-500/50 ",
    COMPLETED: "green-500/50 ",
    ASSIGNED: "gray-500/50 ",
  },

  Shift: [
    { value: true, label: "Morning" },
    { value: false, label: "Afternoon" },
  ],

  Branch: [
    { label: "Ahemdabad", value: "AHEMDABAD" },
    { label: "Junagadh", value: "JUNAGADH" },
  ],

  YesNo: [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ],

  AdmissionStatus: [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ],

  Technologys: [
    { value: "Frontend Design", label: "Frontend Design" },
    { value: "node", label: "Node.js" },
    { value: "QA", label: "QA" },
    { value: "Devops", label: "Devops" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "react", label: "React" },
    { value: "Java", label: "Java" },
    { value: "ReactNative", label: "ReactNative" },
  ],

  TrainingStatus: [
    { label: "Not Started", value: "not_started" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Completed", value: "completed" },
    { label: "Dropped", value: "dropped" },
  ],

  Duration: [
    { label: "15 Days", value: "15 Days" },
    { label: "30 Days", value: "30 Days" },
    { label: "45 Days", value: "45 Days" },
    { label: "3 months", value: "3 months" },
    { label: "6 months", value: "6 months" },
  ],

  DURATION_MAP: [
    { value: 0.5, label: "15 Days" },
    { value: 1, label: "30 Days" },
    { value: 1.5, label: "45 Days" },
    { value: 3, label: "3 months" },
    { value: 6, label: "6 months" },
  ]

}

export default ConstantService
