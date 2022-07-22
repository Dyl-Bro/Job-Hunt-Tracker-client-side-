import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice2";
import ButtonOptions from "./ButtonOptions";
import axios from "axios";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = JSON.parse(localStorage.getItem("userID"));
  const [user_name, setName] = useState("");
  const { isLoading, isSuccess, isError } = useSelector((state) => state.auth);

  async function getUserName() {
    const result = await axios.get(
      `http://localhost:4000/api/v1/accounts/${userID}`
    );
    setName(result.data.first_name);
  }
  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <nav>
      <div className="my-2  flex justify-end text-xl sm:text-xl md:text-2xl xl:text-3xl 2xl:text-5xl text-white">
        <button
          className="h-auto  px-2 mx-4 border-solid border-2 object-right hover:scale-125"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
      <p className="mt-10 text-[#98fb98] text-2xl text-center font-bold sm:text-3xl xl:text-5xl 2xl:text-6xl">
        Hello {user_name}
      </p>
      <ButtonOptions />
    </nav>
  );
}

export default NavBar;
