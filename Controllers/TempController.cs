using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace yt_logger.Controllers
{
    public class TempItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    [ApiController]
    [Route("[controller]/[action]")]
    public class TempController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetResponse()
        {
            var t = new TempItem { Id = 50, Name="Abe" };
            var a = new JsonResult(t);

            return Ok(a.Value);
        }
    }
}
