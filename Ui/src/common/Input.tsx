import { FC, InputHTMLAttributes } from "react";

import classNames from "classnames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<Props> = (props) => {
  return (
    <input
      className={classNames(
        "tw-w-full tw-border focus:tw-ring-0 focus:tw-outline-none tw-p-2 hover:tw-bg-slate-50 tw-rounded-lg",
        props.className
      )}
      {...props}
    />
  );
};

export default Input;
