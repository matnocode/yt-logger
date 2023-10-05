import { FC, ReactNode } from "react";

import classNames from "classnames";

interface Props {
  label?: ReactNode;
  value?: ReactNode;
  className?: string;
}

const ItemGroup: FC<Props> = ({ label, value, className }) => {
  return (
    <div
      className={classNames(
        "tw-text-[12px] md:tw-text-[14px] tw-px-2 hover:tw-bg-slate-50",
        className
      )}
    >
      <div className="tw-flex tw-justify-between">
        <div className="tw-text-gray-500">{label}</div>
        <div className="tw-font-medium">{value}</div>
      </div>
    </div>
  );
};

export default ItemGroup;
