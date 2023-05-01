using MediatR;
using yt_logger.Data.Interfaces;
using yt_logger.Data.Models;

namespace yt_logger.Commands
{
    public class GetLogPagedCommand : IRequest<PagedResult>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string RefId { get; set; }
    }

    public class GetLogPagedCommandHandler : IRequestHandler<GetLogPagedCommand, PagedResult>
    {
        private readonly ILogRepository logRepository;

        public GetLogPagedCommandHandler(ILogRepository logRepository)
        {
            this.logRepository = logRepository;
        }

        public async Task<PagedResult> Handle(GetLogPagedCommand request, CancellationToken cancellationToken)
        {
            return await logRepository.GetPagedResultAsync(request.PageSize, request.CurrentPage, request.RefId);
        }
    }
}
