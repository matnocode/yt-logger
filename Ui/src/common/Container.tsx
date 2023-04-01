import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Container: React.FC = () => {
  return (
    <div>
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
