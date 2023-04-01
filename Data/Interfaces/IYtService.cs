using yt_logger.Data.Dtos;

namespace yt_logger.Data.Interfaces
{
    public interface IYtService
    {
        Task<YoutubePlaylistResponse> GetYtPlaylistAsync(string refId);
        Task<YoutubePlaylistItemResponse> GetYtPlaylistItemsAsync(string ytPlaylistId);
        Task<YoutubePlaylistItemResponse> GetYtPlaylistItemsAsync(string ytPlaylistId, string nextPageToken);
    }
}
