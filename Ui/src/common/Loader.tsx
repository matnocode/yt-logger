import { FC } from "react";
import classNames from "classnames";

interface SvgProps extends React.SVGAttributes<object> {}

interface Props {
  svgProps?: SvgProps;
  className?: string;
}

const Loader: FC<Props> = ({ className, svgProps }) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-justify-center">
      <div
        className={classNames(
          "tw-border-8 tw-text-blue-400 tw-text-4xl tw-animate-spin tw-border-gray-300 tw-flex tw-items-center tw-justify-center tw-border-t-blue-400 tw-rounded-full",
          className
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="tw-animate-ping"
          {...svgProps}
        >
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
