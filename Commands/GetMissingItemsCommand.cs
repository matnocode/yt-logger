using MediatR;
using yt_logger.Data.Entities;

namespace yt_logger.Commands
{
    public class GetMissingItemsCommand : IRequest<List<PlaylistItem>>
    {
        public string PlaylistId { get; set; }
    }

    public class GetMissingItemsCommandHanlder : IRequestHandler<GetMissingItemsCommand, List<PlaylistItem>>
    {

        public Task<List<PlaylistItem>> Handle(GetMissingItemsCommand request, CancellationToken cancellationToken)
        {
            return null;
        }
    }
}
