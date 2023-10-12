using Microsoft.EntityFrameworkCore;
using yt_logger.Data.Entities;
using yt_logger.Data.Interfaces;

namespace yt_logger.Data.Repositories
{
    public class UserRepository : AsyncRepository<User>, IUserRepository
    {
        public UserRepository(YtLoggerDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken)
        {
            return await context.Users.FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
        }
    }
}
