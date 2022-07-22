import axios from "axios";

const register = async (body) => {
  console.log("userData in final register function" + JSON.stringify(body));
  const response = await axios.post(
    "https://api.jobhunttracker.live/api/v1/accounts/register",
    body
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (body) => {
  const response = await axios.post(
    "https://api.jobhunttracker.live/api/v1/accounts/login",
    body
  );
  if (response.data) {
    localStorage.setItem("userID", JSON.stringify(response.data.user_id));
  }
  return response.data;
};
const logout = () => {
  localStorage.clear();
};

const AuthenticationService = { register, login, logout };

export default AuthenticationService;
