using MediatR;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Commands.authCommands
{
    public class RegisterCommand : IRequest<Unit>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    //email validation
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Unit>
    {
        private readonly IUserRepository userRepository;
        private readonly IAuthService authService;

        public RegisterCommandHandler(IUserRepository userRepository, IAuthService authService)
        {
            this.userRepository = userRepository;
            this.authService = authService;
        }

        public async Task<Unit> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var exists = await userRepository.GetByEmailAsync(request.Email, cancellationToken);
            if (exists != null)
                throw new Exception("Email exists");

            var hashedPassword = authService.HashPassword(request.Password);

            await userRepository.AddAsync(new User { Email = request.Email, Password = hashedPassword });

            return Unit.Value;
        }
    }
}
