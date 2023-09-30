import { useEffect, useState } from "react";

import { CusError } from "../../../model/error";
import Picture from "../../../components/Picture";
import React from "react";
import classNames from "classnames";
import search from "../../../images/search.png";
import { useNavigate } from "react-router";

interface Props {
  showErrorMsg?: boolean;
}

const SearchBar: React.FC<Props> = ({ showErrorMsg }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState<CusError | undefined>(undefined);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    event?.preventDefault();
    if (validateSearch()) return;
    navigate("/results/" + getId());
  };

  useEffect(() => {
    if (errors) setErrors(undefined);
  }, [value]);

  const getId = () => {
    return value.substring(value.indexOf("=") + 1);
  };

  const validateSearch = () => {
    if (!value || !value?.includes("https://www.youtube.com/playlist?list=")) {
      setErrors({
        label: "bad link format",
      });
      return true;
    }
    return false;
  };

  return (
    <div className="tw-w-full">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="tw-flex tw-items-center tw-gap-2">
          <input
            className={classNames(
              "tw-w-full tw-border focus:tw-ring-0 focus:tw-outline-none tw-p-2 hover:tw-bg-slate-50 tw-rounded-lg",
              errors && "!tw-border tw-border-red-600"
            )}
            type="text"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Picture
            className="tw-border tw-p-2.5 tw-rounded-lg hover:tw-bg-slate-50 tw-cursor-pointer tw-shadow"
            src={search}
            onClick={() => {
              handleSubmit(undefined);
            }}
          />
        </div>
        {showErrorMsg && errors && (
          <div className="tw-text-red-400">{errors.label}</div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
