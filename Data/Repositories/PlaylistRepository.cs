using Google.Apis.YouTube.v3;
using Microsoft.EntityFrameworkCore;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Data.Repositories
{
    public class PlaylistRepository : AsyncRepository<Playlist>, IPlaylistRepository
    {
        private readonly YtLoggerDbContext context;

        public PlaylistRepository(YtLoggerDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<Playlist> GetByRefIdAsync(string refId)
        {
            return await context.Playlists.Include(x => x.PlaylistItems).FirstOrDefaultAsync(x => x.RefId == refId);
        }
    }
}
