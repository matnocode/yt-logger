import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPlaylist, logPlaylist } from "../../api/youtube";
import { Button } from "react-bootstrap";
import Loading from "../../components/Loading";
import PlaylistNotFound from "./components/PlaylistNotFound";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const ResultPage: React.FC = () => {
  const { playlistId } = useParams();

  const { data, isError, isLoading } = useQuery(
    "playlist",
    () => getPlaylist(playlistId ?? ""),
    {
      enabled: playlistId !== undefined,
    }
  );

  const handleLogClick = debounce(() => {
    toast.promise(logPlaylist(playlistId ?? ""), {
      success: "Playlist logged successfully",
      error: "Encountered error",
      pending: "Loading",
    });
  }, 1500);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div>
        <h4>Playlist doesnt exist!</h4>
      </div>
    );

  return (
    <>
      {data && data.title ? (
        <>
          {/* found in db, must have full features? */}
          <div>"{data.title}" Playlist Found!</div>

          <Button variant="outline-dark" onClick={() => handleLogClick()}>
            Press here to log your playlist
          </Button>
        </>
      ) : (
        <PlaylistNotFound playlistId={playlistId ?? ""} />
      )}
    </>
  );
};

export default ResultPage;
