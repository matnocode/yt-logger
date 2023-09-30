import { FC } from "react";
import FaqItem from "./components/FaqItem";
import Picture from "../../components/Picture";
import { pingServer } from "../../api/youtube";
import search from "../../images/search.png";
import toast from "react-hot-toast";

const FaqSection: FC = () => {
  return (
    <div className="tw-border-t lg:tw-border-l lg:tw-border-t-0 tw-border-gray-300">
      <div className="tw-flex tw-justify-center tw-gap-6 tw-pb-4">
        <div className="tw-text-center tw-text-4xl tw-pb-2">FAQ</div>
        <div
          className="tw-border tw-bg-gray-200 tw-text-black hover:tw-text-white hover:tw-bg-gray-500 hover:tw-cursor-pointer
         tw-items-center tw-flex tw-rounded-xl"
          onClick={() => {
            toast.promise(pingServer(), {
              error: "not working",
              loading: "sending",
              success: "ping sent!",
            });
          }}
        >
          Ping server
        </div>
      </div>
      <div className="tw-px-3 tw-space-y-3">
        <FaqItem
          title="What is Yt-Logger?"
          content="It's youtube playlist logging system."
        />
        <FaqItem
          title="What's the purpose of this website?"
          content="To keep track of your playlist. For example, if the video gets
          deleted from youtube, you don't have access to it's data anymore,
          therefore you can't know which video is deleted. This site helps you
          identify deleted/removed videos."
        />
        <FaqItem
          title="How to use it?"
          content={
            <div className="tw-flex tw-gap-2 tw-items-center">
              Enter playlist's full url into searchbar and press enter or search
              icon.
              <Picture
                className="tw-border tw-rounded-lg hover:tw-bg-slate-50 tw-cursor-pointer tw-shadow tw-w-10 tw-p-2"
                size="sm"
                src={search}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default FaqSection;
