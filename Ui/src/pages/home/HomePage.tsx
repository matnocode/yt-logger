import FaqSection from "./FaqSection";
import React from "react";
import SearchBar from "./components/SearchBar";
import Triangle from "../../icons/Triangle";

const HomePage: React.FC = () => {
  return (
    <div className="tw-bg-slate-50 tw-h-screen">
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-h-full tw-pt-5">
        <div className="tw-flex tw-flex-col tw-items-center tw-gap-3">
          <div className="tw-font-medium">
            Enter youtube playlist url to log the playlist
          </div>
          <div className="tw-w-1/2">
            <SearchBar showErrorMsg />
          </div>
        </div>
        <FaqSection />
      </div>
    </div>
  );
};

export default HomePage;
