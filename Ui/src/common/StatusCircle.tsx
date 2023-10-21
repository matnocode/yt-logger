import { FC } from "react";
import classNames from "classnames";

const StatusCircle: FC<{ status: Boolean }> = ({ status }) => {
  return (
    <div
      className={classNames(
        "tw-w-[8px] tw-h-[8px] tw-border tw-rounded-full ",
        status
          ? "tw-border-green-600 tw-bg-green-600"
          : "tw-border-red-600 tw-bg-red-600"
      )}
    />
  );
};

export default StatusCircle;
