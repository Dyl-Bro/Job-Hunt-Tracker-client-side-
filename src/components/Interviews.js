import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInterviews } from "../features/interviewsSlice";
import NoteItem from "./NoteItem";

function Interviews() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const interviews = useSelector((state) => state.interviews.interviews);
  console.log("INTERVIEWS----->" + JSON.stringify(interviews));

  useEffect(() => {
    dispatch(getInterviews());
  }, []);

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div class="mx-3 relative  shadow-md ">
      <NavBar />
      <div className="mt-5 flex justify-center">
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
      <h1 className="mt-10 text-green-400 text-lg sm:text-xl md:text-2xl 2xl:text-5xl ">
        Number of Interviews: {interviews.length}
      </h1>

      {interviews
        .filter((interview) => {
          if (searchInput == "") {
            return interview;
          } else if (
            interview.company_name
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          ) {
            return interview;
          }
        })
        .map((interview) => (
          <NoteItem key={interview.interview_id} interview={interview} />
        ))}
    </div>
  );
}

export default Interviews;
