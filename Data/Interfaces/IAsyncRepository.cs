using yt_logger.Data.Entities;
using yt_logger.Data.Models;

namespace yt_logger.Data.Interfaces
{
    public interface IAsyncRepository<T> where T : BaseEntity
    {
        Task<T> GetAsync(int id);
        Task<List<T>> GetAllAsync();
        Task DeleteAsync(T entity);
        Task UpdateAsync(T entity);
        Task UpdateRangeAsync(ICollection<T> entities);
        Task AddAsync(T entity);
        Task AddRangeAsync(ICollection<T> entities);
    }
}
