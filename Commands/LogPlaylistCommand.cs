using MediatR;
using yt_logger.Data.Interfaces;

namespace yt_logger.Commands
{
    public class LogPlaylistCommand : IRequest<Unit>
    {
        public string RefId { get; set; }
    }

    public class LogPlaylistCommandHanlder : IRequestHandler<LogPlaylistCommand, Unit>
    {
        private readonly IPlaylistService playlistService;

        public LogPlaylistCommandHanlder(IPlaylistService playlistService)
        {
            this.playlistService = playlistService;
        }

        public async Task<Unit> Handle(LogPlaylistCommand request, CancellationToken cancellationToken)
        {
            await playlistService.LogPlaylist(request.RefId);
            return Unit.Value;
        }
    }
}
