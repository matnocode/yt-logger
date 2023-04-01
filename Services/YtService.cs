using Google.Apis.Services;
using Google.Apis.Util;
using Google.Apis.YouTube.v3;
using yt_logger.Data.Dtos;
using yt_logger.Data.Interfaces;

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
            var part = new Repeatable<string>(new List<string> { $"id={ytPlaylistId}" });

            var request = youtubeService.Playlists.List(part);
            request.MaxResults = 1;

            var playlistResponse = await request.ExecuteAsync() ?? throw new BadHttpRequestException("playlist not found");
            if (playlistResponse.Items.FirstOrDefault() == null) throw new BadHttpRequestException("playlist not found");

            var playlist = playlistResponse.Items.FirstOrDefault();

            return new YoutubePlaylistResponse { ItemCount = playlist?.ContentDetails.ItemCount ?? 0, NextPageToken = playlistResponse.NextPageToken, Title = playlist?.Snippet.Title ?? "" };
        }

        public async Task<YoutubePlaylistItemResponse> GetYtPlaylistItemsAsync(string ytPlaylistId)
        {
            var part = new Repeatable<string>(new List<string> { $"id={ytPlaylistId}" });

            var request = youtubeService.PlaylistItems.List(part);
            request.MaxResults = 100;

            var playlistItemsResponse = await request.ExecuteAsync() ?? throw new BadHttpRequestException("playlist not found");
            if (playlistItemsResponse.Items.Count <= 0) throw new BadHttpRequestException("playlist not found");

            var playlistItems = playlistItemsResponse.Items;

            return new YoutubePlaylistItemResponse { Items = playlistItems.ToList(), NextPageToken = playlistItemsResponse.NextPageToken };
        }

        public async Task<YoutubePlaylistItemResponse> GetYtPlaylistItemsAsync(string ytPlaylistId, string nextPageToken)
        {
            var part = new Repeatable<string>(new List<string> { $"id={ytPlaylistId}", $"pageToken={nextPageToken}" });

            var request = youtubeService.PlaylistItems.List(part);
            request.MaxResults = 100;

            var playlistItemsResponse = await request.ExecuteAsync() ?? throw new BadHttpRequestException("playlist not found");
            if (playlistItemsResponse.Items.Count <= 0) throw new BadHttpRequestException("playlist not found");

            var playlistItems = playlistItemsResponse.Items;

            return new YoutubePlaylistItemResponse { Items = playlistItems.ToList(), NextPageToken = playlistItemsResponse.NextPageToken };
        }
    }
}
