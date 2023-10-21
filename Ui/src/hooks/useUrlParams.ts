import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export type ParamType = "page" | "pageSize" | "search";

const useUrlParams = () => {
  const [urlQuery, setUrlQuery] = useSearchParams();

  //private
  const getUrlQuery = (key: ParamType) => urlQuery.get(key);

  const getPageSize = () => getUrlQuery("pageSize") ?? 5;
  const getPage = () => getUrlQuery("page") ?? 1;

  const setParams = (key: ParamType, val: string) => {
    const currentParams = Object.fromEntries(urlQuery);
    setUrlQuery({ ...currentParams, [key]: val });
  };

  return { getPageSize, getPage, setParams };
};

export default useUrlParams;
