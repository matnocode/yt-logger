namespace yt_logger.Data.Interfaces
{
    public interface IAsyncRepository<T>
    {
        public Task<T> GetAsync(int id);
        Task DeleteAsync(T entity);
        Task UpdateAsync(T entity);
        Task UpdateRangeAsync(ICollection<T> entities);
        Task AddAsync(T entity);
        Task AddRangeAsync(ICollection<T> entities);
    }
}
