using Microsoft.AspNetCore.Mvc;
using MoneyStat.DataBase.Entities;
using MoneyStat.Infra.Helpers;
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
    public async Task<ActionResult> AddUser([FromBody] AddUserBodyDto resultDto)
    {
        var entity = TypeMapper<AddUserBodyDto, User>.MapForward(resultDto);
        await userService.AddUser(entity);
        return Ok();
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<ActionResult<UserResultDto>> GetUser([FromRoute] int id)
    {
        var entity = await userService.GetUser(id);
        var dto = TypeMapper<User, UserResultDto>.MapForward(entity);
        return Ok(dto);
    }
}