import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { FC } from "react";
import classNames from "classnames";

interface Props extends PropsWithChildren {
  actions?: DropdownAction[];
  childrenContainerClassName?: string;
  actionsContainerClassName?: string;
}

export interface DropdownAction {
  label: string;
  action: () => void;
}

const Dropdown: FC<Props> = ({
  actions,
  childrenContainerClassName,
  actionsContainerClassName,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      <div
        className={classNames(childrenContainerClassName)}
        onClick={() => setVisible(!visible)}
      >
        {children}
      </div>
      {visible && (
        <div
          className={classNames(
            "tw-bg-white tw-border tw-absolute",
            actionsContainerClassName
          )}
        >
          {actions?.map((x, i) => (
            <div
              key={`dropdownItem-${i}`}
              onClick={() => {
                setVisible(false);
                x.action();
              }}
              className="hover:tw-bg-slate-100 tw-cursor-pointer tw-p-2"
            >
              {x.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
