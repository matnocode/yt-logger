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

        public async Task<List<PlaylistItem>> GetExisting(List<string> refIds) => await context.PlaylistItems.Where(x => refIds.Contains(x.RefId)).ToListAsync();
    }
}
