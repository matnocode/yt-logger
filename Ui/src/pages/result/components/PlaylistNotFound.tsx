import React from "react";

interface Props {
  playlistId: string;
}

const PlaylistNotFound: React.FC<Props> = ({ playlistId }) => {
  return (
    <div>
      Playlist with id "{playlistId}" doesnt exist or its set to private
    </div>
  );
};

export default PlaylistNotFound;
