using MediatR;

namespace yt_logger.Commands.authCommands
{
    public class HandleSessionCommand : IRequest<bool>
    {
        public string? SessionId { get; set; }
        public DateTime? ExpirationDate { get; set; }
    }

    public class HandleSessionCommandHandler : IRequestHandler<HandleSessionCommand, bool>
    {
        public async Task<bool> Handle(HandleSessionCommand request, CancellationToken cancellationToken)
        {
            if (request.SessionId == null || request.ExpirationDate == null)
                return false;
            if (SessionHandler.GetBySessionId(request.SessionId) == null)
                return false;

            if (request.ExpirationDate <= DateTime.UtcNow)
                return false;

            return true;
        }
    }
}
