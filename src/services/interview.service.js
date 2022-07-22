import axios from "axios";
axios.defaults.withCredentials = true;

const app_id = localStorage.getItem("AppID");

const getAll = async () => {
  const result = await axios
    .get("https://api.jobhunttracker.live/api/v1/interviews/", {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(result.data);
  return result.data;
};

const post = async (data) => {
  const appID = localStorage.getItem("AppID");
  const result = await axios
    .post(`https://api.jobhunttracker.live/api/v1/interviews/${appID}`, data, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("Resulting Data---> " + JSON.stringify(result.data));
  return result.data;
};

const deleteInterview = async () => {
  const id = localStorage.getItem("Interview ID");
  const result = await axios
    .delete(`https://api.jobhunttracker.live/api/v1/interviews/${id}`, {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(result.data);
  return result.data;
};

const update = async (data) => {
  const interview_id = localStorage.getItem("interviewID");
  const result = await axios
    .put(
      `https://api.jobhunttracker.live/api/v1/interviews/${interview_id}`,
      data,
      {
        withCredentials: true,
      }
    )
    .catch((error) => {
      console.log(error);
    });
  return result.data;
};

const InterviewService = { getAll, post, update, deleteInterview };

export default InterviewService;
