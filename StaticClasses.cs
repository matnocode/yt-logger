using yt_logger.Data.Dtos;
using yt_logger.Data.Entities;

namespace yt_logger
{
    public static class StaticClasses
    {
        public static string SessionIdCookieValue = "sessionId";
        public static string SessionExpiresCookieValue = "sessionExpires";
    }

    public static class SessionHandler
    {
        public static Dictionary<Session, UserDto> Sessions { get; private set; } = new();

        public static UserDto GetBySessionId(string sessionId)
        {
            return Sessions.Where(x => x.Key.Id == sessionId).FirstOrDefault().Value;
        }
    }

    public class Session
    {
        public string Id { get; private set; }
        public DateTime Expires { get; private set; }

        public Session(string id, DateTime expires)
        {
            Id = id;
            Expires = expires;
        }
    }

}
