import { FC, LegacyRef, ReactNode, useState } from "react";

import Input from "./Input";
import classNames from "classnames";

interface Props {
  onSubmit: (val: string) => void;
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Search: FC<Props> = ({
  onSubmit,
  children,
  className,
  placeholder,
  disabled,
}) => {
  const [value, setValue] = useState("");

  return (
    <form
      className={classNames("tw-w-full", className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <Input
        className={classNames(
          "tw-w-full tw-border focus:tw-ring-0 focus:tw-outline-none tw-p-2 hover:tw-bg-slate-50 tw-rounded-lg"
        )}
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={disabled}
      />
      {children}
    </form>
  );
};

export default Search;
