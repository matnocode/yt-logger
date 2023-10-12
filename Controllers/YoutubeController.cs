using Microsoft.AspNetCore.Mvc;
using yt_logger.Commands;

namespace yt_logger.Controllers
{
    public class YoutubeController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetPlaylist([FromQuery] GetPlaylistCommand command) => await SendUnauthorizedRequest(command);

        [HttpGet]
        public async Task<ActionResult> LogPlaylist([FromQuery] LogPlaylistCommand command) => await SendUnauthorizedRequest(command);

        [HttpGet]
        public async Task<ActionResult> GetLogPaged([FromQuery] GetLogPagedCommand command) => await SendUnauthorizedRequest(command);

        [HttpGet]
        public ActionResult Ping() 
        {
            return Ok("Got Ping!");
        }
    }
}
