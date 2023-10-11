using Microsoft.AspNetCore.Mvc;
using yt_logger.Commands.userCommands;

namespace yt_logger.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        public Task<ActionResult> GetUser([FromRoute] GetUserCommand request)
        {
            request.SessionId = Request.Cookies[StaticClasses.SessionIdCookieValue];
            return SendRequest(request);
        }
    }
}
