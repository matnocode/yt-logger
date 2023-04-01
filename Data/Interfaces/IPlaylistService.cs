using yt_logger.Data.Entities;

namespace yt_logger.Data.Interfaces
{
    public interface IPlaylistService
    {
        Task<List<PlaylistItem>> GetPlaylistDeltedItems(string playlistId);
        Task LogPlaylist(string refId);
    }
}
