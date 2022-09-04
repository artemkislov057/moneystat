using Microsoft.AspNetCore.Mvc;

namespace MoneyStat.WebApi.Api.Controllers;

[ApiController]
[Route("api/home")]
public sealed class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Index()
    {
        return Ok("hello world");
    }
}