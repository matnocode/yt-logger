using Microsoft.AspNetCore.Mvc;
using yt_logger.Commands.authCommands;

namespace yt_logger.Controllers
{
    public class AuthController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> Login([FromQuery] LoginCommand command)
        {
            try
            {
                var user = await mediator.Send(command);

                var sessionId = Guid.NewGuid().ToString();
                var expires = DateTime.UtcNow.AddMinutes(30);

                Response.Cookies
                    .Append(StaticClasses.SessionIdCookieValue, sessionId, new CookieOptions() { Expires = expires, SameSite = SameSiteMode.None, Secure = true, Path = "/", Domain = "localhost" });

                Response.Cookies
                    .Append(StaticClasses.SessionExpiresCookieValue, expires.ToString(), new CookieOptions() { Expires = expires, SameSite = SameSiteMode.None, Secure = true, Path = "/", Domain = "localhost" });

                SessionHandler.Sessions.Add(new Session(sessionId, expires), user);

                return Ok();
            }
            catch
            {
                throw new Exception();
            }
        }

        [HttpGet]
        public async Task<ActionResult> Register([FromQuery] RegisterCommand command) => await SendUnauthorizedRequest(command);
    }
}
