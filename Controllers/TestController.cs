using Microsoft.AspNetCore.Mvc;
using yt_logger.Commands;

namespace yt_logger.Controllers
{
    public class TestController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetTestResponse([FromRoute]GetTestCommand command) => await SendRequest(command);
    }
}
