import { getDate, getYearDate } from "../../utils/date";
import { getLogPaged, getPlaylist, logPlaylist } from "../../api/youtube";
import { useEffect, useState } from "react";

import BaseContainer from "../../common/BaseContainer";
import Button from "../../common/Button";
import CustomPaginationButton from "../../common/CustomPaginationButton";
import Loading from "../../components/Loading";
import LogItemList from "./components/LogItemList";
import { Pagination } from "react-bootstrap";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistItem from "./components/PlaylistItem";
import PlaylistNotFound from "./components/PlaylistNotFound";
import React from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";
import { useQuery } from "react-query";

const ResultPage: React.FC = () => {
  const { playlistId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchPlaylist,
  } = useQuery("playlist", () => getPlaylist(playlistId ?? ""), {
    enabled: playlistId !== undefined,
  });

  const { data: pagedData, refetch } = useQuery(
    "paged",
    () => getLogPaged(currentPage ?? 1, 5, playlistId ?? ""),
    {
      enabled: data !== undefined && !isLoading && isSuccess,
    }
  );

  const handleLogClick = () => {
    toast.promise(
      logPlaylist(playlistId ?? "").then(() => {
        refetch();
        refetchPlaylist();
      }),
      {
        success: "Logged",
        error: "Error",
        loading: "Loading...",
      }
    );
  };

  const handlePaginationOnClick = (setNew: number) => {
    if (!pagedData) return;
    if (setNew <= 0 || setNew > pagedData.pageCount) return;
    setCurrentPage(setNew);
  };

  useEffect(() => {
    refetch();
  }, [currentPage]);

  if (isLoading) return <Loading />;
  if (!data) return <PlaylistNotFound playlistId={playlistId ?? ""} />;
  return (
    <div className="tw-space-y-3 tw-mt-3">
      <BaseContainer className="md:tw-px-4 md:tw-py-2">
        <PlaylistHeader handleLogClick={handleLogClick} />
        <PlaylistItem playlist={data} />
      </BaseContainer>
      <div>
        {pagedData?.result.map((log, i) => (
          <div key={`log-${i}`}>
            <LogItemList log={log} />
          </div>
        ))}
        {pagedData?.result.every(
          (x) => x.added.length === 0 && x.deleted.length === 0
        ) && (
          <div className="tw-flex tw-justify-center tw-font-bold tw-py-2">
            There was no changes made since{" "}
            {getYearDate(new Date(data.lastLogged))}
          </div>
        )}
        {/* {(pagedData?.pageCount ?? 0) > 1 && (
          <Pagination className="tw-gap-1 !tw-bg-white">
            <CustomPaginationButton
              disabled={currentPage === 1}
              onClick={() => handlePaginationOnClick(currentPage - 1)}
            >
              {"<"}
            </CustomPaginationButton>
            {[
              ...Array(pagedData?.pageCount == 0 ? 1 : pagedData?.pageCount),
            ].map((_, i) => (
              <CustomPaginationButton
                active={i === currentPage - 1}
                disabled={i === currentPage - 1}
                onClick={() => handlePaginationOnClick(i + 1)}
              >
                {i + 1}
              </CustomPaginationButton>
            ))}
            <CustomPaginationButton
              onClick={() => handlePaginationOnClick(currentPage + 1)}
              disabled={currentPage === pagedData?.pageCount}
            >
              {">"}
            </CustomPaginationButton>
          </Pagination>
        )} */}
      </div>
    </div>
  );
};

export default ResultPage;
