using MediatR;
using yt_logger.Data.Dtos;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Commands.authCommands
{
    public class LoginCommand : IRequest<UserDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, UserDto>
    {
        private readonly IAuthService authService;
        private readonly IUserRepository userRepository;

        public LoginCommandHandler(IAuthService authService, IUserRepository userRepository)
        {
            this.authService = authService;
            this.userRepository = userRepository;

        }

        public async Task<UserDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByEmailAsync(request.Email, cancellationToken) ?? throw new Exception("User does not exist!");

            if (!authService.VerifyPassword(user.Password, request.Password))
                throw new Exception("Bad Password");

            return user.ToDto();
        }
    }
}
