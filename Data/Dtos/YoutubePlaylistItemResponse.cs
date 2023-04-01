using Google.Apis.YouTube.v3.Data;

namespace yt_logger.Data.Dtos
{
    public class YoutubePlaylistItemResponse
    {
        public List<PlaylistItem> Items { get; set; }
        public string NextPageToken { get; set; }
    }
}
