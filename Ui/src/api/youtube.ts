import { PagedResult, Playlist, PlaylistItem } from "../model/playlistItem";

import { apiClient } from "./apiClient";

export const logPlaylist = (refId: string) => {
  return apiClient
    .get("/youtube/logPlaylist", { params: { refId: refId } })
    .json<Playlist>();
};

export const getPlaylist = (refId: string) => {
  return apiClient
    .get("/youtube/getPlaylist", { params: { refId: refId } })
    .json<Playlist>();
};

export const getLogPaged = (
  currentPage: number,
  pageSize: number,
  refId: string
) => {
  return apiClient
    .get("/youtube/getLogPaged", {
      params: { refId: refId, pageSize: pageSize, currentPage: currentPage },
    })
    .json<PagedResult>();
};

export const pingServer = () => {
  return fetch(`https://servedata.sytes.net/youtube/ping`);
};
