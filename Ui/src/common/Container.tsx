import React from "react";
import NavBar from "../navbar/NavBar";
import { Outlet } from "react-router";

const Container: React.FC = () => {
  return (
    <div className="tw-min-h-screen tw-container tw-mx-auto ">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Container;
