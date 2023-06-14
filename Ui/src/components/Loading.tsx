import React from "react";
import { Spinner } from "react-bootstrap";

const Loading: React.FC = () => {
  return (
    <div className="tw-flex tw-min-w-screen tw-justify-center tw-mt-16">
      <Spinner />
    </div>
  );
};

export default Loading;
