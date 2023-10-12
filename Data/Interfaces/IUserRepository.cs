using yt_logger.Data.Entities;

namespace yt_logger.Data.Interfaces
{
    public interface IUserRepository : IAsyncRepository<User>
    {
        Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken);
    }
}
