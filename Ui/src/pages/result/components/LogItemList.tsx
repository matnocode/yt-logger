import { FC, useState } from "react";

import BaseContainer from "../../../common/BaseContainer";
import Button from "../../../common/Button";
import { Log } from "../../../model/playlistItem";
import LogItemTable from "./LogItemTable";
import _ from "lodash";
import { getDate } from "../../../utils/date";

interface Props {
  log: Log;
}

const LogItemList: FC<Props> = ({ log }) => {
  const [hideAdded, setHideAdded] = useState(true);
  const [hideDeleted, setHideDeleted] = useState(true);
  const [hideAll, setHideAll] = useState(true);

  const addedLogic = log.added !== undefined && log.added.length > 0;
  const deletedLogic = log.deleted !== undefined && log.deleted.length > 0;

  return (
    <BaseContainer className="tw-w-full tw-p-3 tw-mt-3 tw-rounded-lg ">
      <div>
        <div className="tw-w-full tw-flex tw-items-center tw-justify-between tw-bg-white tw-border tw-rounded-xl tw-p-2 tw-mb-2 tw-text-lg tw-text-center">
          {(addedLogic || deletedLogic) && (
            <Button
              className="hover:tw-bg-slate-100"
              buttonType="tertiary"
              onClick={() => setHideAll((prev) => !prev)}
            >
              ...
            </Button>
          )}
          <div className="tw-w-full tw-text-center tw-text-base md:tw-font-medium">
            {getDate(log.timeStamp)}
          </div>
        </div>
      </div>
      {!hideAll && (
        <div className="tw-space-y-3">
          {addedLogic && (
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[1fr,5fr]">
              <Button
                buttonType="secondary"
                className="tw-p-1"
                onClick={() => setHideAdded((prev) => !prev)}
              >
                Added
              </Button>
            </div>
          )}
          {!hideAdded && (
            <div>
              <LogItemTable logItems={log.added} />
            </div>
          )}
          {deletedLogic && (
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[1fr,5fr]">
              <Button
                buttonType="secondary"
                className="tw-p-1"
                onClick={() => setHideDeleted((prev) => !prev)}
              >
                Deleted
              </Button>
            </div>
          )}
          {!hideDeleted && (
            <div>
              <LogItemTable logItems={log.deleted} />
            </div>
          )}
        </div>
      )}
    </BaseContainer>
  );
};

export default LogItemList;
