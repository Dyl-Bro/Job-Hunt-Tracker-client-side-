import React, { useEffect, useState } from "react";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { getContacts } from "../features/contactsSlice";

function Contacts() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const contacts = useSelector((state) => state.contacts.contacts);
  console.log("CONTACTS----->" + JSON.stringify(contacts));

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  const onSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="mx-3 relative  shadow-md ">
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
        Number of Contacts: {contacts.length}
      </h1>
      {contacts.length == 0 && (
        <h1 className=" flex justify-center text-2xl text-white font-bold">
          You have no hiring contacts saved. Navigate to your applications page
          find the application you would like to add a hiring contact for, and
          select the 'Add Hiring Contact' button.
        </h1>
      )}
      {contacts
        .filter((contact) => {
          if (searchInput == "") {
            return contact;
          } else if (
            contact.company.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return contact;
          }
        })
        .map((contact) => (
          <ContactItem key={contact.contact_id} contact={contact} />
        ))}
    </div>
  );
}

export default Contacts;
