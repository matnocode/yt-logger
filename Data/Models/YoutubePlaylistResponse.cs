namespace yt_logger.Data.Models
{
    public class YoutubePlaylistResponse
    {
        public long ItemCount { get; set; }
        public string NextPageToken { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
    }
}
