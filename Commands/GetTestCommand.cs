using MediatR;

namespace yt_logger.Commands
{
    public record GetTestCommand : IRequest<TestDto>;

    public class GetTestCommandHandler : IRequestHandler<GetTestCommand, TestDto>
    {
        public async Task<TestDto> Handle(GetTestCommand request, CancellationToken cancellationToken)
        {
            return new TestDto { Message = "Works!" };
        }
    }
}
