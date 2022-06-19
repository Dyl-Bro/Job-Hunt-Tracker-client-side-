import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <p className="text-left h-52 text-[#98fb98] px-20 py-20">
        Welcome, and thank you for using this job hunt tracker <br /> to keep
        track of your job prospects during your <br /> job hunting season.
      </p>
      <div className="mx-20 flex flex-col justify-center text-[#98fb98] sm:text-xl border-solid border-2 border-[#98fb98]">
        <button
          onClick={() => navigate("/login")}
          className="p-2 font-bold hover:scale-110 hover:bg-[#98fb98] hover:text-[#00203FFF]"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="p-2 font-bold hover:scale-110 hover:text-[#00203FFF] hover:bg-[#98fb98]"
        >
          SignUp
        </button>
      </div>
    </div>
  );
}

export default Welcome;
