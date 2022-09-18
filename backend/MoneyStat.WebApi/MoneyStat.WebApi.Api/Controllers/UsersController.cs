using Microsoft.AspNetCore.Mvc;
using MoneyStat.DataBase.Entities;
using MoneyStat.WebApi.Api.Attributes;
using MoneyStat.WebApi.Api.Dto.Users;
using MoneyStat.WebApi.Model.Services;

namespace MoneyStat.WebApi.Api.Controllers;

[ApiController]
[ApiRoute(typeof(UsersController))]
public sealed class UsersController : ControllerBase
{
    private readonly IUserService userService;

    public UsersController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult> AddUser([FromBody] UserDto dto)
    {
        var entity = new User { Name = dto.Name, Age = dto.Age };
        await userService.AddUser(entity);
        return Ok();
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<ActionResult<UserDto>> GetUser([FromRoute] int id)
    {
        var entity = await userService.GetUser(id);
        var dto = new UserDto { Id = entity.Id, Name = entity.Name, Age = entity.Age };
        return Ok(dto);
    }
}