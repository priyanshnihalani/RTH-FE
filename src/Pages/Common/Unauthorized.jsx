import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="
      min-h-screen
      flex flex-col items-center justify-center
      text-center
      px-6
    ">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="
          w-24 mb-5 opacity-90
          animate-[float_3s_ease-in-out_infinite]
        "
      />

      {/* 403 */}
      <h1 className="
        text-[72px] font-bold
        text-[#ffb703] tracking-wider
      ">
        403
      </h1>

      {/* Message */}
      <p className="
        mt-2 text-sm
        text-gray-300 tracking-wide
      ">
        You are not authorized to access this page
      </p>


      {/* Custom animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Unauthorized;
