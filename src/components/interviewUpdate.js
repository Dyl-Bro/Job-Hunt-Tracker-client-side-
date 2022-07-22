import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateInterview } from "../features/interviewsSlice";
import { toast } from "react-toastify";
import { closeUpdateInterview } from "../features/formsSlice";

export default function InterviewUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isUpdated, isError } = useSelector(
    (state) => state.interviews
  );
  const { updateInterviewIsOpen } = useSelector((state) => state.forms);

  useEffect(() => {
    if (updateInterviewIsOpen == false) {
      localStorage.removeItem("interviewID");
      navigate("/view_interview_notes");
    }
    if (isError) {
      toast.error("Error occured");
    }
    if (isUpdated) {
      toast.success("Interview updated successfully");
      localStorage.removeItem("interviewID");
      dispatch(closeUpdateInterview());
      navigate("/view_interview_notes");
    }
  }, [isUpdated, isError, dispatch]);

  const initialState = {
    behavioral_interview_score: "",
    coding_interview_score: "",
    systemDesign_interview_score: "",
  };
  const [changes, setChanges] = useState(initialState);

  const {
    behavioral_interview_score,
    coding_interview_score,
    systemDesign_interview_score,
  } = changes;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setChanges((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(changes);
  };
  const saveChanges = (e) => {
    e.preventDefault();
    dispatch(updateInterview(changes));
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className="m-4  
              w-full lg:w-4/5 border-solid border-4 border-white sm:border-none"
      >
        <form
          className="flex flex-col p-2 space-y-4 text-white bg-slate-800"
          onSubmit={saveChanges}
        >
          <h1 className="text-[rgb(152,251,152)] text-2xl">
            Rate your Behavioral Interview Perforance (0-10) if you've yet not
            reached this portion of the interview, enter 0 and come back later
            to update this value once you've completed it.
          </h1>
          <input
            className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
            type="text"
            name="behavioral_interview_score"
            value={changes.behavioral_interview_score}
            placeholder="(0-10)"
            onChange={handleChange}
          />
          <h1 className="text-[rgb(152,251,152)] text-2xl">
            Rate your Coding Interview Perforance (0-10) if you've yet not
            reached this portion of the interview, enter 0 and come back later
            to update this value once you've completed it.
          </h1>
          <input
            className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
            type="text"
            name="coding_interview_score"
            value={changes.coding_interview_score}
            placeholder="(0-10)"
            onChange={handleChange}
          />
          <h1 className="text-[rgb(152,251,152)] text-2xl">
            Rate your System Design Interview Perforance (0-10) if you've yet
            not reached this portion of the interview, enter 0 and come back
            later to update this value once you've completed it.
          </h1>
          <input
            className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
            type="text"
            name="systemDesign_interview_score"
            value={changes.systemDesign_interview_score}
            placeholder="(0-10)"
            onChange={handleChange}
          />

          <div className="flex flex-col  items-center sm:flex-row sm:justify-between text-white">
            <button
              className="flex items-end space-x-2 px-2 m-4 min-w-fit text-sm text-white border-solid border-white border-2 
                          hover:text-[#98fb98] hover:cursor-pointer hover:border-green-300 hover:scale-125"
              type="submit"
            >
              <p>Save Changes</p>
            </button>
            <button
              className="space-x-2 px-2 m-4 text-sm border-solid border-2 flex flex-row items-end hover:scale-125 hover:text-[#98fb98]"
              type="button"
            >
              <XIcon className=" h-5" />
              <p onClick={() => dispatch(closeUpdateInterview())}>Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
