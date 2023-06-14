using Google.Apis.Services;
using Google.Apis.Util;
using Google.Apis.YouTube.v3;
using yt_logger.Data.Interfaces;
using yt_logger.Data.Models;

namespace yt_logger.Services
{
    public class YtService : IYtService
    {
        private YouTubeService youtubeService;

        public YtService()
        {
            var initializer = new BaseClientService.Initializer { ApiKey = "AIzaSyCyhznPAFW3HcwK_xeAUnXT4kLsVw9f10c" };
            youtubeService = new YouTubeService(initializer);
        }

        public async Task<YoutubePlaylistResponse> GetYtPlaylistAsync(string ytPlaylistId)
        {
            var part = new Repeatable<string>(new List<string> { "Snippet", "contentDetails" });

            var request = youtubeService.Playlists.List(part);
            request.MaxResults = 1;
            request.Id = ytPlaylistId;

            var playlistResponse = await request.ExecuteAsync() ?? throw new BadHttpRequestException("playlist not found");
            if (playlistResponse.Items.FirstOrDefault() == null) throw new BadHttpRequestException("playlist not found");

            var playlist = playlistResponse.Items.FirstOrDefault();

            return new YoutubePlaylistResponse
            {
                ItemCount = playlist?.ContentDetails.ItemCount ?? 0,
                NextPageToken = playlistResponse.NextPageToken,
                Title = playlist?.Snippet.Title ?? "",
                ImgUrl = playlist?.Snippet.Thumbnails.Standard.Url ?? playlist?.Snippet.Thumbnails.Medium.Url ?? playlist?.Snippet.Thumbnails.Default__.Url ?? ""
            };
        }

        public async Task<YoutubePlaylistResponseDb> GetYtPlaylistForDbAsync(string ytPlaylistId)
        {
            var part = new Repeatable<string>(new List<string> { "Snippet" });

            var request = youtubeService.Playlists.List(part);
            request.MaxResults = 1;
            request.Id = ytPlaylistId;

            var playlistResponse = await request.ExecuteAsync() ?? throw new BadHttpRequestException("playlist not found");
            if (playlistResponse.Items.FirstOrDefault() == null) throw new BadHttpRequestException("playlist not found");

            var playlist = playlistResponse.Items.FirstOrDefault();

            return new YoutubePlaylistResponseDb { Title = playlist?.Snippet.Title ?? "" };
        }

        public async Task<YoutubePlaylistItemResponse> GetYtPlaylistItemsAsync(string ytPlaylistId, string? nextPageToken = null)
        {
            var part = new Repeatable<string>(new List<string> { "snippet", "contentDetails", "id", "status" });

            var request = youtubeService.PlaylistItems.List(part);
            request.PlaylistId = ytPlaylistId;
            if (nextPageToken != null)
                request.PageToken = nextPageToken;

            var playlistItemsResponse = await request.ExecuteAsync() ?? throw new BadHttpRequestException("playlist not found");

            if (playlistItemsResponse.Items.Count <= 0) throw new BadHttpRequestException("playlist not found");

            var playlistItems = playlistItemsResponse.Items;

            return new YoutubePlaylistItemResponse { Items = playlistItems.ToList(), NextPageToken = playlistItemsResponse.NextPageToken };
        }
    }
}
