import Button from "../../../common/Button";
import { FC } from "react";
import { FormControl } from "react-bootstrap";
import Loader from "../../../common/Loader";
import SearchBar from "../../home/components/SearchBar";

interface Props {
  handleLogClick: () => void;
  isLoading?: boolean;
}

const PlaylistHeader: FC<Props> = ({ handleLogClick, isLoading }) => {
  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[1fr,5fr] tw-gap-2">
      <Button
        className="tw-px-1 tw-py-2 tw-mb-2"
        buttonType="secondary"
        onClick={handleLogClick}
        disabled={isLoading}
      >
        {!isLoading ? "Log playlist" : <Loader svgProps={{ height: "10px" }} />}
      </Button>
      <div className="tw-flex tw-gap-5">
        <SearchBar />
        <FormControl className="tw-border tw-mb-2 tw-px-2" type="date" />
      </div>
    </div>
  );
};

export default PlaylistHeader;
