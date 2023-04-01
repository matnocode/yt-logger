export interface Playlist {
  title: string;
  refId: string;
  deletedItems: PlaylistItem[];
  lastLogged: string;
}

export interface PlaylistItem {
  title: string;
  imgUrl: string;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
  videoPublishedAt: string;
}
