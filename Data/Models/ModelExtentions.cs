using PlaylistItem = Google.Apis.YouTube.v3.Data.PlaylistItem;
using PlaylistItemDb = yt_logger.Data.Entities.PlaylistItem;

namespace yt_logger.Data.Models
{
    public static class ModelExtentions
    {
        public static PlaylistItemDb ToDbItem(this PlaylistItem item) 
        {
            return item == null ? new PlaylistItemDb() : new PlaylistItemDb
            {
                RefId = item.ContentDetails?.VideoId ?? "",
                ImgUrl = item.Snippet?.Thumbnails?.Standard?.Url ?? item.Snippet?.Thumbnails?.Medium?.Url ?? item.Snippet?.Thumbnails?.Default__?.Url ?? "",
                Title = item.Snippet?.Title ?? "",
                VideoOwnerChannelId = item.Snippet?.VideoOwnerChannelId ?? "" ?? "",
                VideoOwnerChannelTitle = item.Snippet?.VideoOwnerChannelTitle ?? "",
                VideoPublishedAt = item.ContentDetails?.VideoPublishedAt ?? DateTime.MinValue,
            };
        }
    }
}
