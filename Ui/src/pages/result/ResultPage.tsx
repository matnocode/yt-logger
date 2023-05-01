import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getLogPaged, getPlaylist, logPlaylist } from "../../api/youtube";
import Loading from "../../components/Loading";
import PlaylistNotFound from "./components/PlaylistNotFound";
import LogItem from "./components/LogItem";
import PlaylistItem from "./components/PlaylistItem";
import { Button, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { PagedResult } from "../../model/playlistItem";

const ResultPage: React.FC = () => {
  const { playlistId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess } = useQuery(
    "playlist",
    () => getPlaylist(playlistId ?? ""),
    {
      enabled: playlistId !== undefined,
    }
  );

  const {
    data: pagedData,
    isError: pagedError,
    isLoading: pagedLoading,
    refetch,
  } = useQuery(
    "paged",
    () => getLogPaged(currentPage ?? 1, 5, playlistId ?? ""),
    {
      enabled: data !== undefined && !isLoading && isSuccess,
    }
  );

  const handleLogClick = () => {
    toast.promise(logPlaylist(playlistId ?? ""), {
      success: "",
      error: "Error",
      loading: "Loading...",
    });
    refetch();
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

  console.log("pagedData", pagedData);

  return (
    <>
      {data && isSuccess ? (
        <>
          <Button className="tw-bg-slate-800" onClick={() => handleLogClick()}>
            Log playlist
          </Button>
          <PlaylistItem playlist={data} />
          <div>
            {pagedData?.result.map((log, i) => (
              <div key={`log-${i}`}>
                <LogItem log={log} />
              </div>
            ))}
            <Pagination className="tw-gap-1">
              <Pagination.First onClick={() => handlePaginationOnClick(1)} />
              <Pagination.Prev
                onClick={() => handlePaginationOnClick(currentPage - 1)}
              />
              {[
                ...Array(pagedData?.pageCount == 0 ? 1 : pagedData?.pageCount),
              ].map((_, i) => (
                <Pagination.Item
                  active={i + 1 === currentPage}
                  onClick={() => handlePaginationOnClick(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePaginationOnClick(currentPage + 1)}
              />
              <Pagination.Last
                onClick={() =>
                  handlePaginationOnClick(pagedData?.pageCount ?? 1)
                }
              />
            </Pagination>
          </div>
        </>
      ) : (
        <PlaylistNotFound playlistId={playlistId ?? ""} />
      )}
    </>
  );
};

export default ResultPage;
