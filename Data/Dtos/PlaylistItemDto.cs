namespace yt_logger.Data.Dtos
{
    public class PlaylistItemDto
    {
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string VideoOwnerChannelTitle { get; set; }
        public string VideoOwnerChannelId { get; set; }
        public DateTime VideoPublishedAt { get; set; }
    }
}
