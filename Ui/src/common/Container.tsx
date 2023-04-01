import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Container: React.FC = () => {
  return (
    <div>
      <div className="tw-w-100 xl:tw-w-[40%] tw-m-auto container tw-min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
