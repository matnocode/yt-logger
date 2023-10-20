using yt_logger.Data.Entities;

namespace yt_logger.Data.Dtos
{
    public static class DtoExtensions
    {
        public static PlaylistDto ToDto(this Playlist playlist)
        {
            return new PlaylistDto
            {
                ItemCount = playlist.PlaylistItems == null ? 0 : playlist.PlaylistItems.Count,
                LastLogged = playlist.LastLogDate.Value,
                RefId = playlist.RefId,
                Title = playlist.Title,
                ImgUrl = playlist.ImgUrl ?? ""
            };
        }

        public static UserDto ToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email
            };
        }
    }
}
