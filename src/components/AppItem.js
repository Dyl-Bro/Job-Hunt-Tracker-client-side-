import { PlusIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  openUpdateApp,
  openAddInterview,
  openAddHiringContact,
} from "../features/formsSlice";
import { deleteApplication } from "../features/applicationsSlice";
import { toast } from "react-toastify";

function AppItem({ application }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError } = useSelector((state) => state.applications);
  const updateState = useSelector((state) => state.forms.updateAppIsOpen);
  const newInterviewState = useSelector(
    (state) => state.forms.addInterviewIsOpen
  );
  const newContactState = useSelector(
    (state) => state.forms.addHiringContactIsOpen
  );

  console.log("update state: " + JSON.stringify(updateState));

  useEffect(() => {
    if (updateState == true) {
      navigate("/update-application");
    }
    if (newInterviewState) {
      navigate("/add-interview-note");
    }
    if (newContactState) {
      navigate("/add-hiring-contact");
    }
    if (isSuccess) {
      toast.success("Application Deleted Successfully!");
      localStorage.removeItem("Application to be Updated");
      window.location.reload();
    }
    if (isError) {
      toast.error("Error with deleting App");
    }
  }, [updateState, newInterviewState, newContactState, isSuccess]);

  const handleEdit = (app_id) => {
    localStorage.setItem("Application to be Updated", app_id);
    dispatch(openUpdateApp());
  };
  const handleDelete = (app_id) => {
    localStorage.setItem("Application to be Updated", app_id);
    dispatch(deleteApplication());
  };
  const addInterview = (app_id, company_name) => {
    localStorage.setItem("AppID", app_id);
    localStorage.setItem("Company Name", company_name);
    console.log("Adding Interview Note for AppID: " + app_id);
    dispatch(openAddInterview());
  };
  const addContact = (app_id, company_name) => {
    localStorage.setItem("AppID", app_id);
    localStorage.setItem("Company Name", company_name);
    console.log("Adding Hiring Contact for AppID: " + app_id);
    dispatch(openAddHiringContact());
  };

  return (
    <div className=" mb-20 min-h-fit  overflow-x-scroll whitespace-nowrap">
      <div className=" border-solid border-4 border-green-400 flex flex-col items-center">
        <h3 className="mb-10 text-[#98fb98] text-3xl md:text-4xl 2xl:text-7xl p-2">
          {application.company_name}
        </h3>
        <div className="flex flex-row lg:w-full lg:justify-between ">
          <button
            className="
                    flex items-end space-x-2 
                    text-base sm:text-xl md:text-2xl 2xl:text-5xl text-[#98fb98] 
                    hover:cursor-pointer hover:bg-[#98fb98] hover:text-slate-900"
            type="button"
            onClick={() =>
              addInterview(application.app_id, application.company_name)
            }
          >
            <PlusIcon className="h-6 lg:h-8 2xl:h-12" />
            <p className=" ">Interview Note</p>
          </button>
          <button
            className="
                    flex items-end space-x-2 px-2 
                    text-base sm:text-xl md:text-2xl 2xl:text-5xl text-[#98fb98]  
                    hover:cursor-pointer hover:bg-[#98fb98] hover:text-slate-900"
            type="button"
            onClick={() =>
              addContact(application.app_id, application.company_name)
            }
          >
            <PlusIcon className="h-6 lg:h-8 2xl:h-12" />
            <p className=" ">Hiring Contact</p>
          </button>
        </div>
      </div>
      <div className="overflow-scroll scrollbar-hide md:flex md:flex-col md:justify-center">
        <table className=" whitespace-normal text-xl sm:text-2xl xl:text-3xl 2xl:text-5xl text-left text-black bg-green-400 border-4 border-green-400 rounded-2xl">
          <thead className=" text-xs sm:text-base xl:text-2xl 2xl:text-4xl  text-green-900  uppercase  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Application Date
              </th>
              <th scope="col" className="px-6 py-3">
                Job Location
              </th>
              <th scope="col" className="px-6 py-3">
                Job Posting Link
              </th>
              <th scope="col" className="px-6 py-3">
                Interview Received
              </th>
              <th scope="col" className="px-6 py-3">
                Offer Received
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" border-b shadow-inner shadow-slate-700 bg-green-300 ">
              <td className="px-6 py-4">{application.app_date}</td>
              <td className="px-6 py-4">{application.location}</td>
              <td className="px-6 py-4">{application.link_to_posting}</td>
              <td className="px-6 py-4">{application.interview_received}</td>
              <td className="px-6 py-4">{application.offer_received}</td>
              <td className="px-6 py-4 text-right">
                <button
                  className="
                            text-black font-bold text-xl 
                            md:text-2xl 2xl:text-4xl"
                  type="button"
                  onClick={() => handleEdit(application.app_id)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="
                            text-black font-bold text-xl 
                            md:text-2xl 2xl:text-4xl"
                  type="button"
                  onClick={() => handleDelete(application.app_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppItem;
