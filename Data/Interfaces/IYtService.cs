using yt_logger.Data.Models;

namespace yt_logger.Data.Interfaces
{
    public interface IYtService
    {
        Task<YoutubePlaylistResponse> GetYtPlaylistAsync(string refId);
        Task<YoutubePlaylistItemResponse> GetYtPlaylistItemsAsync(string ytPlaylistId, string? nextPageToken = null);
        Task<YoutubePlaylistResponseDb> GetYtPlaylistForDbAsync(string ytPlaylistId);
    }
}
