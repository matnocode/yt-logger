using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;
using yt_logger.Data.Models;
using PlaylistItemDb = yt_logger.Data.Entities.PlaylistItem;

namespace yt_logger.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IPlaylistRepository playlistRepository;
        private readonly IPlaylistItemRepository playlistItemRepository;
        private readonly ILogRepository logRepository;
        private readonly IYtService ytService;

        public PlaylistService(IPlaylistRepository playlistRepository, IYtService ytService, ILogRepository logRepository, IPlaylistItemRepository playlistItemRepository)
        {
            this.playlistRepository = playlistRepository;
            this.ytService = ytService;
            this.logRepository = logRepository;
            this.playlistItemRepository = playlistItemRepository;
        }

        public async Task LogPlaylist(string refId)
        {
            var ytPlaylist = await ytService.GetYtPlaylistAsync(refId) ?? throw new BadHttpRequestException("no playlist");
            var dbPlaylist = await playlistRepository.GetByRefIdAsync(refId) ?? throw new BadHttpRequestException("no playlist in db!");

            var ytPlaylistItems = await ytService.GetYtPlaylistItemsAsync(refId) ?? throw new BadHttpRequestException("no playlist");
            var playlistItems = new List<PlaylistItemDb>();

            dbPlaylist.ImgUrl = ytPlaylist.ImgUrl;

            do
            {
                foreach (var ytItem in ytPlaylistItems.Items)
                    if (ytItem != null)
                        playlistItems.Add(ytItem.ToDbItem());

                ytPlaylistItems = await ytService.GetYtPlaylistItemsAsync(refId, ytPlaylistItems.NextPageToken) ?? new YoutubePlaylistItemResponse() { Items = new(), NextPageToken = "" };
            }
            while (!string.IsNullOrEmpty(ytPlaylistItems.NextPageToken));

            await AddEditPlaylistVideos(dbPlaylist.PlaylistItems?.ToList() ?? new(), playlistItems, dbPlaylist);
        }

        async Task AddEditPlaylistVideos(List<PlaylistItemDb> dbItems, List<PlaylistItemDb> newItems, Playlist playlist)
        {
            playlist.LastLogDate = DateTime.UtcNow;

            if (dbItems.Count > 0)
            {
                var added = new List<PlaylistItemDb>();
                var deleted = new List<PlaylistItemDb>();
                //if db doesnt contain item from yt playlist, that means its newly added
                newItems.ForEach(newItem => { if (!dbItems.Exists(dbItem => newItem.RefId == dbItem.RefId)) added.Add(newItem); });

                //wont add new entries if refId (video id) exist in db
                var existingDbItems = await playlistItemRepository.GetExisting(newItems.Select(x => x.RefId).ToList());
                added = added.Select(x => existingDbItems.FirstOrDefault(z => z.RefId == x.RefId) ?? x).ToList();

                //if yt playlist doesnt contain item from db, that means it was logged in db (has entry), but deleted from playlist (doesnt have entry)
                dbItems.ForEach(dbItem => { if (!newItems.Exists(newItem => newItem.RefId == dbItem.RefId)) deleted.Add(dbItem); });

                playlist.PlaylistItems.AddRange(added);
                playlist.PlaylistItems.RemoveAll(x => deleted.Exists(d => d.RefId == x.RefId));

                await logRepository.LogAsync(added, deleted, playlist.RefId);
            }
            else
            {
                await logRepository.LogAsync(new(), new(), playlist.RefId);
                playlist.PlaylistItems.AddRange(newItems);
            }

            await playlistRepository.UpdateAsync(playlist);
        }
    }
}
