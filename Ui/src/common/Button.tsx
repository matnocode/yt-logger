import { ButtonHTMLAttributes, FC } from "react";

import React from "react";
import cn from "classnames";

type buttonType = "default" | "primary" | "default-outline" | "no-style";
type buttonWidth = "100" | "150" | "175" | "200" | "250" | "300" | "500";
type buttonHeigth = "1" | "2" | "3" | "4" | "5";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: buttonType;
  buttonWidth?: buttonWidth;
  buttonHeigth?: buttonHeigth;
}

const Button: FC<Props> = ({
  buttonType,
  children,
  buttonWidth,
  buttonHeigth,
  className,
  ...rest
}) => {
  return (
    <button
      className={cn("tw-font-medium tw-rounded-md tw-text-sm", {
        "tw-text-white tw-bg-gray-600 hover:tw-bg-gray-800":
          buttonType == "default",
        "tw-text-black tw-bg-gray-200 hover:tw-bg-gray-300":
          buttonType == "primary",
        "tw-text-gray-600 hover:tw-text-white tw-bg-white hover:tw-bg-gray-400 tw-border-2 tw-border-gray-400 active:tw-bg-gray-500":
          buttonType == "default-outline",
        className,
      })}
      type="button"
      {...rest}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, {}) : child
      )}
    </button>
  );
};

export default Button;
