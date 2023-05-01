using yt_logger.Data.Entities;

namespace yt_logger.Data.Models
{
    public class PagedResult
    {
        public List<Log> Result { get; set; }
        public int PageCount { get; set; }
    }
}
