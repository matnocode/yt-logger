type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

type ParamTypes =
  | string
  | number
  | Date
  | boolean
  | null
  | undefined
  | number[];

interface ApiClientOptions {
  params?: Record<string, ParamTypes> | null;
  json?: unknown;
  body?: BodyInit | null;
  signal?: AbortSignal;
}

interface ApiClientResponse extends PromiseLike<Response> {
  json<T = unknown>(): Promise<T>;
}

const wrapResponse = (promise: Promise<Response>): ApiClientResponse => ({
  then: promise.then.bind(promise),
  json: () => promise.then((response) => response.json()),
});

const getFullUrlWithParams = (
  url: string,
  params: Record<string, ParamTypes> | null | undefined
) => {
  if (!params) {
    return url;
  }
  url = "https://localhost:5001" + url;

  const transform = (value: ParamTypes): string => {
    if (value === null || value === undefined) {
      return "";
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    return value.toString();
  };

  const buildParams = () => {
    const p = new URLSearchParams();

    Object.entries(params).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        value.map((item) => p.append(name, transform(item)));
      } else {
        p.append(name, transform(value));
      }
    });

    return p;
  };

  const searchParams = buildParams();

  return `${url}?${searchParams}`;
};

const callApi = (
  method: ApiMethod,
  url: string,
  options: ApiClientOptions = {}
) => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.json) {
    headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  const request: RequestInit = {
    method,
    body: options.json ? JSON.stringify(options.json) : options.body,
    headers,
    signal: options.signal,
    credentials: "include",
  };

  const promise = fetch(getFullUrlWithParams(url, options.params), request);

  return wrapResponse(promise);
};

export const apiClient = {
  get: (url: string, options?: ApiClientOptions) =>
    callApi("GET", url, options),
  post: (url: string, options?: ApiClientOptions) =>
    callApi("POST", url, options),
  put: (url: string, options?: ApiClientOptions) =>
    callApi("PUT", url, options),
  delete: (url: string, options?: ApiClientOptions) =>
    callApi("DELETE", url, options),
} as const;

export type ApiClient = typeof apiClient;
