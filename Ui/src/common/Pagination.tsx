import Dropdown, { DropdownAction } from "./Dropdown";
import { FC, useState } from "react";

import Button from "./Button";
import { PagedResult } from "../model/playlistItem";
import classNames from "classnames";
import useUrlParams from "../hooks/useUrlParams";

interface Props {
  data: PagedResult;
}

const Pagination: FC<Props> = ({ data }) => {
  const { getPage, getPageSize, setParams } = useUrlParams();
  const pageSize = getPageSize() ?? 5;
  const page = getPage() ?? 1;

  const numPage = Number(page);

  const pageSizeSelectActions: DropdownAction[] = [
    { action: () => setParams("pageSize", "5"), label: "5" },
    { action: () => setParams("pageSize", "10"), label: "10" },
    { action: () => setParams("pageSize", "25"), label: "25" },
  ];

  return (
    <div className="tw-flex tw-justify-between tw-p-3">
      <Dropdown actions={pageSizeSelectActions}>
        <Button className="tw-px-2" buttonType="secondary">
          {pageSize}
        </Button>
      </Dropdown>
      <div>
        {numPage - 1 > 0 && (
          <Button
            buttonType="primary"
            className="tw-mx-[2px] tw-px-2"
            onClick={() => setParams("page", String(numPage - 1))}
          >
            {numPage - 1}
          </Button>
        )}
        <Button
          buttonType="primary"
          className="tw-mx-[2px] tw-px-2 tw-border-black"
        >
          {numPage}
        </Button>
        {numPage + 1 < data.pageCount && (
          <Button
            buttonType="primary"
            className="tw-mx-[2px] tw-px-2"
            onClick={() => setParams("page", String(numPage + 1))}
          >
            {numPage + 1}
          </Button>
        )}
        {numPage + 1 <= data.pageCount && numPage + 2 <= data.pageCount && (
          <Button buttonType="tertiary" className="tw-mx-[2px] tw-px-3">
            ...
          </Button>
        )}

        {page != data.pageCount && (
          <Button
            buttonType="primary"
            className="tw-mx-[2px] tw-px-2"
            onClick={() => setParams("page", String(data.pageCount))}
          >
            {data.pageCount}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
