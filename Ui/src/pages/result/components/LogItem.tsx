import { FC } from "react";
import Picture from "../../../components/Picture";
import { PlaylistItem } from "../../../model/playlistItem";

interface LogItemProps {
  playlistItem: PlaylistItem;
}

const LogItem: FC<LogItemProps> = ({ playlistItem }) => {
  return (
    <tr className="tw-border-t">
      <td className="tw-hidden md:tw-table-cell tw-w-[10%]">
        <Picture
          className="tw-px-3 tw-py-1"
          imgClassName="tw-w-full tw-rounded-lg"
          src={
            playlistItem.imgUrl && playlistItem.imgUrl.length > 0
              ? playlistItem.imgUrl
              : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
          }
        />
      </td>
      <td>{playlistItem.title}</td>
      <td>{playlistItem.videoOwnerChannelTitle}</td>
      <td>{new Date(playlistItem.videoPublishedAt).toLocaleDateString()}</td>
    </tr>
  );
};

export default LogItem;
