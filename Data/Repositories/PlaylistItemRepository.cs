using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Data.Repositories
{
    public class PlaylistItemRepository : AsyncRepository<PlaylistItem>, IPlaylistItemRepository
    {
        public PlaylistItemRepository(YtLoggerDbContext context) : base(context)
        {
        }
    }
}
