import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { openUpdateInterview } from "../features/formsSlice";
import { deleteInterview, reset } from "../features/interviewsSlice";

function NoteItem({ interview }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateState = useSelector((state) => state.forms.updateInterviewIsOpen);

  const { isSuccess, isDeleted, isError } = useSelector(
    (state) => state.interviews
  );
  useEffect(() => {
    if (updateState) {
      navigate("/update-interview");
    }
    if (isDeleted) {
      toast.success("Interview Deleted Successfully!");
      localStorage.removeItem("Interview ID");
      dispatch(reset());
      window.location.reload();
    }
    if (isError) {
      toast.error("Error with deleting Interview");
    }
  }, [isError, isSuccess, updateState]);

  const handleEdit = (interview_id) => {
    localStorage.setItem("interviewID", interview_id);
    console.log("Interview to be Updated--->" + interview_id);
    dispatch(openUpdateInterview());
  };

  const handleDelete = (interview_id) => {
    localStorage.setItem("Interview ID", interview_id);
    dispatch(deleteInterview());
    window.location.reload();
  };

  return (
    <div className="mb-20 min-h-fit  overflow-x-scroll whitespace-nowrap">
      <div className=" border-solid border-4 border-green-400 flex flex-col items-center">
        <h3 className="mb-10 text-[#98fb98] text-3xl md:text-4xl 2xl:text-7xl p-2">
          {interview.company_name}
        </h3>
      </div>
      <div className="overflow-scroll scrollbar-hide md:flex md:flex-col md:justify-center">
        <table className=" whitespace-normal text-xl sm:text-2xl xl:text-3xl 2xl:text-5xl text-left text-black bg-green-400 border-4 border-green-400 rounded-2xl">
          <thead className="  text-xs sm:text-base xl:text-2xl 2xl:text-4xl  text-green-900  uppercase  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Positive Remarks
              </th>
              <th scope="col" className="px-6 py-3">
                Negative Remarks
              </th>
              <th scope="col" className="px-6 py-3">
                Behavioral Performance Score
              </th>
              <th scope="col" className="px-6 py-3">
                Coding Performance Score
              </th>
              <th scope="col" className="px-6 py-3">
                System Design Performance Score
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
            <tr className=" border-b shadow-inner shadow-slate-700 bg-green-300  ">
              <td className="px-6 py-4">{interview.positive_notes}</td>
              <td className="px-6 py-4">{interview.negative_notes}</td>
              <td className="px-6 py-4">
                {interview.behavioral_interview_score}
              </td>
              <td className="px-6 py-4">{interview.coding_interview_score}</td>
              <td className="px-6 py-4">
                {interview.systemDesign_interview_score}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="
                            text-black font-bold text-xl 
                            md:text-2xl 2xl:text-4xl"
                  type="button"
                  onClick={() => handleEdit(interview.interview_id)}
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
                  onClick={() => handleDelete(interview.interview_id)}
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

export default NoteItem;
