namespace yt_logger.Data.Dtos
{
    public class PlaylistDto
    {
        public string Title { get; set; }
        public DateTime LastLogged { get; set; }
        public string RefId { get; set; }
        public int ItemCount { get; set; }
        public string ImgUrl { get; set; }
    }
}
