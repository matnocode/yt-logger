import { FC } from "react";
import classNames from "classnames";

export type Size = "sm" | "md" | "lg";

interface Props {
  src: string;
  className?: string;
  imgClassName?: string;
  size?: Size;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Picture: FC<Props> = ({
  src,
  size,
  className,
  imgClassName,
  onClick,
}) => {
  const sz =
    size == "md" ? "tw-w-[48px]" : size == "lg" ? "tw-w-[96px]" : "tw-w-[24px]";
  return (
    <div onClick={(e) => onClick?.(e)}>
      <div className={classNames(className)}>
        <img
          className={classNames("tw-rounded-md", imgClassName, sz)}
          src={src}
        />
      </div>
    </div>
  );
};

export default Picture;
