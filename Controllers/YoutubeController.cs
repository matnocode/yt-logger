using Microsoft.AspNetCore.Mvc;
using yt_logger.Commands;

namespace yt_logger.Controllers
{
    public class YoutubeController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetPlaylist([FromQuery] GetPlaylistCommand command) => await SendRequest(command);

        [HttpPut]
        public async Task<ActionResult> LogPlaylist([FromQuery] LogPlaylistCommand command) => await SendRequest(command);
    }
}
