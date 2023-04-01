using yt_logger.Data.Entities;

namespace yt_logger.Data.Dtos
{
    public static class DtoExtensions
    {
        public static PlaylistDto ToDto(this Playlist playlist)
        {
            return new PlaylistDto
            {
                ItemCount = playlist.PlaylistItems == null ? 0 : playlist.PlaylistItems.Count,
                LastLogged = playlist.LastLogDate,
                RefId = playlist.RefId,
                Title = playlist.Title
            };
        }

        public static PlaylistItemDto ToDto(this PlaylistItem playlistItem)
        {
            return new PlaylistItemDto
            {
                ImgUrl = playlistItem.ImgUrl,
                Title = playlistItem.Title,
                VideoOwnerChannelId = playlistItem.VideoOwnerChannelId,
                VideoOwnerChannelTitle = playlistItem.VideoOwnerChannelTitle,
                VideoPublishedAt = playlistItem.VideoPublishedAt
            };
        }
    }
}
