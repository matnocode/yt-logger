import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getLogPaged, getPlaylist, logPlaylist } from "../../api/youtube";
import Loading from "../../components/Loading";
import PlaylistNotFound from "./components/PlaylistNotFound";
import LogItem, { getDate } from "./components/LogItemList";
import PlaylistItem from "./components/PlaylistItem";
import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../../common/Button";
import CustomPaginationButton from "../../common/CustomPaginationButton";
import React from "react";

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
  if (!isSuccess) return <div>{<h4>Playlist doesnt exist!</h4>}</div>;
  return (
    <>
      {data && isSuccess ? (
        <>
          <div className="tw-mt-3">
            <Button
              buttonType="default-outline"
              buttonWidth="200"
              buttonHeigth="1"
              onClick={() => handleLogClick()}
            >
              Log
            </Button>
            <PlaylistItem playlist={data} />
          </div>
          <div>
            {pagedData?.result.map((log, i) => (
              <div key={`log-${i}`}>
                <LogItem log={log} />
              </div>
            ))}
            {pagedData?.result.every(
              (x) => x.added.length == 0 && x.deleted.length == 0
            ) && (
              <>
                There was no changes made since{" "}
                {getDate(new Date(data.lastLogged))}UTC
              </>
            )}
            {(pagedData?.pageCount ?? 0) > 1 && (
              <Pagination className="tw-gap-1 !tw-bg-white">
                <CustomPaginationButton
                  disabled={currentPage === 1}
                  onClick={() => handlePaginationOnClick(currentPage - 1)}
                >
                  {"<"}
                </CustomPaginationButton>
                {[
                  ...Array(
                    pagedData?.pageCount == 0 ? 1 : pagedData?.pageCount
                  ),
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
            )}
          </div>
        </>
      ) : (
        <PlaylistNotFound playlistId={playlistId ?? ""} />
      )}
    </>
  );
};

export default ResultPage;
