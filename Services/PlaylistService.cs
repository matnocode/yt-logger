using yt_logger.Data.Dtos;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

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

        public async Task<List<PlaylistItem>> GetPlaylistDeltedItems(string playlistRefId)
        {
            return null;
        }

        public async Task LogPlaylist(string refId)
        {
            var ytPlaylist = await ytService.GetYtPlaylistAsync(refId);

            var dbPlaylist = new Playlist { RefId = refId, LastLogDate = DateTime.Now, Title = ytPlaylist.Title };

            await playlistRepository.AddAsync(dbPlaylist);
            var addedDbPlaylist = await playlistRepository.GetByRefId(refId);

            var ytPlaylistItems = await ytService.GetYtPlaylistItemsAsync(refId);
            var playlistItems = new List<PlaylistItem>();

            while (playlistItems.Count != ytPlaylist.ItemCount)
            {
                await Task.Run(() => AddItemsAction(playlistItems, ytPlaylistItems, addedDbPlaylist.Id));
                ytPlaylistItems = await ytService.GetYtPlaylistItemsAsync(refId, ytPlaylistItems.NextPageToken);
            }

            await playlistItemRepository.AddRangeAsync(playlistItems);
        }

        Action<List<PlaylistItem>, YoutubePlaylistItemResponse, int> AddItemsAction = (items, ytItems, playlistId) =>
        {
            foreach (var ytItem in ytItems.Items)
            {
                items.Add(new PlaylistItem
                {
                    RefId = ytItem.ContentDetails.VideoId,
                    PlaylistId = playlistId,
                    ImgUrl = ytItem.Snippet.Thumbnails.Standard.Url,
                    Title = ytItem.Snippet.Title,
                    VideoOwnerChannelId = ytItem.Snippet.VideoOwnerChannelId,
                    VideoOwnerChannelTitle = ytItem.Snippet.VideoOwnerChannelTitle,
                    VideoPublishedAt = ytItem.ContentDetails.VideoPublishedAt ?? DateTime.MinValue,
                });
            }
        };
    }
}
