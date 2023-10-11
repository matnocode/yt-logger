using MediatR;
using Microsoft.AspNetCore.Mvc;
using yt_logger.Commands.authCommands;

namespace yt_logger.Controllers
{
    //Todo, make custom exceptions (for expired session )
    [ApiController]
    [Route("[controller]/[action]")]
    public class ApiController : ControllerBase
    {
        protected IMediator mediator => HttpContext.RequestServices.GetService<IMediator>();

        protected async Task<ActionResult> SendRequest<TCommand>(IRequest<TCommand> request)
        {
            var a = Request.Cookies[StaticClasses.SessionIdCookieValue];
            var validSession = await mediator.Send(new HandleSessionCommand() { SessionId = Request.Cookies[StaticClasses.SessionIdCookieValue], ExpirationDate = DateTime.Parse(Request.Cookies[StaticClasses.SessionExpiresCookieValue]) });
            if (!validSession)
                throw new UnauthorizedAccessException();
            else
            {
                var expires = DateTime.UtcNow.AddMinutes(30);
                Response.Cookies.Delete(StaticClasses.SessionExpiresCookieValue);
                Response.Cookies
                    .Append(StaticClasses.SessionExpiresCookieValue, expires.ToString(), new CookieOptions() { Expires = expires, SameSite = SameSiteMode.None, Secure = true, Path = "/", Domain = "localhost" });
            }

            try
            {
                var response = await mediator.Send(request);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        protected async Task<ActionResult> SendUnauthorizedRequest<TCommand>(IRequest<TCommand> request)
        {
            try
            {
                var response = await mediator.Send(request);
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
