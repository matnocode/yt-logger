import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

interface Props extends PropsWithChildren {
  className?: string;
}

const BaseContainer: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={classNames("tw-bg-gray-50 tw-border tw-rounded-lg", className)}
    >
      {children}
    </div>
  );
};

export default BaseContainer;
