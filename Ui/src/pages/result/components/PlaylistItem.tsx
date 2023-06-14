import React from "react";
import { Playlist } from "../../../model/playlistItem";

interface Props {
  playlist: Playlist;
}

const PlaylistItem: React.FC<Props> = ({ playlist }) => {
  return (
    <div className="tw-flex tw-flex-col md:tw-flex-row">
      <img
        className="tw-w-[50%] md:tw-max-w-[200px] md:tw-max-h-[175px] tw-mr-2"
        src={
          playlist.imgUrl && playlist.imgUrl.length > 0
            ? playlist.imgUrl
            : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
        }
      />
      <div className="tw-w-full">
        <div className="tw-flex">
          <span className="tw-w-1/3 ">Title:</span>
          <span className="tw-font-medium">{playlist.title}</span>
        </div>
        <hr />
        <div className="tw-flex ">
          <span className="tw-w-1/3">Item Count:</span>
          <span className="tw-font-medium">{playlist.itemCount}</span>
        </div>
        <hr />
        <div className="tw-flex ">
          <span className="tw-w-1/3">Last Logged:</span>
          <span className="tw-font-medium">
            {new Date(playlist.lastLogged).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
