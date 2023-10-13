import React from "react";

import GraphContainer from "./graphContainer";
import News from "./news";
import MultiStepProgressBar from "./calllog";
import Statitics from "./statitics";

const Dashboard = () => (
  <div className="flex flex-col h-screen">
    <div className="flex flex-1">
      <div className="flex-1 p-[15px]">
        <GraphContainer />
      </div>
      <div className="flex-1 p-[15px]">
        <Statitics />
      </div>
    </div>
    <div className="flex flex-1">
      <div className="flex-1 p-[15px]">
        <MultiStepProgressBar currentStep={2} totalSteps={3} />
      </div>
      <div className="flex-1 p-[15px]">
        <News />
      </div>
    </div>
  </div>
);
export default Dashboard;
