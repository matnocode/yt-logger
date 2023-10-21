import { FC } from "react";
import { PagedResult } from "../../../model/playlistItem";
import Pagination from "../../../common/Pagination";
import classNames from "classnames";
import { getYearDate } from "../../../utils/date";

interface Props {
  isLoading?: boolean;
  pagedData: PagedResult | undefined;
  setLog: (id: number) => void;
}

const PlaylistSearchResults: FC<Props> = ({ isLoading, pagedData, setLog }) => {
  return (
    <div
      className={classNames(
        "tw-w-full tw-border tw-rounded-lg tw-bg-white",
        isLoading && "loader-white"
      )}
    >
      <table className="md:tw-w-[95%] tw-mx-auto tw-mt-2">
        <thead className="tw-text-left tw-border-b">
          <tr>
            <th className="hover:tw-opacity-70 tw-cursor-pointer">Log Date</th>
            <th className="hover:tw-opacity-70 tw-cursor-pointer">Added</th>
            <th className="hover:tw-opacity-70 tw-cursor-pointer">Deleted</th>
          </tr>
        </thead>
        <tbody>
          {pagedData?.result.map((x, i) => (
            <tr
              key={`tr-${i}`}
              className="tw-cursor-pointer tw-border-b"
              onClick={() => setLog(x.id)}
            >
              <td>{getYearDate(new Date(x.timeStamp))}</td>
              <td>{x.added?.length}</td>
              <td>{x.deleted?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pagedData && pagedData.result?.length > 0 && (
        <Pagination data={pagedData} />
      )}
    </div>
  );
};

export default PlaylistSearchResults;
