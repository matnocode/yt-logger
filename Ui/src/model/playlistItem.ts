export interface Playlist {
  title: string;
  refId: string;
  itemCount: number;
  lastLogged?: string;
  imgUrl: string;
}

export interface PlaylistItem {
  title: string;
  imgUrl: string;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
  videoPublishedAt: string;
  refId: string;
  isDeleted: boolean;
  playlistId: number;
}

export interface Log {
  id: number;
  timeStamp: string;
  refId: string;
  added: PlaylistItem[];
  deleted: PlaylistItem[];
}

export interface PagedResult {
  result: Log[];
  pageCount: number;
}
