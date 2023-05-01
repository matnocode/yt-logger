using System.ComponentModel.DataAnnotations;

namespace yt_logger.Data.Entities
{
    public class Log : BaseEntity
    {
        public DateTime TimeStamp { get; set; }
        [Key]
        public string RefId { get; set; }

        public List<PlaylistItem> Added { get; set; } = new List<PlaylistItem>();
        public List<PlaylistItem> Deleted { get; set; } = new List<PlaylistItem>();
    }
}
