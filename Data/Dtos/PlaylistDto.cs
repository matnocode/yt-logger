
using yt_logger.Data.Entities;

namespace yt_logger.Data.Dtos
{
    public class PlaylistDto
    {
        public string Title { get; set; }
        public DateTime LastLogged { get; set; }
        public List<PlaylistItemDto> DeletedItems { get; set; }
        public string RefId { get; set; }
        public int ItemCount { get; set; }
    }
}
