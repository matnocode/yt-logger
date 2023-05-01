import { Button, Collapse } from "react-bootstrap";
import { Log } from "../../../model/playlistItem";
import { useState } from "react";

interface Props {
  log: Log;
}

const LogItem: React.FC<Props> = ({ log }) => {
  const [openAdded, setOpenAdded] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);

  return (
    <div className="tw-mt-3">
      <div className="tw-flex tw-w-full tw-border-b tw-border-collapse tw-min-h-[100px]">
        <div>
          {GetFormattedDate(new Date(log.timeStamp).toISOString())} [UTC]
        </div>
        <div>
          {log.added.length > 0 || log.deleted.length > 0 ? (
            <div>
              {log.added.length > 0 && (
                <>
                  <Button
                    className="tw-bg-red-400"
                    onClick={() => setOpenAdded(!openAdded)}
                  >
                    Added
                  </Button>
                  <Collapse in={openAdded}>
                    <div>
                      {log.added.map((x) => (
                        <>Added: {x.title}</>
                      ))}
                    </div>
                  </Collapse>
                </>
              )}
              {log.deleted.length > 0 && (
                <>
                  <Button onClick={() => setOpenDeleted(!openDeleted)}>
                    Deleted
                  </Button>
                  <Collapse in={openAdded}>
                    <div>
                      {log.deleted.map((x) => (
                        <>Deleted: {x.title}</>
                      ))}
                    </div>
                  </Collapse>
                </>
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

export const GetFormattedDate = (isoDate: string) => {
  return isoDate.slice(0, 19).replace("T", " ");
};

export default LogItem;
