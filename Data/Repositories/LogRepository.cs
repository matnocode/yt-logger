using Microsoft.EntityFrameworkCore;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;
using yt_logger.Data.Models;

namespace yt_logger.Data.Repositories
{
    public class LogRepository : AsyncRepository<Log>, ILogRepository
    {
        private YtLoggerDbContext context;
        public LogRepository(YtLoggerDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<PagedResult> GetPagedResultAsync(int pageSize, int currentPage, string refId)
        {
            var allItems = await context.Logs
                .Include(x => x.Added)
                .Include(x => x.Deleted)
                .Where(x => x.RefId == refId)
                .OrderByDescending(x => x.TimeStamp)
                .ToListAsync();

            return new PagedResult
            {
                Result = allItems.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList(),
                PageCount = allItems.Count / pageSize
            };
        }

        public async Task LogAsync(List<PlaylistItem> added, List<PlaylistItem> deleted, string playlistRefId)
        {
            var toLog = new Log { Added = added, Deleted = deleted, TimeStamp = DateTime.UtcNow, RefId = playlistRefId };
            await context.Logs.AddAsync(toLog);
        }
    }
}
