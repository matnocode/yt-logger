using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace yt_logger.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ApiController : ControllerBase
    {
        private IMediator mediator => HttpContext.RequestServices.GetService<IMediator>();

        protected async Task<ActionResult> SendRequest<TCommand>(IRequest<TCommand> request)
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
