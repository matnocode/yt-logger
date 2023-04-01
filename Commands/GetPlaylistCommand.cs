using MediatR;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Commands
{
    public class GetPlaylistCommand : IRequest<Playlist>
    {
        public string RefId { get; set; }
    }

    public class GetPlaylistCommandHanlder : IRequestHandler<GetPlaylistCommand, Playlist>
    {
        private readonly IPlaylistRepository playlistRepository;

        public GetPlaylistCommandHanlder(IPlaylistRepository playlistRepository)
        {
            this.playlistRepository = playlistRepository;
        }

        public async Task<Playlist> Handle(GetPlaylistCommand request, CancellationToken cancellationToken)
        {
            return await playlistRepository.GetByRefId(request.RefId);
        }
    }
}
