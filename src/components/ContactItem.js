import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteContact } from "../features/contactsSlice";

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const { isSuccess, isError } = useSelector((state) => state.contacts);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Contact Deleted Successfully!");
      localStorage.removeItem("Contact ID");
      window.location.reload();
    }
    if (isError) {
      toast.error("Error with deleting Contact");
    }
  }, [isError, isSuccess]);
  const handleDelete = (contact_id) => {
    localStorage.setItem("Contact ID", contact_id);
    dispatch(deleteContact());
  };

  return (
    <div className=" mb-20 min-h-fit  overflow-x-scroll whitespace-nowrap">
      <div className=" border-solid border-4 border-green-400 flex flex-col items-center">
        <h3 className="mb-10 text-[#98fb98] text-3xl md:text-4xl 2xl:text-7xl p-2">
          {contact.first_name} {contact.last_name}
        </h3>
      </div>
      <div className="overflow-scroll scrollbar-hide md:flex md:flex-col md:justify-center">
        <table className=" whitespace-normal text-xl sm:text-2xl xl:text-3xl 2xl:text-5xl text-left text-black bg-green-400 border-4 border-green-400 rounded-2xl">
          <thead className=" text-xs sm:text-base xl:text-2xl 2xl:text-4xl  text-green-900  uppercase  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position/Title
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="  border-b shadow-inner shadow-slate-700 bg-green-300 ">
              <td className="px-6 py-4">{contact.first_name}</td>
              <td className="px-6 py-4">{contact.last_name}</td>
              <td className="px-6 py-4">{contact.contact_position}</td>
              <td className="px-6 py-4">{contact.company}</td>
              <td className="px-6 py-4">{contact.email}</td>
              <td className="px-6 py-4">{contact.phone}</td>
              <td className="px-6 py-4 text-right">
                <button
                  className="
                                    text-black font-bold text-xl 
                                    md:text-2xl 2xl:text-4xl"
                  type="button"
                  onClick={() => handleDelete(contact.contact_id)}
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

export default ContactItem;
