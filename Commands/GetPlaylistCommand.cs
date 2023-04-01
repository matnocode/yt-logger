using MediatR;
using yt_logger.Data.Dtos;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Commands
{
    public class GetPlaylistCommand : IRequest<PlaylistDto>
    {
        public string RefId { get; set; }
    }

    public class GetPlaylistCommandHanlder : IRequestHandler<GetPlaylistCommand, PlaylistDto>
    {
        private readonly IPlaylistRepository playlistRepository;
        private readonly IPlaylistItemRepository playlistItemRepository;
        private readonly IYtService ytService;

        public GetPlaylistCommandHanlder(IPlaylistRepository playlistRepository, IYtService ytService, IPlaylistItemRepository playlistItemRepository)
        {
            this.playlistRepository = playlistRepository;
            this.ytService = ytService;
            this.playlistItemRepository = playlistItemRepository;
        }

        public async Task<PlaylistDto> Handle(GetPlaylistCommand request, CancellationToken cancellationToken)
        {
            var dbPlaylist = await playlistRepository.GetByRefId(request.RefId);
            var isNew = dbPlaylist == null;

            if (isNew)
            {
                var response = await ytService.GetYtPlaylistForDbAsync(request.RefId);      
                await playlistRepository.AddAsync(new Playlist { RefId = request.RefId, LastLogDate = DateTime.Now, Title = response.Title });
                var pl = await playlistRepository.GetByRefId(request.RefId);
                var plDto = pl.ToDto(); plDto.DeletedItems = new List<PlaylistItemDto>();
                return plDto;
            }

            var playlist = await playlistRepository.GetByRefId(request.RefId);
            var playlistDto = playlist.ToDto();
            var playlistItems = await playlistItemRepository.GetDeletedPlaylistItemsAsync(request.RefId);

            playlistDto.DeletedItems = playlistItems.Select(x => x.ToDto()).ToList();
            return playlistDto;
        }
    }
}
