import { FC, Fragment } from "react";

import LogItem from "./LogItem";
import { PlaylistItem } from "../../../model/playlistItem";
import classNames from "classnames";

interface Props {
  logItems: PlaylistItem[];
  className?: string;
}

const LogItemTable: FC<Props> = ({ logItems, className }) => {
  return (
    <table className={classNames(className)}>
      <thead className="tw-text-left tw-border-b">
        <tr>
          <th className="tw-hidden md:tw-table-cell" />
          <th className="hover:tw-opacity-70 tw-cursor-pointer">Title</th>
          <th className="hover:tw-opacity-70 tw-cursor-pointer">Channel</th>
          <th className="hover:tw-opacity-70 tw-cursor-pointer">Uploaded</th>
        </tr>
      </thead>
      <tbody className="tw-bg-white tw-border">
        {logItems.map((x, i) => (
          <Fragment key={`logItemAdded-${i}`}>
            <LogItem playlistItem={x} />
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default LogItemTable;
