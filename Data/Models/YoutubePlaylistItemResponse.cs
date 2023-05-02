using Google.Apis.YouTube.v3.Data;

namespace yt_logger.Data.Models
{
    public class YoutubePlaylistItemResponse
    {
        public List<PlaylistItem> Items { get; set; }
        public string NextPageToken { get; set; }
    }
}
