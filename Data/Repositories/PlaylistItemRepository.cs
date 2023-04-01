using Microsoft.EntityFrameworkCore;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Data.Repositories
{
    public class PlaylistItemRepository : AsyncRepository<PlaylistItem>, IPlaylistItemRepository
    {
        private YtLoggerDbContext context { get; set; }

        public PlaylistItemRepository(YtLoggerDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<List<PlaylistItem>> GetDeletedPlaylistItemsAsync(string refId)
        {
            return await context.PlaylistItems.Where(x => x.RefId == refId && x.IsDeleted).ToListAsync();
        }
    }
}
