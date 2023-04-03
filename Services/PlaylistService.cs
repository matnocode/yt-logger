using Google.Apis.YouTube.v3.Data;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;
using yt_logger.Data.Models;
using PlaylistItem = Google.Apis.YouTube.v3.Data.PlaylistItem;
using PlaylistItemDb = yt_logger.Data.Entities.PlaylistItem;

namespace yt_logger.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository playlistRepository;
        private readonly IPlaylistItemRepository playlistItemRepository;
        private readonly IYtService ytService;

        public PlaylistService(IPlaylistRepository playlistRepository, IPlaylistItemRepository playlistItemRepository, IYtService ytService)
        {
            this.playlistRepository = playlistRepository;
            this.playlistItemRepository = playlistItemRepository;
            this.ytService = ytService;
        }

        public async Task<List<PlaylistItemDb>> GetPlaylistDeltedItems(string playlistRefId)
        {
            return null;
        }

        public async Task LogPlaylist(string refId)
        {
            var ytPlaylist = await ytService.GetYtPlaylistAsync(refId);
            if (ytPlaylist == null)
                throw new BadHttpRequestException("no playlist");

            //must exist
            var dbPlaylist = await playlistRepository.GetByRefId(refId) ?? throw new BadHttpRequestException("no playlist in db!");

            var ytPlaylistItems = await ytService.GetYtPlaylistItemsAsync(refId);

            if (ytPlaylistItems == null)
                throw new BadHttpRequestException("no playlist");

            var playlistItems = new List<PlaylistItemDb>();

            while (playlistItems.Count < ytPlaylist.ItemCount - 1)
            {
                //await Task.Run(() => AddItemsAction(playlistItems, ytPlaylistItems, dbPlaylist.Id));
                foreach (var ytItem in ytPlaylistItems.Items)
                {
                    await Task.Run(() => AddItemsAction(playlistItems, ytPlaylistItems, dbPlaylist.Id));
                }

                ytPlaylistItems = await ytService.GetYtPlaylistItemsAsync(refId, ytPlaylistItems.NextPageToken) ?? new YoutubePlaylistItemResponse() { Items = new(), NextPageToken = "" };
            }

            if (dbPlaylist.PlaylistItems.Count == 0 && playlistItems.Count > 0)
                await playlistItemRepository.AddRangeAsync(playlistItems);
            else
            {
                if (playlistItems.Count == 0)
                    throw new BadHttpRequestException("no playlist");


                //var newOnes = playlistItems.Where(x=>x.re)
            }
        }

        Action<List<PlaylistItemDb>, YoutubePlaylistItemResponse, int> AddItemsAction = (items, ytItems, playlistId) =>
        {
            foreach (var ytItem in ytItems.Items)
            {
                if (ytItem != null)
                    items.Add(new PlaylistItemDb
                    {
                        RefId = ytItem.ContentDetails?.VideoId ?? "",
                        PlaylistId = playlistId,
                        ImgUrl = ytItem.Snippet?.Thumbnails?.Standard?.Url ?? ytItem.Snippet?.Thumbnails?.Medium?.Url ?? ytItem.Snippet?.Thumbnails?.Default__?.Url ?? "",
                        Title = ytItem.Snippet?.Title ?? "",
                        VideoOwnerChannelId = ytItem.Snippet?.VideoOwnerChannelId ?? "" ?? "",
                        VideoOwnerChannelTitle = ytItem.Snippet?.VideoOwnerChannelTitle ?? "",
                        VideoPublishedAt = ytItem.ContentDetails?.VideoPublishedAt ?? DateTime.MinValue,
                    });
            }
        };
    }
}
