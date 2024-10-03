import React from "react";
import {  Mobile,Desktop } from "../components";

const Homepage = () => {
  return (
    <div>
      <div className="sm:hidden">
        <Mobile/>
      </div>
      <div className="hidden sm:block">
        <Desktop/>
      </div>

    </div>
  );
};

export default Homepage;
