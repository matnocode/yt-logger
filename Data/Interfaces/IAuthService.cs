namespace yt_logger.Data.Interfaces
{
    public interface IAuthService
    {
        bool VerifyPassword(string hashedPassword, string plainPassword);
        string HashPassword(string plainPassword);
    }
}
