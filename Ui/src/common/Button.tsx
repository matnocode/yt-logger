import { ButtonHTMLAttributes, FC } from "react";

import classNames from "classnames";

type Type = "tertiary" | "primary" | "secondary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: Type;
}

const btnClassName =
  "tw-border tw-rounded-md tw-px-1 tw-transition tw-duration-300 tw-font-medium";

const primaryBtnClassName =
  "tw-text-black hover:tw-text-white tw-bg-slate-200 hover:tw-bg-slate-500 active:tw-bg-slate-600";
const tertiaryBtnClassName = "tw-text-black tw-bg-white tw-border-transparent";
const secondaryBtnClassName =
  "tw-text-black tw-bg-white hover:tw-bg-slate-200 active:tw-bg-slate-300";

const Button: FC<Props> = ({
  buttonType,
  children,
  className,
  disabled,
  ...rest
}) => {
  const btnCn = classNames(
    btnClassName,
    buttonType === "tertiary"
      ? tertiaryBtnClassName
      : buttonType === "secondary"
      ? secondaryBtnClassName
      : primaryBtnClassName
  );

  if (disabled) rest.onClick = undefined;

  return (
    <button
      className={classNames(
        btnCn,
        disabled &&
          "tw-opacity-80 tw-cursor-not-allowed hover:tw-bg-inherit active:tw-bg-inherit",
        className
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
