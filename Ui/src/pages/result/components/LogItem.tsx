import { FC } from "react";
import { PlaylistItem } from "../../../model/playlistItem";
import React from "react";

interface LogItemProps {
  deleted?: boolean;
  playlistItem: PlaylistItem;
}

const LogItem: FC<LogItemProps> = ({ deleted, playlistItem }) => {
  return (
    <div className="tw-flex tw-flex-col md:tw-flex-row">
      <div className="tw-my-2">
        <img
          className="tw-max-w-[150px] tw-border-2"
          src={
            playlistItem.imgUrl && playlistItem.imgUrl.length > 0
              ? playlistItem.imgUrl
              : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
          }
        />
      </div>
      <div className="tw-p-1 md:tw-text-lg">
        <div>{playlistItem.title}</div>
        <div>{playlistItem.videoOwnerChannelTitle}</div>
        <div>
          {new Date(playlistItem.videoPublishedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default LogItem;
