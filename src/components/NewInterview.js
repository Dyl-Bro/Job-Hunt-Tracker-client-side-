import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createInterview, reset } from "../features/interviewsSlice";
import { toast } from "react-toastify";
import { closeAddInterview } from "../features/formsSlice";

export default function NewInterview() {
  const interviewName = localStorage.getItem("Company Name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdded, isDeleted, isError } = useSelector(
    (state) => state.interviews
  );
  const { addInterviewIsOpen } = useSelector((state) => state.forms);

  useEffect(() => {
    if (addInterviewIsOpen == false) {
      localStorage.removeItem("AppID");
      localStorage.removeItem("Company Name");
      navigate("/view_applications");
    }
    if (isError) {
      toast.error("Error occured");
      dispatch(reset());
    }
    if (isAdded) {
      toast.success("Interview Added Successfully");
      dispatch(closeAddInterview());
      dispatch(reset());
    }
  }, [isAdded, isError, addInterviewIsOpen, dispatch]);

  const initialState = {
    positiveNotes: "",
    negativeNotes: "",
    behavioralInterviewScore: "",
    codingInterviewScore: "",
    systemDesignInterviewScore: "",
    companyName: interviewName,
  };
  const [interview, setInterview] = useState(initialState);

  const {
    positiveNotes,
    negativeNotes,
    behavioralInterviewScore,
    codingInterviewScore,
    systemDesignInterviewScore,
    companyName,
  } = interview;
  console.log("Interview.companyName: " + interview.companyName);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInterview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(interview);
  };
  const saveChanges = (e) => {
    e.preventDefault();
    dispatch(createInterview(interview));
  };

  return (
    <div>
      <h1 className=" pl-2 text-3xl text-green-400">
        Document your interview experience with {companyName}.
      </h1>
      <div className="flex items-center justify-center">
        <div
          className="m-4  
                w-3/6 h-3/6  border-solid border-4 border-white sm:border-none"
        >
          <form
            className="flex flex-col p-2 space-y-4 text-white bg-slate-800"
            onSubmit={saveChanges}
          >
            <h1 className="text-[rgb(152,251,152)] text-2xl">
              What went right?
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="positiveNotes"
              value={interview.positiveNotes}
              placeholder="Positive Remarks"
              onChange={handleChange}
            />
            <h1 className="text-[rgb(152,251,152)] text-2xl">
              What went wrong?
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="negativeNotes"
              value={interview.negativeNotes}
              placeholder="Negative Remarks"
              onChange={handleChange}
            />
            <h1 className="text-[rgb(152,251,152)] text-2xl">
              Rate your Behavioral Interview Perforance (0-10) if you've yet not
              reached this portion of the interview, enter 0 and come back later
              to update this value once you've completed it.
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="behavioralInterviewScore"
              value={interview.behavioralInterviewScore}
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
              name="codingInterviewScore"
              value={interview.codingInterviewScore}
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
              name="systemDesignInterviewScore"
              value={interview.systemDesignInterviewScore}
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
                <p onClick={() => dispatch(closeAddInterview())}>Cancel</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
