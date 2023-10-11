using MediatR;
using yt_logger.Data.Dtos;
using yt_logger.Data.Entities;

namespace yt_logger.Commands.userCommands
{
    public class GetUserCommand : IRequest<UserDto>
    {
        public string SessionId;
    }

    public class GetUserCommandHandler : IRequestHandler<GetUserCommand, UserDto>
    {
        public async Task<UserDto> Handle(GetUserCommand request, CancellationToken cancellationToken)
        {
            return SessionHandler.GetBySessionId(request.SessionId);
        }
    }
}
