export interface Playlist {
  nextPageToken: string;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  id: string;
  playlistId: string;
  position: number | undefined;
  snippet: Snippet;
}

interface Standard {
  url: string;
  width: number | undefined;
  height: number | undefined;
}

export interface Thumbnail {
  standard: Standard;
}

export interface Snippet {
  publishedAt: string;
  title: string;
  thumbnails: Thumbnail;
}
