import axios from "axios";
axios.defaults.withCredentials = true;

const getBehaviorScore = async () => {
  const result = await axios
    .get(
      "http://localhost:4000/api/v1/analytics/behavioral-interview-skill-analysis",
      {
        withCredentials: true,
      }
    )
    .catch((error) => {
      console.log(error);
    });
  const response = result.data[0].behavioral_interview_skill_score;
  console.log("BEHAVIORAL SCORE------->" + response);
  return response;
};
const getCodingScore = async () => {
  const result = await axios
    .get(
      "http://localhost:4000/api/v1/analytics/coding-interview-skill-analysis",
      {
        withCredentials: true,
      }
    )
    .catch((error) => {
      console.log(error);
    });
  const response = result.data[0].coding_interview_skill_score;
  console.log("CODING SCORE--------> " + response);
  return response;
};
const getSystemDesignScore = async () => {
  const result = await axios
    .get(
      "http://localhost:4000/api/v1/analytics/system-design-interview-skill-analysis",
      {
        withCredentials: true,
      }
    )
    .catch((error) => {
      console.log(error);
    });
  const response = result.data[0].systemDesign_interview_skill_score;
  console.log("SYSTEM DESIGN SCORE-----> " + response);
  return response;
};

const getInterviewSuccessRate = async () => {
  const result = await axios
    .get("http://localhost:4000/api/v1/analytics/interview-success-rate", {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(
    "Interview success information--->" + JSON.stringify(result.data)
  );
  return result.data;
};

const getOfferSuccessRate = async () => {
  const result = await axios
    .get("http://localhost:4000/api/v1/analytics/offer-success-rate", {
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("Offer success information--->" + JSON.stringify(result.data));
  return result.data;
};

const AnalyticsService = {
  getBehaviorScore,
  getCodingScore,
  getSystemDesignScore,
  getInterviewSuccessRate,
  getOfferSuccessRate,
};

export default AnalyticsService;
