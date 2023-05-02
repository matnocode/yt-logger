using MediatR;
using yt_logger.Data.Dtos;
using yt_logger.Data.Interfaces;

namespace yt_logger.Commands
{
    public class GetPlaylistCommand : IRequest<PlaylistDto>
    {
        public string RefId { get; set; }
    }

    public class GetPlaylistCommandHandler : IRequestHandler<GetPlaylistCommand, PlaylistDto>
    {
        private readonly IPlaylistRepository playlistRepository;
        private readonly IYtService ytService;

        public GetPlaylistCommandHandler(IPlaylistRepository playlistRepository, IYtService ytService)
        {
            this.playlistRepository = playlistRepository;
            this.ytService = ytService;
        }

        public async Task<PlaylistDto> Handle(GetPlaylistCommand request, CancellationToken cancellationToken)
        {
            var playlist = await playlistRepository.GetByRefIdAsync(request.RefId);
            if (playlist != null)
                return playlist.ToDto();

            var ytPlaylist = await ytService.GetYtPlaylistAsync(request.RefId);
            await playlistRepository.AddAsync(new Data.Entities.Playlist { ImgUrl = ytPlaylist.ImgUrl, RefId = request.RefId, Title = ytPlaylist.Title });
            playlist = await playlistRepository.GetByRefIdAsync(request.RefId);

            return playlist.ToDto();
        }
    }
}
