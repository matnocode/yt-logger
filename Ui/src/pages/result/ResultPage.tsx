import { getLogPaged, getPlaylist, logPlaylist } from "../../api/youtube";
import { useEffect, useState } from "react";

import BaseContainer from "../../common/BaseContainer";
import LogItemList from "./components/LogItemList";
import PlaylistHeader from "./components/PlaylistHeader";
import PlaylistItem from "./components/PlaylistItem";
import PlaylistSearchResults from "./components/PlaylistSearchResults";
import React from "react";
import { getYearDate } from "../../utils/date";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";
import { useQuery } from "react-query";

//need to make context here
const ResultPage: React.FC = () => {
  const { playlistId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPagedDataRefetching, setIsPagedDataRefetching] = useState(false);
  const [selectedLog, setSelectedLog] = useState<number>();

  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchPlaylist,
  } = useQuery("playlist", () => getPlaylist(playlistId ?? ""), {
    enabled: playlistId !== undefined,
  });

  const {
    data: pagedData,
    isLoading: isPagedDataLoading,
    refetch,
  } = useQuery(
    "paged",
    () => getLogPaged(currentPage ?? 1, 5, playlistId ?? ""),
    {
      enabled: data !== undefined && !isLoading && isSuccess,
    }
  );

  const handleLogClick = () => {
    setIsPagedDataRefetching(true);
    toast.promise(logPlaylist(playlistId ?? ""), {
      success: (e) => {
        setIsPagedDataRefetching(false);
        refetch();
        refetchPlaylist();
        return "Logged";
      },
      error: (e) => {
        setIsPagedDataRefetching(false);
        return "Limit reached or playlist not found";
      },
      loading: "Loading...",
    });
  };

  const handlePaginationOnClick = (setNew: number) => {
    if (!pagedData) return;
    if (setNew <= 0 || setNew > pagedData.pageCount) return;
    setCurrentPage(setNew);
  };

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    if (selectedLog) {
      const targetDiv = document.getElementById(String(selectedLog));
      if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: "smooth" });
        targetDiv.classList.add("onActive");
        setTimeout(() => {
          targetDiv.classList.remove("onActive");
        }, 1000);
      }
    }
  }, [selectedLog]);

  return (
    <div className="tw-space-y-3 tw-my-3">
      <BaseContainer className="md:tw-px-4 tw-py-2">
        <PlaylistHeader
          handleLogClick={handleLogClick}
          isLoading={isPagedDataLoading || isPagedDataRefetching}
          isValid={!!data}
        />
        <div className="tw-grid md:tw-grid-cols-[1fr,5fr] tw-gap-2 tw-mt-2">
          <PlaylistItem playlist={data} isLoading={isLoading} />
          <PlaylistSearchResults
            pagedData={pagedData}
            isLoading={isPagedDataLoading || isPagedDataRefetching}
            setLog={(id) => setSelectedLog(id)}
          />
        </div>
      </BaseContainer>
      <div>
        {/* move to separte file */}
        {pagedData?.result.map((log, i) => (
          <div
            id={String(log.id)}
            key={`log-${i}`}
            className="tw-border tw-border-transparent"
          >
            <LogItemList log={log} />
          </div>
        ))}
        {pagedData?.result.every(
          (x) => x.added.length === 0 && x.deleted.length === 0
        ) && (
          <div className="tw-flex tw-justify-center tw-font-bold tw-py-2">
            There was no changes made since{" "}
            {getYearDate(new Date(data?.lastLogged ?? ""))}
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
