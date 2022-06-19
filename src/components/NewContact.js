import { XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../features/contactsSlice";
import { toast } from "react-toastify";
import { closeAddHiringContact } from "../features/formsSlice";
import Contacts from "./Contacts";

export default function NewContact() {
  const contactCompanyName = localStorage.getItem("Company Name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.contacts);
  const { addHiringContactIsOpen } = useSelector((state) => state.forms);
  console.log(addHiringContactIsOpen);
  useEffect(() => {
    if (addHiringContactIsOpen == false) {
      localStorage.removeItem("AppID");
      localStorage.removeItem("Company Name");
      navigate("/view_applications");
    }
    if (isError) {
      toast.error("Error occured");
    }
    if (isSuccess) {
      localStorage.removeItem("AppID");
      localStorage.removeItem("Company Name");
      dispatch(closeAddHiringContact());
    }
  }, [isSuccess, isError, addHiringContactIsOpen]);

  const initialState = {
    first: "",
    last: "",
    position: "",
    company: contactCompanyName,
    email: "",
    phone: "",
  };
  const [contact, setContact] = useState(initialState);

  const { first, last, position, company, email, phone } = contact;
  console.log("Contact company name " + contact.company);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(contact);
  };
  const saveChanges = (e) => {
    console.log(contact);
    e.preventDefault();
    dispatch(createContact(contact));
  };

  return (
    <div>
      <h1 className=" pl-2 text-3xl text-green-400">
        Add Information about your hiring contact at {company}.
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
              Contact's First Name
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="first"
              value={contact.first}
              placeholder="First Name Here"
              onChange={handleChange}
            />
            <h1 className="text-[rgb(152,251,152)] text-2xl">
              Contact's Last Name
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="last"
              value={contact.last}
              placeholder="Last Name Here"
              onChange={handleChange}
            />
            <h1 className="text-[rgb(152,251,152)] text-2xl">
              Contact's Position at {company}
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="position"
              value={contact.position}
              placeholder="Position Name Here"
              onChange={handleChange}
            />
            <h1 className="text-[rgb(152,251,152)] text-2xl">
              Contact's Email Address
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="email"
              value={contact.email}
              placeholder="Email Here"
              onChange={handleChange}
            />
            <h1 className="text-[rgb(152,251,152)] text-2xl">
              Contact's Phone Number
            </h1>
            <input
              className=" text-black rounded-3xl h-14 shadow-inner shadow-slate-700"
              type="text"
              name="phone"
              value={contact.phone}
              placeholder="Phone Number Name Here"
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
                <p onClick={() => dispatch(closeAddHiringContact())}>Cancel</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
