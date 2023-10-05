import { FC } from "react";
import classNames from "classnames";

interface Props {
  isLoading?: boolean;
}

const PlaylistSearchResults: FC<Props> = ({ isLoading }) => {
  return (
    <div
      className={classNames(
        "tw-w-full tw-border tw-rounded-lg tw-bg-white",
        isLoading && "loader-white"
      )}
    ></div>
  );
};

export default PlaylistSearchResults;
