namespace yt_logger.Data.Entities
{
    public class Playlist : BaseEntity
    {
        public string Title { get; set; }
        public string RefId { get; set; }
        public DateTime LastLogDate { get; set; }

        public ICollection<PlaylistItem> PlaylistItems { get; }
    }
}
