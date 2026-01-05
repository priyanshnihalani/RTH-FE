import { Layers, Users, Clock, CheckCircle } from "lucide-react";

const ICONS = {
    batches: Layers,
    students: Users,
    pending: Clock,
    completed: CheckCircle,
};

const StatCard = ({ label, value, type }) => {
    const Icon = ICONS[type];

    return (
        <div className="
      bg-white
      rounded-3xl
      p-8
      flex items-center justify-between gap-4
      shadow-[0_4px_4px_rgba(0,0,0,0.08)]
      border border-gray-100
    ">

            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>

            <div className="
        w-12 h-12
        rounded-xl
        bg-orange-50
        flex items-center justify-center
      ">
                <Icon size={28} className="text-orange-500" />
            </div>
        </div>
    );
};

export default StatCard;
