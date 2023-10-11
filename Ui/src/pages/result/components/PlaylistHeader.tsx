import { FC, useState } from "react";

import Button from "../../../common/Button";
import { FormControl } from "react-bootstrap";
import Loader from "../../../common/Loader";
import LoveCheckBox from "../../../common/Love";
import Picture from "../../../components/Picture";
import Search from "../../../common/Search";
import search from "../../../images/search.png";

interface Props {
  handleLogClick: () => void;
  isLoading?: boolean;
}

const PlaylistHeader: FC<Props> = ({ handleLogClick, isLoading }) => {
  const [loved, setLoved] = useState(false);

  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[1fr,5fr] tw-gap-2 tw-items-center">
      <Button
        className="tw-px-1 tw-py-2"
        buttonType="secondary"
        onClick={handleLogClick}
        disabled={isLoading}
      >
        {!isLoading ? "Log playlist" : <Loader svgProps={{ height: "10px" }} />}
      </Button>
      <div>
        <Search
          onSubmit={(v) => {}}
          className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-gap-3"
          placeholder="Search for a logged item"
        >
          <FormControl
            className="tw-border tw-px-2 tw-py-1 hover:tw-bg-slate-50"
            type="date"
          />
          <button type="submit">
            <Picture
              className="tw-bg-white tw-border tw-p-2.5 tw-rounded-md hover:tw-bg-slate-50 tw-cursor-pointer"
              src={search}
            />
          </button>
          <LoveCheckBox
            checked={loved}
            onCheckedChange={(v) => setLoved(v)}
            className="!tw-w-[30px]"
          />
        </Search>
      </div>
    </div>
  );
};

export default PlaylistHeader;
