import React from "react";
import {
  UserGroupIcon,
  PencilAltIcon,
  ClipboardCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import ButtonItem from "./ButtonItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ButtonOptions() {
  const navigate = useNavigate();
  const interviews = useSelector((state) => state.interviews.interviews);

  return (
    <div className="flex flex-grow justify-center space-x-10">
      <button onClick={() => navigate("/view_applications")}>
        <ButtonItem title="JOB APPLICATIONS" Icon={ClipboardCheckIcon} />
      </button>
      <button onClick={() => navigate("/view_interview_notes")}>
        <ButtonItem title="INTERVIEW NOTES" Icon={PencilAltIcon} />
      </button>
      <button onClick={() => navigate("/view_contacts")}>
        <ButtonItem title="HIRING CONTACTS" Icon={UserGroupIcon} />
      </button>

      <button onClick={() => navigate("/view_analytics")}>
        <ButtonItem title="JOB-HUNT ANALYTICS" Icon={ChartBarIcon} />
      </button>
    </div>
  );
}

export default ButtonOptions;
