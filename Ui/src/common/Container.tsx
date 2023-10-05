import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router";
import React from "react";

const Container: React.FC = () => {
  return (
    <div className="tw-min-h-screen tw-container lg:tw-w-[65%] tw-mx-auto">
      <NavBar />
      <div className="tw-px-3 md:tw-px-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
