import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateApplication } from "../features/applicationsSlice";
import { toast } from "react-toastify";
import { closeUpdateApp } from "../features/formsSlice";

function UpdateApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.applications);
  const { updateAppIsOpen } = useSelector((state) => state.forms);

  useEffect(() => {
    if (updateAppIsOpen == false) {
      localStorage.removeItem("Application to be Updated");
      navigate("/view_applications");
    }
    if (isError) {
      toast.error("Error occured");
    }
    if (isSuccess) {
      toast.success("Application Created Successfully!");
      localStorage.removeItem("Application to be Updated");
      dispatch(closeUpdateApp());
      navigate("/view_applications");
    }
  }, [isSuccess, isError, updateAppIsOpen]);

  const initialState = {
    interview_received: "",
    offer_received: "",
  };
  const [changes, setChanges] = useState(initialState);

  const { interview_received, offer_received } = changes;

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
    dispatch(updateApplication(changes));
  };
  return (
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
            Have you received an interview for this job Application?
          </h1>
          <input
            className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
            type="text"
            name="interview_received"
            value={changes.interview_received}
            placeholder="True or False..."
            onChange={handleChange}
          />
          <h1 className="text-[#98fb98] text-2xl ">
            Have you received an offer for this job Application?
          </h1>
          <input
            className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
            type="text"
            name="offer_received"
            value={changes.offer_received}
            placeholder="True or False..."
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
              <p onClick={() => dispatch(closeUpdateApp())}>Cancel</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateApp;
