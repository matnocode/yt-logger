using yt_logger.Data.Entities;

namespace yt_logger.Data.Interfaces
{
    public interface IPlaylistItemRepository : IAsyncRepository<PlaylistItem>
    {
        Task<List<PlaylistItem>> GetDeletedPlaylistItemsAsync(string refId);
    }
}
