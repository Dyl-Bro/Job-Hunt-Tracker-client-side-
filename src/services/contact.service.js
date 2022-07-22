import axios from "axios";
axios.defaults.withCredentials = true;

const app_id = localStorage.getItem("AppID");
console.log("APP ID IN localStorage ---->" + app_id);

const getAll = async () => {
  const result = await axios
    .get("https://api.jobhunttracker.live/api/v1/contacts/", {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(result.data);
  return result.data;
};

const post = async (data) => {
  const application_id = localStorage.getItem("AppID");
  const result = await axios
    .post(
      `https://api.jobhunttracker.live/api/v1/contacts/${application_id}`,
      data,
      {
        withCredentials: true,
      }
    )
    .catch((error) => {
      console.log(error);
    });
  console.log("Resulting Data---> " + JSON.stringify(result.data));
  return result.data;
};

const update = async (data) => {
  const result = await axios
    .put(`https://api.jobhunttracker.live/api/v1/contacts/${app_id}`, data, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  return result.data;
};

const deleteContact = async () => {
  const id = localStorage.getItem("Contact ID");
  const result = await axios
    .delete(`https://api.jobhunttracker.live/api/v1/contacts/${id}`, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(result.data);
  return result.data;
};

const ContactService = { getAll, post, update, deleteContact };

export default ContactService;
