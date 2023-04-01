import { Playlist } from "../model/playlistItem";
import { apiClient } from "./apiClient";

export const getPlaylist = (refId: string) => {
  return apiClient
    .get("/youtube/getPlaylist", { params: { refId: refId } })
    .json<Playlist>();
};

export const logPlaylist = (refId: string) => {
  return apiClient
    .put("/youtube/logPlaylist", { params: { refId: refId } })
    .json<void>();
};
