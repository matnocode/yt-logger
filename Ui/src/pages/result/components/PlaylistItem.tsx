import { Playlist } from "../../../model/playlistItem";
import React from "react";

interface Props {
  playlist: Playlist;
}

const PlaylistItem: React.FC<Props> = ({ playlist }) => {
  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[1fr,5fr] tw-gap-2">
      <img
        className="tw-mx-auto tw-w-full md:tw-max-w-[200px] md:tw-max-h-[175px] tw-rounded-xl"
        src={
          playlist.imgUrl && playlist.imgUrl.length > 0
            ? playlist.imgUrl
            : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
        }
      />
      <div className="tw-w-full tw-border tw-rounded-lg tw-bg-white tw-min-h-[100px]">
        <table className="md:tw-w-[95%] tw-mx-auto tw-mt-2">
          <thead className="tw-text-left tw-border-b">
            <tr>
              <th className="hover:tw-opacity-70 tw-cursor-pointer">Title</th>
              <th className="hover:tw-opacity-70 tw-cursor-pointer">
                Item Count
              </th>
              <th className="hover:tw-opacity-70 tw-cursor-pointer">
                Last Logged
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tw-bg-slate-50 hover:tw-bg-slate-200 hover:tw-cursor-pointer tw-rounded-md">
              <td>{playlist.title}</td>
              <td>{playlist.itemCount}</td>
              <td>{new Date(playlist.lastLogged).toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistItem;
