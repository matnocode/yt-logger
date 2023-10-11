using Microsoft.EntityFrameworkCore;
using yt_logger.Data.Entities;

namespace yt_logger.Data
{
    public class YtLoggerDbContext : DbContext
    {
        public YtLoggerDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistItem> PlaylistItems { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
