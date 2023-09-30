import Button from "../../../common/Button";
import { FC } from "react";
import Picture from "../../../components/Picture";
import { PlaylistItem } from "../../../model/playlistItem";
import { textAbstract } from "../../../utils/string";

interface LogItemProps {
  playlistItem: PlaylistItem;
}

const LogItem: FC<LogItemProps> = ({ playlistItem }) => {
  return (
    <div className="tw-flex tw-flex-col md:tw-items-center md:tw-flex-row tw-bg-slate-100 tw-rounded-lg tw-shadow hover:tw-bg-slate-200 tw-gap-3">
      <Picture
        imgClassName="!tw-h-[75px] !tw-w-[150px]"
        src={
          playlistItem.imgUrl && playlistItem.imgUrl.length > 0
            ? playlistItem.imgUrl
            : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
        }
      />
      <div className="tw-p-1 md:tw-text-lg tw-w-full">
        <div className="tw-flex tw-justify-between ">
          <div>{textAbstract(playlistItem.title, 15, true)}</div>
          {playlistItem.title.length >= 15 && (
            <Button buttonType="primary" >
              ...
            </Button>
          )}
        </div>
        <div>{playlistItem.videoOwnerChannelTitle}</div>
        <div>
          {new Date(playlistItem.videoPublishedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default LogItem;
