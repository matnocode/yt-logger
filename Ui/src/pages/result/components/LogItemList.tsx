import { FC, Fragment, useState } from "react";

import Button from "../../../common/Button";
import { Collapse } from "react-bootstrap";
import { Log } from "../../../model/playlistItem";
import LogItem from "./LogItem";

interface Props {
  log: Log;
}

const LogItemList: FC<Props> = ({ log }) => {
  const [openAdded, setOpenAdded] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);

  return (
    <div className="tw-mt-3">
      <div className="tw-w-full tw-border-b tw-border-collapse tw-min-h-[100px]">
        <div>{getDate(new Date(log.timeStamp))} UTC</div>
        <div>
          <div className="tw-flex tw-flex-col tw-gap-3">
            {log.added.length > 0 && (
              <div>
                <Button
                  buttonType="primary"
                  buttonWidth="150"
                  buttonHeigth="2"
                  onClick={() => setOpenAdded(!openAdded)}
                >
                  Added
                </Button>
                <Collapse in={openAdded}>
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 tw-pt-2">
                    {log.added.map((x, i) => (
                      <Fragment key={`logItem-${i}`}>
                        <LogItem playlistItem={x} />
                      </Fragment>
                    ))}
                  </div>
                </Collapse>
              </div>
            )}
            {log.deleted.length > 0 && (
              <div>
                <Button
                  buttonType="primary"
                  buttonWidth="150"
                  buttonHeigth="2"
                  onClick={() => setOpenDeleted(!openDeleted)}
                >
                  Deleted
                </Button>
                <Collapse in={openDeleted}>
                  <div>
                    {log.deleted.map((x, i) => (
                      <Fragment key={`logItem-${i}`}>
                        <LogItem playlistItem={x} />
                      </Fragment>
                    ))}
                  </div>
                </Collapse>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getDate = (date: Date) =>
  `${date.getFullYear()}-${
    date.getUTCMonth() + 1 < 10
      ? `0${date.getUTCMonth() + 1}`
      : date.getUTCMonth() + 1
  }-${
    date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
  } ${date.getUTCHours()}:${
    date.getUTCMinutes() < 10
      ? `0${date.getUTCMinutes()}`
      : date.getUTCMinutes()
  }:${
    date.getUTCSeconds() < 10
      ? `0${date.getUTCSeconds()}`
      : date.getUTCSeconds()
  }`;

export default LogItemList;
