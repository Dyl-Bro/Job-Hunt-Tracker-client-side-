import React from "react";
import { useState, useEffect } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";

import { useDispatch, useSelector } from "react-redux";
import { closeAddApp } from "../features/formsSlice";
import { reset, createApplication } from "../features/applicationsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddNew() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.applications);

  useEffect(() => {
    if (isError) {
      toast.error("Error occured");
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success("successful");

      dispatch(reset());
      window.location.reload();
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
    <div className="mt-4 flex flex-col items-center">
      <div
        className="
    flex flex-col  
   shadow-2xl shadow-black items-center
    rounded-lg w-4/5
     bg-[#0b3159]"
      >
        <div className="w-full p-4 flex flex-row justify-between text-white  ">
          <h3 className="text-2xl lg:text-3xl xl:text-5xl font-bold">
            New Application
          </h3>
          <button
            onClick={() => dispatch(closeAddApp())}
            className="hover:scale-125 hover:text-green-400"
          >
            <XIcon className=" h-8 lg:h-10 xl:h-14" />
          </button>
        </div>
        <form
          className="text-xl lg:text-3xl xl:text-5xl flex flex-col m-3 w-4/5"
          onSubmit={saveApplication}
        >
          <h1 className="text-white mt-2">Enter Date</h1>
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
          <h1 className="text-white mt-2">Enter Company Name</h1>
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
          <h1 className="text-white mt-2">Enter Location</h1>
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
          <h1 className="text-white mt-2">Enter Link to Job Posting</h1>
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
          <h1 className="text-white mt-2">Have you received an interview?</h1>
          <input
            className="
            shadow-inner shadow-slate-700
            h-14 p-2 border-none 
            border-b-neutral-400 border-b-solid border-b outline-none"
            type="text"
            name="interviewReceived"
            value={application.interviewReceived}
            onChange={onInputChange}
            placeholder="(true/false)"
          />
          <h1 className="text-white mt-2">Have you received an offer?</h1>
          <input
            className="
            shadow-inner shadow-slate-700
            h-14 p-2 border-none  
            border-b-neutral-400 border-b-solid border-b outline-none"
            type="text"
            name="offerReceived"
            value={application.offerReceived}
            onChange={onInputChange}
            placeholder=" (true/false)"
          />

          <button
            className="flex items-end space-x-2 px-2 m-4 max-w-fit text-sm lg:text-3xl xl:text-5xl text-white border-solid border-white border-2 
            hover:text-[#98fb98] hover:cursor-pointer hover:border-green-300 hover:scale-125"
            type="submit"
            onClick={saveApplication}
          >
            <PlusIcon className="h-5 lg:h-10 xl:h-14" />
            <p>POST</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNew;
