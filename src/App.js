import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Application2 from "./components/Application2";
import Interviews from "./components/Interviews";
import Contacts from "./components/Contacts";
import Analytics from "./components/Analytics";
import { Routes, Route, Link } from "react-router-dom";
import Welcome from "./components/Welcome";
import AddNew from "./components/AddNew";
import { useSelector } from "react-redux";
import {
  selectAddAppIsOpen,
  selectUpdateAppIsOpen,
} from "./features/formsSlice";
import UpdateApp from "./components/UpdateApp";
import NewInterview from "./components/NewInterview";
import NewContact from "./components/NewContact";

function App() {
  const user = useSelector((state) => state.auth.user);
  const addAppIsOpen = useSelector(selectAddAppIsOpen);
  const updateAppIsOpen = useSelector(selectUpdateAppIsOpen);

  return (
    <div className="app">
      <Header />
      <div className="app_body">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/view_applications" element={<Application2 />} />
          <Route path="/view_interview_notes" element={<Interviews />} />
          <Route path="/view_contacts" element={<Contacts />} />
          <Route path="/view_analytics" element={<Analytics />} />
          <Route path="/update-application" element={<UpdateApp />} />
          <Route path="/add-interview-note" element={<NewInterview />} />
          <Route path="/add-hiring-contact" element={<NewContact />} />
        </Routes>
      </div>

      {addAppIsOpen && <AddNew />}
      <ToastContainer />
    </div>
  );
}

export default App;
