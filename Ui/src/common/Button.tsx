import React from "react";
import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

type buttonType = "default" | "primary" | "default-outline";
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
        "tw-w-[100px]": buttonWidth === "100",
        "tw-w-[150px]": buttonWidth === "150",
        "tw-w-[175px]": buttonWidth === "175",
        "tw-w-[200px]": buttonWidth === "200",
        "tw-w-[250px]": buttonWidth === "250",
        "tw-w-[300px]": buttonWidth === "300",
        "tw-w-[500px]": buttonWidth === "500",
        "tw-p-1": buttonHeigth === "1",
        "tw-p-2": buttonHeigth === "2",
        "tw-p-3": buttonHeigth === "3",
        "tw-p-4": buttonHeigth === "4",
        "tw-p-5": buttonHeigth === "5",
        "tw-text-white tw-bg-gray-600 hover:tw-bg-gray-800":
          buttonType == "default",
        "tw-text-black tw-bg-gray-200 hover:tw-bg-gray-300":
          buttonType == "primary",
        "tw-text-gray-600 hover:tw-text-white tw-bg-white hover:tw-bg-gray-400 tw-border-2 tw-border-gray-400 active:tw-bg-gray-500":
          buttonType == "default-outline",
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
