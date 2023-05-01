using yt_logger.Data.Entities;

namespace yt_logger.Data.Interfaces
{
    public interface IPlaylistRepository : IAsyncRepository<Playlist>
    {
        Task<Playlist> GetByRefIdAsync(string refId);
    }
}
