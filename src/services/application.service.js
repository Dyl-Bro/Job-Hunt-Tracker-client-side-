import axios from "axios";
axios.defaults.withCredentials = true;

const app_id = localStorage.getItem("Application to be Updated");

const getAll = async () => {
  const result = await axios
    .get("http://localhost:4000/api/v1/applications/", {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(result.data);
  return result.data;
};

const post = async (data) => {
  const result = await axios
    .post("http://localhost:4000/api/v1/applications/", data, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("Resulting Data---> " + result.data);
  return result.data;
};
const deleteApp = async () => {
  const id = localStorage.getItem("Application to be Updated");
  const result = await axios
    .delete(`http://localhost:4000/api/v1/applications/${id}`, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(result.data);
  return result.data;
};

const update = async (data) => {
  const app_id = localStorage.getItem("Application to be Updated");
  const result = await axios
    .put(`http://localhost:4000/api/v1/applications/${app_id}`, data, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  return result.data;
};
const ApplicationService = { getAll, deleteApp, post, update };

export default ApplicationService;
