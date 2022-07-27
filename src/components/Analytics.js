import React, { useEffect, useState } from "react";
import SuccessPieChart from "./SuccessPieChart";
import NavBar from "./NavBar";
import SkillsBarChart from "./SkillsBarChart";
import { useDispatch, useSelector } from "react-redux";
import {
  BehavioralSkillAnalysis,
  CodingSkillAnalysis,
  SystemDesignSkillAnalysis,
  Interview_to_OfferSuccessRate,
  App_to_InterviewSuccessRate,
} from "../features/analyticsSlice";
import LoadingSpinner from "./LoadingSpinner";
function Analytics() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.analytics);
  const behaviorScore = useSelector((state) => state.analytics.behaviorScore);
  const codingScore = useSelector((state) => state.analytics.codingScore);
  const sysDesignScore = useSelector((state) => state.analytics.designScore);
  const interviewRate = useSelector(
    (state) => state.analytics.interviewSuccess
  );
  const offerRate = useSelector((state) => state.analytics.offerSuccess);
  const applications = useSelector((state) => state.applications.applications);
  const interviews = useSelector((state) => state.interviews.interviews);

  useEffect(() => {
    dispatch(BehavioralSkillAnalysis());
    dispatch(CodingSkillAnalysis());
    dispatch(SystemDesignSkillAnalysis());
    console.log("getting succes rates");
    dispatch(Interview_to_OfferSuccessRate());
    dispatch(App_to_InterviewSuccessRate());
  }, [interviews, applications, dispatch]);
  console.log("interview rate: " + JSON.stringify(interviewRate));
  const scoreInfo = { behaviorScore, codingScore, sysDesignScore };
  while (isLoading) {
    return (
      <div className="flex flex-col items-center w-full m-10">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <h1 className="text-xl lg:text-3xl xl:text-4xl 2xl:text-6xl text-white mx-4 mb-8 ">
        Below, you can view graphical representations of the
        <span className="italic text-2xl  lg:text-4xl file:xl:text-5xl 2xl:text-7xl text-[#98fb98] font-extralight">
          {" "}
          strengths, weaknesses,{" "}
        </span>{" "}
        and{" "}
        <span className="italic text-2xl lg:text-4xl xl:text-5xl 2xl:text-7xl text-[#98fb98] font-extralight">
          success rates
        </span>{" "}
        of your current job hunting journey.
      </h1>
      <div className="flex flex-col items-center justify-center lg:text-xl font-mono ">
        <div className="w-full md:w-4/5 shadow-xl shadow-black">
          <h1
            className=" mx-2 text-center  text-green-400
            lg:text-2xl xl:text-5xl 2xl:text-7xl"
          >
            Interview Skills Scores
          </h1>
          <SkillsBarChart info={scoreInfo} />
        </div>
        <div className="w-full md:w-3/5 lg:full mt-8 shadow-xl shadow-black">
          <h1
            className="mx-2 text-center  text-green-400
          lg:text-2xl xl:text-5xl 2xl:text-7xl mb-8"
          >
            Apps to Interviews Success Analysis
          </h1>
          {interviewRate.length == 2 && (
            <SuccessPieChart
              chart_title="Interview Success Rate"
              lable_1="Apps with interviews NOT received"
              lable_2="Apps with interviews NOT received"
              value_1={interviewRate[0].interview_COUNT}
              value_2={interviewRate[1].interview_COUNT}
              success_rate={interviewRate[1].INTERVIEW_INVITATION_PERCENTAGE}
            />
          )}
          {interviewRate.length == 1 &&
            interviewRate[0].interview_received == "T" && (
              <SuccessPieChart
                chart_title="Interview Success Rate"
                lable_1="Apps with interviews NOT received"
                lable_2="Apps with interviews received"
                value_1={0}
                value_2={interviewRate[0].interview_COUNT}
                success_rate={interviewRate[0].INTERVIEW_INVITATION_PERCENTAGE}
              />
            )}
          {interviewRate.length == 1 &&
            interviewRate[0].interview_received == "F" && (
              <SuccessPieChart
                chart_title="Interview Success Rate"
                lable_1="Apps with interviews NOT received"
                lable_2="Apps with interviews received"
                value_1={interviewRate[0].interview_COUNT}
                value_2={0}
                success_rate={0}
              />
            )}
          {interviewRate.length == 0 && (
            <p className="p-1 text-white font-bold">
              Hmm...no data to analyse just yet. Be sure to create a job
              application entry and confirm whether or not you've received an
              interview then check back here to see your current{" "}
              <span className="text-green-400 italic">
                application to interview response rate!
              </span>
            </p>
          )}
        </div>
        <div className="mt-12 w-full md:w-3/5 shadow-xl shadow-black">
          <h1
            className="mx-2 text-center text-green-400 
            lg:text-2xl xl:text-5xl 2xl:text-7xl mb-8"
          >
            Interview to Offer Success Analysis
          </h1>

          {offerRate.length == 2 && (
            <SuccessPieChart
              chart_title="Offer Success Rate"
              lable_1="Interviews with offers NOT received"
              lable_2="Interviews with offers NOT received"
              value_1={offerRate[0].count}
              value_2={offerRate[1].count}
              success_rate={offerRate[1].PERCENTAGE}
            />
          )}
          {offerRate.length == 1 && offerRate[0].offer_received == "T" && (
            <SuccessPieChart
              chart_title="Offer Success Rate"
              lable_1="Interviews with offers NOT received"
              lable_2="Interviews with offers  received"
              value_1={0}
              value_2={offerRate[0].count}
              success_rate={offerRate[0].PERCENTAGE}
            />
          )}
          {offerRate.length == 1 && offerRate[0].offer_received == "F" && (
            <SuccessPieChart
              chart_title="Offer Success Rate"
              lable_1="Interviews with offers NOT received"
              lable_2="Interviews with offers  received"
              value_1={offerRate[0].count}
              value_2={0}
              success_rate={0}
            />
          )}
          {offerRate.length == 0 && (
            <p className="p-1 text-white font-bold">
              Hmm...no data to analyse just yet. Be sure to create a job
              application entry and confirm whether or not you've received an
              offer then check back here to see your current{" "}
              <span className="text-green-400 italic">
                interview to job offer success rate!
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
