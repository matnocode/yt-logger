import { Button, Collapse } from "react-bootstrap";
import { Log, PlaylistItem } from "../../../model/playlistItem";
import { FC, useState } from "react";
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
          {log.added.length > 0 || log.deleted.length > 0 ? (
            <div>
              {log.added.length > 0 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenAdded(!openAdded)}
                    className="tw-text-white tw-bg-gradient-to-r tw-from-green-400 tw-via-green-500 tw-to-green-600 hover:tw-bg-gradient-to-br focus:tw-outline-none focus:tw-ring-green-300 dark:focus:tw-ring-green-800 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center tw-mr-2 tw-mb-2"
                  >
                    Added
                  </button>
                  <Collapse in={openAdded}>
                    <div className="tw-flex tw-flex-col">
                      {log.added.map((x) => (
                        <LogItem playlistItem={x} />
                      ))}
                    </div>
                  </Collapse>
                </div>
              )}
              {log.deleted.length > 0 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenDeleted(!openDeleted)}
                    className="tw-text-white tw-bg-gradient-to-r tw-from-red-400 tw-via-red-500 tw-to-red-600 hover:tw-bg-gradient-to-br focus:tw-outline-none focus:tw-ring-red-300 dark:focus:tw-ring-red-800 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center tw-mr-2 tw-mb-2"
                  >
                    Deleted
                  </button>

                  <Collapse in={openDeleted}>
                    <div>
                      {log.deleted.map((x) => (
                        <LogItem playlistItem={x} deleted />
                      ))}
                    </div>
                  </Collapse>
                </div>
              )}
            </div>
          ) : (
            <>No changes were made</>
          )}
        </div>
      </div>
    </div>
  );
  
};

export const getDate = (date: Date) =>
  `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${
    date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
  } ${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }:${date.getSeconds()}`;

export default LogItemList;
