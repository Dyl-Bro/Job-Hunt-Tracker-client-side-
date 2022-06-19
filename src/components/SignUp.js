import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/authSlice2";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Error occured");
      dispatch(reset());
    }
    if (isSuccess || user) {
      toast.success("Registration Successful!");
      navigate("/login");
      dispatch(reset());
    }
  }, [dispatch, navigate, isLoading, isSuccess, isError, user]);
  const initState = {
    first: "",
    last: "",
    email: "",
    password: "",
  };
  const [registration, setRegistration] = useState(initState);

  const { first, last, email, password } = registration;

  const handleChange = (event) => {
    setRegistration((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const saveRegistration = (e) => {
    e.preventDefault();
    console.log("REACHED SAVE REG");
    const registrationData = { first, last, email, password };
    console.log(registrationData);

    dispatch(register(registrationData));
  };

  return (
    <div className="flex flex-grow flex-col items-center">
      <h3 className="font-mono text-white mt-10 text-xl sm:text-2xl md:text-3xl lg:4xl xl:text-8xl">
        Sign-Up
      </h3>
      <form className="flex flex-col mt-3 h-auto " onSubmit={saveRegistration}>
        <input
          type="text"
          name="first"
          value={registration.first}
          placeholder="First Name"
          onChange={handleChange}
          className="
        rounded-t-lg
        shadow-inner shadow-slate-700
        border-solid 
        border-2 
        text-xl lg:text-3xl xl:text-6xl
        border-[#98fb98]"
        />
        <input
          type="text"
          name="last"
          value={registration.last}
          placeholder="Last Name"
          onChange={handleChange}
          className="
        
        shadow-inner shadow-slate-700
        border-solid 
        border-2 
        text-xl lg:text-3xl xl:text-6xl
        border-[#98fb98]"
        />
        <input
          type="email"
          name="email"
          value={registration.email}
          placeholder="Email"
          onChange={handleChange}
          className="
        
        shadow-inner shadow-slate-700
        border-solid 
        border-2 
        text-xl lg:text-3xl xl:text-6xl
        border-[#98fb98]"
        />
        <input
          type="text"
          name="password"
          value={registration.password}
          placeholder="Password"
          onChange={handleChange}
          className="
       
        shadow-inner shadow-slate-700
        border-solid 
        border-2 
        text-xl lg:text-3xl xl:text-6xl
        border-[#98fb98]"
        />
        <button
          className="
        rounded-b-lg
        p-1 
        border-solid border-2 
        text-white 
        hover:bg-[#98fb98] 
        hover:text-black 
        hover:border-[#98fb98]
        text-xl lg:text-3xl xl:text-6xl"
        >
          Sign-Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
