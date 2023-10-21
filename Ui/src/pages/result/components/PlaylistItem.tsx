import ItemGroup from "../../../common/ItemGroup";
import Loader from "../../../common/Loader";
import { Playlist } from "../../../model/playlistItem";
import React from "react";
import classNames from "classnames";
import { getYearDate } from "../../../utils/date";

interface Props {
  playlist?: Playlist;
  isLoading?: boolean;
}

const PlaylistItem: React.FC<Props> = ({ playlist, isLoading }) => {
  return (
    <div className="tw-space-y-2">
      <div
        className={classNames(
          "tw-w-full tw-mx-auto md:tw-max-w-[170px] md:tw-max-h-[175px] tw-min-h-[100px] tw-bg-white tw-rounded-xl",
          isLoading && "loader-white"
        )}
      >
        {!isLoading && (
          <img
            className="tw-rounded-xl"
            src={
              playlist?.imgUrl && playlist?.imgUrl.length > 0
                ? playlist?.imgUrl
                : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
            }
          />
        )}
      </div>
      <div
        className={classNames(
          "tw-w-full tw-border tw-rounded-lg tw-bg-white tw-min-h-[100px] tw-space-y-2",
          isLoading && "loader-white"
        )}
      >
        {!isLoading && (
          <>
            <ItemGroup
              className="tw-mt-1"
              label={"Title"}
              value={playlist?.title}
            />
            <ItemGroup label={"Item Count"} value={playlist?.itemCount} />
            <ItemGroup
              label={"Last Logged"}
              value={
                <div>
                  {playlist?.lastLogged &&
                    getYearDate(new Date(playlist?.lastLogged))}
                </div>
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistItem;
