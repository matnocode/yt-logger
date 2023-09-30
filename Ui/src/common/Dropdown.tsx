import { PropsWithChildren, useEffect, useRef, useState } from "react";
import React, { ReactElement, useMemo } from "react";

import { FC } from "react";
import classNames from "classnames";

interface Props extends PropsWithChildren {
  actions?: DropdownAction[];
  containerClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
  center?: boolean;
  left?: boolean;
}

export interface DropdownAction {
  label: string;
  action: () => void;
}

//fix
const Dropdown: FC<Props> = ({
  actions,
  containerClassName,
  buttonContainerClassName,
  buttonClassName,
  center,
  left,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const childrenWithOnClick = useMemo(
    () =>
      React.Children.map(
        children as ReactElement,
        (child: React.ReactElement) => {
          return React.cloneElement(child, {
            onClick: () => setVisible((prev) => !prev),
          });
        }
      ),
    [children]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div ref={ref}>
      {!!childrenWithOnClick ? (
        childrenWithOnClick
      ) : (
        <button onClick={() => setVisible((prev) => !prev)}>a</button>
      )}
      <div
        className={classNames(
          "tw-absolute tw-z-10 tw-bg-white tw-divide-y tw-divide-gray-100 tw-rounded-lg tw-shadow tw-flex",
          center && "",
          left && "",
          containerClassName,
          !visible && "tw-hidden"
        )}
      >
        {actions?.map((x, i) => (
          <div
            key={`${x.label}${i}`}
            className={classNames(
              " hover:tw-bg-slate-100 tw-bg-slate-50 tw-text-black",
              buttonContainerClassName
            )}
          >
            <button
              className={classNames("", buttonClassName)}
              onClick={() => x.action()}
            >
              {x.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
