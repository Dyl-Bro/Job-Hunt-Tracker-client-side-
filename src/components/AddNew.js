import React from "react";
import { useState, useEffect } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";

import { useDispatch, useSelector } from "react-redux";
import { closeAddApp } from "../features/formsSlice";
import { reset, createApplication } from "../features/applicationsSlice";
import { toast } from "react-toastify";

function AddNew() {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.applications);

  useEffect(() => {
    if (isError) {
      toast.error("Error occured");
      dispatch(reset());
    }
    if (isSuccess) {
      dispatch(reset());
      dispatch(closeAddApp());
    }
  }, [isSuccess, isError]);

  const initialState = {
    appDate: "",
    companyName: "",
    location: "",
    link: "",
    interviewReceived: "",
    offerReceived: "",
  };
  const [application, setApplication] = useState(initialState);

  const {
    appDate,
    companyName,
    location,
    link,
    interviewReceived,
    offerReceived,
  } = application;

  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setApplication((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(application);
  const saveApplication = (e) => {
    e.preventDefault();
    const applicationData = {
      appDate,
      companyName,
      location,
      link,
      interviewReceived,
      offerReceived,
    };
    dispatch(createApplication(applicationData));
  };

  return (
    <div
      className="
    add_new 
    absolute 
    w-2/3 h-3/4
    sm:w-2/5
    sm:h-3/4
    md:h-3/4
    max-w-lg 
    bottom-2 right-12
    flex flex-grow flex-col 
    border-solid border-2 border-white
    rounded-lg
     bg-[#00203FFF]"
    >
      <div className="header p-13 flex justify-between text-white  items-center">
        <h3 className="text-2xl font-bold">New Application</h3>
        <button
          onClick={() => dispatch(closeAddApp())}
          className="hover:scale-125 hover:text-green-400"
        >
          <XIcon className=" h-8" />
        </button>
      </div>
      <form className="text-xl flex flex-col" onSubmit={saveApplication}>
        <input
          className="
            shadow-inner shadow-slate-700
            h-14 p-2 border-none 
            border-b-white border-b-solid border-b outline-none"
          type="text"
          name="appDate"
          value={application.appDate}
          placeholder="Date"
          onChange={onInputChange}
        />
        <input
          className="
            shadow-inner shadow-slate-700 
            h-14 p-2 border-none 
            border-b-neutral-400 border-b-solid border-b outline-none"
          type="text"
          name="companyName"
          value={application.companyName}
          onChange={onInputChange}
          placeholder="Company Name"
        />

        <input
          className="
            shadow-inner shadow-slate-700 
            h-14 p-2 border-none 
            border-b-neutral-400 border-b-solid border-b outline-none"
          type="text"
          name="location"
          value={application.location}
          onChange={onInputChange}
          placeholder="Location"
        />

        <input
          className="
            shadow-inner shadow-slate-700 
            h-14 p-2 border-none 
            border-b-neutral-400 border-b-solid border-b outline-none"
          type="text"
          name="link"
          value={application.link}
          onChange={onInputChange}
          placeholder="Link to Posting"
        />

        <input
          className="
            shadow-inner shadow-slate-700
            h-14 p-2 border-none 
            border-b-neutral-400 border-b-solid border-b outline-none"
          type="text"
          name="interviewReceived"
          value={application.interviewReceived}
          onChange={onInputChange}
          placeholder="Interview Received (true/false)"
        />

        <input
          className="
            shadow-inner shadow-slate-700
            h-14 p-2 border-none  
            border-b-neutral-400 border-b-solid border-b outline-none"
          type="text"
          name="offerReceived"
          value={application.offerReceived}
          onChange={onInputChange}
          placeholder="Offer Received (true/false)"
        />

        <button
          className="flex items-end space-x-2 px-2 m-4 max-w-fit text-sm text-white border-solid border-white border-2 
            hover:text-[#98fb98] hover:cursor-pointer hover:border-green-300 hover:scale-125"
          type="submit"
          onClick={saveApplication}
        >
          <PlusIcon className="h-5" />
          <p>POST</p>
        </button>
      </form>
    </div>
  );
}

export default AddNew;
