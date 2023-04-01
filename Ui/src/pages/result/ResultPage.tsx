import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPlaylist, logPlaylist } from "../../api/youtube";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Loading from "../../components/Loading";

const ResultPage: React.FC = () => {
  const { playlistId } = useParams();
  const [isLogPlaylist, setIsLogPlaylist] = useState(false);

  const { data, isError, isLoading } = useQuery(
    "playlist",
    () => getPlaylist(playlistId ?? ""),
    {
      enabled: playlistId !== undefined,
    }
  );

  useEffect(() => {
    console.log("playlistExist === undefined", data === undefined);
    if (data === undefined) setIsLogPlaylist(true);
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div>
        <h4>Playlist doesnt exist!</h4>
      </div>
    );

  if (!data?.title)
    return (
      <div>
        Playlist with id "{playlistId}" doesnt exist or its set to private
      </div>
    );

  return (
    <>
      {data && data.title && <div>"{data.title}" Playlist Found!</div>}
      {<Button variant="outline-dark">Press here to log your playlist</Button>}
    </>
  );
};

export default ResultPage;
