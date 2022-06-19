import React, { useEffect, useState } from "react";
import analyticsService from "../services/analytics.service";
import SuccessPieChart from "./SuccessPieChart";
import NavBar from "./NavBar";
import SkillsBarChart from "./SkillsBarChart";

function Analytics() {
  const [behaviorScore, setBehaviorScore] = useState(0);
  const [codingScore, setCodingScore] = useState(0);
  const [sysDesignScore, setSysDesignScore] = useState(0);
  const [interviewRate, setInterviewRate] = useState({});
  const [offerRate, setOfferRate] = useState({});
  const [isLoading, setisLoading] = useState(true);
  async function getBehaviorScore() {
    const response = await analyticsService.getBehaviorScore();
    setBehaviorScore(response);
  }
  async function getCodingScore() {
    const response = await analyticsService.getCodingScore();
    setCodingScore(response);
  }
  async function getSysDesignScore() {
    const response = await analyticsService.getSystemDesignScore();
    setSysDesignScore(response);
  }
  async function getInterviewRate() {
    const response = await analyticsService.getInterviewSuccessRate();
    setInterviewRate(response);
  }
  async function getOfferRate() {
    const response = await analyticsService.getOfferSuccessRate();
    setOfferRate(response);
    setisLoading(false);
  }
  useEffect(() => {
    getBehaviorScore();
    getCodingScore();
    getSysDesignScore();
    getInterviewRate();
    getOfferRate();
  }, []);

  while (isLoading) {
    return (
      <h1 className="text-white font-bold text-2xl flex justify-center">
        Page Loading...
      </h1>
    );
  }
  const scoreInfo = { behaviorScore, codingScore, sysDesignScore };

  return (
    <div>
      <NavBar />
      <h1 className="text-xl lg:text-2xl text-white mx-4 mb-8">
        Here, you can view graphical representations of the
        <span className="text-2xl lg:text-3xl text-[#98fb98] font-extralight">
          {" "}
          strengths, weaknesses,{" "}
        </span>{" "}
        and{" "}
        <span className="text-2xl lg:text-3xl text-[#98fb98] font-extralight">
          success rates
        </span>{" "}
        of your current job hunting journey.
      </h1>
      <div className="flex flex-col items-center justify-center lg:text-xl font-mono ">
        <div className=" w-full border-solid border-2 ">
          <h1 className="mx-2 text-left  text-green-400">
            Interview Skills Scores
          </h1>
          <SkillsBarChart info={scoreInfo} />
        </div>
        <div className="flex lg:w-full flex-col items-center md:flex-row md:justify-center">
          <div className=" w-4/5 lg:w-1/2 mt-4  border-solid border-2">
            <h1 className="mx-2 text-left  text-green-400">
              Apps to Interviews Success Analysis
            </h1>
            <SuccessPieChart
              chart_title="Interview Success Rate"
              lable_1="# of Apps: interviews NOT received"
              lable_2="# of Apps: interviews received"
              value_1={interviewRate[0].interview_COUNT}
              value_2={interviewRate[1].interview_COUNT}
              success_rate={interviewRate[1].INTERVIEW_INVITATION_PERCENTAGE}
            />
          </div>
          <div className="w-4/5 lg:w-1/2 mt-4 border-solid border-2">
            <h1 className=" mx-2 text-left text-green-400">
              Interview to Offer Success Analysis
            </h1>
            <SuccessPieChart
              chart_title="Offer Success Rate"
              lable_1="# of Interviews: offers NOT received"
              lable_2="# of Interviews: offers  received"
              value_1={offerRate[0].count}
              value_2={offerRate[1].count}
              success_rate={offerRate[1].PERCENTAGE}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
