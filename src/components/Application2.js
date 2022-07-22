import React, { useEffect, useState } from "react";
import AppItem from "./AppItem";
import { useNavigate } from "react-router-dom";
import {
  selectAddAppIsOpen,
  selectUpdateAppIsOpen,
} from "../features/formsSlice";
import {
  PlusIcon,
  Logout,
  UserGroupIcon,
  PencilAltIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { openAddApp } from "../features/formsSlice";

import { getApplications } from "../features/applicationsSlice";

import NavBar from "./NavBar";
import AddNew from "./AddNew";
import LoadingSpinner from "./LoadingSpinner";

function Application2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addAppIsOpen = useSelector(selectAddAppIsOpen);
  const [searchInput, setSearchInput] = useState("");
  const { isLoading, isSuccess, isError } = useSelector((state) => state.auth);
  const applications = useSelector((state) => state.applications.applications);
  console.log("APPLICATIONS----->" + JSON.stringify(applications));

  const numofApps = applications.length;

  useEffect(() => {
    dispatch(getApplications());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      navigate("/");
    }
  }, [isSuccess, isError]);

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  while (isLoading) {
    return (
      <div className="flex flex-col items-center w-full m-10">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div class="mx-3 relative  shadow-md ">
      <NavBar />

      <div className=" flex justify-center">
        <input
          className="
          shadow-inner shadow-slate-700 
          w-96 rounded-lg  text-xl
          lg:text-2xl 2xl:text-5xl
          sm:w-full md:w-4/5
          bg-slate-200"
          type="text"
          name="searchBar"
          placeholder="Search By Company Name..."
          onChange={onSearchChange}
        />
      </div>
      <button
        className="
        mt-3 flex items-end space-x-2 px-2 max-w-fit 
        text-sm text-white border-solid border-white border-2
        sm:text-lg md:text-xl md:h-auto 2xl:text-5xl 
        hover:cursor-pointer hover:scale-y-110"
        onClick={() => dispatch(openAddApp())}
      >
        <PlusIcon className="h-5 sm:h-7 lg:h-8 2xl:h-11" />
        <p className=" ">ADD NEW</p>
      </button>
      {addAppIsOpen && <AddNew />}
      <h1 className="mt-5 text-green-400 text-lg sm:text-xl md:text-2xl 2xl:text-5xl ">
        Number of Applications: {numofApps}
      </h1>
      {applications.length == 0 && (
        <h1 className=" flex justify-center text-2xl text-white font-bold">
          You have no Job Applications saved.
        </h1>
      )}
      {applications
        .filter((application) => {
          if (searchInput == "") {
            return application;
          } else if (
            application.company_name
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          ) {
            return application;
          }
        })
        .map((application) => (
          <AppItem key={application.app_id} application={application} />
        ))}
    </div>
  );
}

export default Application2;
