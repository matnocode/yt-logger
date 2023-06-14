import React, { FC, ReactNode } from "react";
import { Button } from "react-bootstrap";

interface props {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const CustomPaginationButton: FC<props> = ({
  active,
  disabled,
  onClick,
  children,
}) => {
  return (
    <Button
      variant={active ? "ligth" : "outline-secondary"}
      className="mx-1 rounded-3 tw-text-black"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomPaginationButton;
