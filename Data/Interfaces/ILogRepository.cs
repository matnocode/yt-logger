using yt_logger.Data.Entities;
using yt_logger.Data.Models;

namespace yt_logger.Data.Interfaces
{
    public interface ILogRepository : IAsyncRepository<Log>
    {
        Task<PagedResult> GetPagedResultAsync(int pageSize, int currentPage, string refId);
        Task LogAsync(List<PlaylistItem> added, List<PlaylistItem> deleted, string playlistRefId);
    }
}
