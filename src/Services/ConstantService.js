export const ConstantService = {

  Shift: [
    { value: true, label: "Morning" },
    { value: false, label: "Afternoon" },
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
    { label: "1 month", value: "1 month" },
    { label: "45 Days", value: "45 Days" },
    { label: "3 months", value: "3 months" },
    { label: "6 months", value: "6 months" },
  ],
}

export default ConstantService
